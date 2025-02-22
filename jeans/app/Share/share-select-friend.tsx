import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';

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
  nickname?: string;
};

export default function ShareFriendSelection() {
  const router = useRouter();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFriends, setSelectedFriends] = useState<number[]>([]);

  // 🔹 API 호출하여 친구 및 팀 목록 가져오기
  useEffect(() => {
    const fetchFriendsAndTeams = async () => {
      setLoading(true);
      try {
        console.log("🚀 API 요청 시작: /share-list (토큰 없이 요청)");

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

  // ✅ 친구 선택 토글 함수
  const toggleFriendSelection = (id: number) => {
    setSelectedFriends((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  // ✅ '다음' 버튼 클릭 시 이동할 경로
  const handleConfirm = () => {
    if (selectedFriends.length === 1) {
      router.push('/Share/share-voice');
    } else if (selectedFriends.length > 1) {
      router.push('/Share/share-select-target');
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
              style={[styles.friendCard, selectedFriends.includes("memberId" in item ? item.memberId : item.teamId) && styles.selectedFriend]}
              onPress={() => toggleFriendSelection("memberId" in item ? item.memberId : item.teamId)}
            >
              <Image source={{ uri: "memberId" in item ? item.profileUrl : item.imageUrl }} style={styles.friendImage} />
              <Text style={styles.friendName}>{item.nickname || item.name}</Text>
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
    fontSize: 31,
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
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 7,
  },
  friendName: {
    fontSize: 20,
    fontFamily: 'Medium',
    marginBottom: 5,
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
