import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Image, 
  FlatList, 
  Alert, 
  ActivityIndicator 
} from 'react-native';
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

export default function FriendDeleteScreen() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [selectedFriends, setSelectedFriends] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
            "Authorization": `Bearer ${token}`,
          },
        });

        console.log("🔹 API 응답 상태 코드:", response.status);
        let responseText = await response.text();
        console.log("🔹 API 응답 본문:", responseText);

        if (response.status === 403) {
          Alert.alert("오류", "로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
          await AsyncStorage.removeItem("accessToken");
          return;
        }

        if (!response.ok) {
          throw new Error(`친구 목록을 불러오는 데 실패했습니다. (${response.status})`);
        }

        const data = JSON.parse(responseText);
        console.log("✅ 친구 목록 데이터:", data);

        setFriends(data || []);
      } catch (error) {
        console.error("❌ API 요청 실패:", error);
        Alert.alert("오류", error instanceof Error ? error.message : "알 수 없는 오류 발생");
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  // 🔹 친구 선택/해제 함수
  const toggleFriendSelection = (friendId: number) => {
    setSelectedFriends((prev) =>
      prev.includes(friendId) ? prev.filter(id => id !== friendId) : [...prev, friendId]
    );
  };

  // 🔹 친구 삭제 확인 다이얼로그
  const confirmDelete = () => {
    Alert.alert(
      "친구 삭제",
      "정말 삭제하시겠습니까?",
      [
        { text: "취소", style: "cancel" },
        { text: "삭제", style: "destructive", onPress: deleteSelectedFriends }
      ]
    );
  };

  // 🔹 친구 삭제 API 호출
  const deleteSelectedFriends = async () => {
    try {
      console.log(`🚀 친구 삭제 요청: ${selectedFriends}`);

      const token = await AsyncStorage.getItem("accessToken");
      if (!token) {
        console.log("❌ 액세스 토큰 없음 → 로그인 필요");
        Alert.alert("로그인이 필요합니다.");
        return;
      }

      for (const friendId of selectedFriends) {
        const response = await fetch(`https://api.passion4-jeans.store/follow-list/${friendId}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        console.log(`🔹 삭제 API 응답 상태 코드 (${friendId}):`, response.status);

        if (!response.ok) {
          throw new Error(`친구 삭제에 실패했습니다. (${response.status})`);
        }
      }

      Alert.alert("성공", "선택한 친구가 삭제되었습니다.");
      
      // 삭제된 친구 목록에서 제거
      setFriends((prev) => prev.filter((friend) => !selectedFriends.includes(friend.memberId)));
      setSelectedFriends([]);
    } catch (error) {
      console.error("❌ 친구 삭제 실패:", error);
      Alert.alert("오류", error instanceof Error ? error.message : "알 수 없는 오류 발생");
    }
  };

  return (
    <View style={styles.container}>
      <TopNavBar />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>친구 삭제</Text>
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
              style={[styles.friendCard, selectedFriends.includes(item.memberId) && styles.selectedFriend]}
              onPress={() => toggleFriendSelection(item.memberId)}
            >
              <Image source={{ uri: item.profileUrl }} style={styles.friendImage} />
              <Text style={styles.friendName}>{item.nickname}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.friendsContainer}
        />
      )}

      <TouchableOpacity
        style={[styles.confirmButton, selectedFriends.length === 0 && styles.disabledButton]}
        onPress={confirmDelete}
        disabled={selectedFriends.length === 0}
      >
        <Text style={styles.confirmText}>삭제</Text>
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
    marginTop: 150,
  },
  title: {
    fontSize: 35,
    fontFamily: 'Bold',
    textAlign: 'center',
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
    borderColor: 'white'
  },
  selectedFriend: {
    borderColor: '#FF616D',
    borderWidth: 5,
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
