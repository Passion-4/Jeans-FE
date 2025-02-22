import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';

type Friend = {
  memberId: number;
  name: string;
  profileUrl: string;
  nickname?: string;
};

export default function FriendListScreen() {
  const router = useRouter();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFriend, setSelectedFriend] = useState<number | null>(null);

  // 🔹 API 호출하여 친구 목록 가져오기
  useEffect(() => {
    const fetchFriends = async () => {
      setLoading(true);
      try {
        console.log("🚀 API 요청 시작: /follow-list");

        // ✅ accessToken 가져오기
        const token = await AsyncStorage.getItem("accessToken");
        if (!token) {
          console.log("❌ 액세스 토큰 없음 → 로그인 필요");
          Alert.alert("로그인이 필요합니다.");
          return;
        }

        const response = await fetch("https://api.passion4-jeans.store/follow-list", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // ✅ accessToken 포함
          },
        });

        console.log("🔹 API 응답 상태 코드:", response.status);
        let responseText = await response.text();
        console.log("🔹 API 응답 본문:", responseText);

        // 🔹 API 응답이 403이면 토큰이 만료되었을 가능성 있음
        if (response.status === 403) {
          Alert.alert("오류", "로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
          await AsyncStorage.removeItem("accessToken"); // ✅ 토큰 삭제
          return;
        }

        if (!response.ok) {
          throw new Error(`친구 목록을 불러오는 데 실패했습니다. (${response.status})`);
        }

        const data = JSON.parse(responseText);
        console.log("✅ 친구 목록 데이터:", data);

        setFriends(data || []); // ✅ 친구 목록 저장
      } catch (error) {
        console.error("❌ API 요청 실패:", error);
        Alert.alert("오류", error instanceof Error ? error.message : "알 수 없는 오류 발생");
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  // 🔹 친구 선택 시 실행되는 함수
  const selectFriend = (friendId: number) => {
    setSelectedFriend(friendId === selectedFriend ? null : friendId);
  };

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* 🔹 타이틀 */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>친구 목록 및 {'\n'}별명 생성하기</Text>
      </View>

      {/* 🔹 로딩 중 표시 */}
      {loading ? (
        <ActivityIndicator size="large" color="#008DBF" />
      ) : (
        <FlatList
          data={friends}
          numColumns={3}
          keyExtractor={(item) => item.memberId.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.friendCard, selectedFriend === item.memberId && styles.selectedFriend]}
              onPress={() => selectFriend(item.memberId)}
            >
              <View style={styles.friendCardContent}>
                <Image source={{ uri: item.profileUrl }} style={styles.friendImage} />
                <Text style={styles.friendName}>{item.nickname || item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.friendsContainer}
        />
      )}

      {/* 🔹 '별명 만들기' 버튼 */}
      <TouchableOpacity
        style={[styles.confirmButton, selectedFriend === null && styles.disabledButton]}
        onPress={() => router.push('/Friend/make-relation')}
        disabled={selectedFriend === null}
      >
        <Text style={styles.confirmText}>별명 만들기</Text>
      </TouchableOpacity>

      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    marginTop: 120,
  },
  title: {
    fontSize: 35,
    fontFamily: 'Bold',
    textAlign: 'center',
    marginTop: 15,
  },
  friendsContainer: {
    justifyContent: 'center',
    paddingVertical: 20,
  },
  friendCard: {
    width: 100,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    elevation: 4,
    borderWidth: 2,
    borderColor: 'white',
  },
  selectedFriend: {
    borderColor: '#FF616D',
    borderWidth: 5,
  },
  friendCardContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  friendImage: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    marginBottom: 8,
  },
  friendName: {
    fontSize: 18,
    fontFamily: 'Medium',
    textAlign: 'center',
  },
  confirmButton: {
    width: '100%',
    height: 55,
    backgroundColor: '#008DBF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 120,
  },
  disabledButton: {
    backgroundColor: '#B0BEC5',
  },
  confirmText: {
    fontSize: 20,
    fontFamily: 'Medium',
    color: '#FFFFFF',
  },
});
