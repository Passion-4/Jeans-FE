import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import useSelectedFriends from '../../hooks/useSelectedFriends'; // ✅ 추가

// ✅ API 응답 데이터 타입 정의
type Friend = {
  memberId: number;
  name: string;
  profileUrl: string;
  nickname?: string;
};

type Team = {
  teamId: number;
  name: string;
  imageUrl: string;
};

export default function ShareFriendSelection() {
  const router = useRouter();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  //const [selectedFriends, setSelectedFriends] = useState<(Friend | Team)[]>([]);
  const { selectedFriends, setSelectedFriends } = useSelectedFriends();
  

  // 🔹 API 호출하여 친구 및 팀 목록 가져오기
  useEffect(() => {
    const fetchFriendsAndTeams = async () => {
      setLoading(true);
      try {
        console.log("🚀 API 요청 시작: /share-list");

        let response = await fetch("https://api.passion4-jeans.store/share-list", {
          method: "GET",
        });

        console.log("🔹 API 응답 상태 코드:", response.status);
        let responseText = await response.text();
        console.log("🔹 API 응답 본문:", responseText);

        // 🔹 403 발생하면 `accessToken` 포함해서 다시 요청
        if (response.status === 403) {
          console.log("🚨 403 발생 → accessToken 포함하여 재요청");

          const token = await AsyncStorage.getItem("accessToken");
          console.log("📌 저장된 액세스 토큰:", token);

          if (!token) {
            Alert.alert("로그인이 필요합니다.");
            return;
          }

          response = await fetch("https://api.passion4-jeans.store/share-list", {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`, // ✅ 토큰 추가하여 재요청
            }
          });

          console.log("🔹 재요청 후 응답 상태 코드:", response.status);
          responseText = await response.text();
          console.log("🔹 재요청 후 응답 본문:", responseText);

          if (response.status === 403) {
            Alert.alert("오류", "권한이 없습니다. 다시 로그인해 주세요.");
            await AsyncStorage.removeItem("accessToken");
            return;
          }
        }

        if (!response.ok) {
          throw new Error(`데이터를 불러오는 데 실패했습니다. (${response.status})`);
        }

        const data = JSON.parse(responseText);
        console.log("✅ API 요청 성공! 받아온 데이터:", data);

        setFriends(data.memberDtoList || []);
        setTeams(data.teamDtoList || []);
      } catch (error) {
        console.error("❌ API 요청 실패:", error);
        Alert.alert("오류", error instanceof Error ? error.message : "알 수 없는 오류 발생");
      } finally {
        setLoading(false);
      }
    };

    fetchFriendsAndTeams();
  }, []);

  const toggleFriendSelection = (item: Friend | Team) => {
    setSelectedFriends((prev) => {
      const isSelected = prev.some((selected) => 
        'memberId' in item 
          ? 'memberId' in selected && selected.memberId === item.memberId
          : 'teamId' in selected && selected.teamId === item.teamId
      );
  
      const updatedList = isSelected
        ? prev.filter((selected) => 
            'memberId' in item 
              ? 'memberId' in selected && selected.memberId !== item.memberId
              : 'teamId' in selected && selected.teamId !== item.teamId
          )
        : [...prev, item];
  
      console.log("🔹 선택된 친구 리스트 (업데이트됨):", updatedList);
      return updatedList;
    });
  };
  


  const handleConfirm = () => {
    const selectedMemberIds = selectedFriends
      .filter((item) => 'memberId' in item)
      .map((item) => item.memberId);
  
    const selectedTeamIds = selectedFriends
      .filter((item) => 'teamId' in item)
      .map((item) => item.teamId);
  
    console.log("🚀 다음 페이지로 보낼 데이터:");
    console.log("📌 친구 리스트 (memberId):", selectedMemberIds);
    console.log("📌 팀 리스트 (teamId):", selectedTeamIds);
  
    if (selectedTeamIds.length > 0) {
      // 팀 공유인 경우 (팀 여러 개 선택 가능)
      router.push({
        pathname: '/Share/share-voice',
        params: { shareType: 'team', teamId: JSON.stringify(selectedTeamIds) }
      });
    } else if (selectedMemberIds.length === 1) {
      // 친구 1명 공유
      router.push({
        pathname: '/Share/share-voice',
        params: { shareType: 'friend', receiverList: JSON.stringify(selectedMemberIds) }
      });
    } else if (selectedMemberIds.length > 1) {
      // 친구 여러 명 공유
      router.push({
        pathname: '/Share/share-select-target',
        params: { shareType: 'friend', receiverList: JSON.stringify(selectedMemberIds) }
      });
    }
  };
  
  

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* 🔹 타이틀 */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>공유할 친구 선택하기</Text>
      </View>

      {/* 🔹 친구 목록 & 팀 목록 (로딩 중 표시) */}
      {loading ? (
        <ActivityIndicator size="large" color="#008DBF" />
      ) : (
        <FlatList
          data={[...friends, ...teams]} // ✅ 친구 + 팀 목록을 함께 표시
          numColumns={3}
          keyExtractor={(item) => ("memberId" in item ? `m-${item.memberId}` : `t-${item.teamId}`)}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.friendCard, 
                selectedFriends.some((selected) =>
                  'memberId' in item 
                    ? 'memberId' in selected && selected.memberId === item.memberId
                    : 'teamId' in selected && selected.teamId === item.teamId
                ) && styles.selectedFriend
              ]}
              onPress={() => toggleFriendSelection(item)}
            >
              <Image source={{ uri: "memberId" in item ? item.profileUrl : item.imageUrl }} style={styles.friendImage} />
              <Text style={styles.friendName}>{'memberId' in item ? item.nickname : item.name}</Text> 
              <Text style={styles.friendName2}>{'memberId' in item ? '친구' : '그룹'}</Text> 
              
            </TouchableOpacity>
          )}
          contentContainerStyle={[styles.friendsContainer, { paddingBottom: 100 }]}
        />
      )}

      {/* 🔹 '다음' 버튼 */}
      <TouchableOpacity
        style={[styles.customButton, selectedFriends.length === 0 && styles.disabledButton]}
        onPress={handleConfirm}
        disabled={selectedFriends.length === 0}
      >
        <Text style={styles.customButtonText}>다 음</Text>
      </TouchableOpacity>

      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 15,
    marginTop: 150,
  },
  title: {
    fontSize: 30,
    fontFamily: 'Bold',
  },
  friendsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  friendCard: {
    width: 100,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    elevation: 3,
    padding: 10,
  },
  selectedFriend: {
    borderWidth: 5,
    borderColor: '#FF616D',
  },
  friendImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
    marginBottom: 7,
  },
  friendName: {
    fontSize: 17,
    fontFamily: 'Bold',
    width:"100%",
    textAlign:"center",

  },
  friendName2: {
    fontSize: 16,
    fontFamily: 'Medium',
    color:"#555"
  },
  customButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#008DBF',
    marginBottom: 150,
  },
  customButtonText: {
    fontSize: 20,
    fontFamily: 'Medium',
    color: 'white',
  },
  disabledButton: {
    backgroundColor: '#B0BEC5',
  },
});
