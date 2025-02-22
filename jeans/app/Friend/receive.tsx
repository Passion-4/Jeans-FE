import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';

type FriendRequest = {
  followId: number;
  memberId: number;
  name: string;
  profileUrl: string;
};

export default function FriendRequestsScreen() {
  const router = useRouter();
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFriendRequests();
  }, []);

  // 🔹 친구 요청 목록 조회
  const fetchFriendRequests = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) {
        Alert.alert("오류", "로그인이 필요합니다.");
        return;
      }

      const response = await fetch("https://api.passion4-jeans.store/follow/requests", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      console.log("🔹 API 응답 상태 코드:", response.status);
      if (!response.ok) {
        throw new Error(`친구 요청 목록을 불러오는 데 실패했습니다. (${response.status})`);
      }

      const data: FriendRequest[] = await response.json();
      setFriendRequests(data);
    } catch (error) {
      console.error("❌ API 요청 실패:", error);
      Alert.alert("오류", error instanceof Error ? error.message : "알 수 없는 오류 발생");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 친구 요청 수락
  const acceptRequest = async (followId: number, name: string) => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) {
        Alert.alert("오류", "로그인이 필요합니다.");
        return;
      }

      const response = await fetch(`https://api.passion4-jeans.store/follow/requests/${followId}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      console.log("✅ 친구 요청 수락 응답:", response.status);
      if (!response.ok) {
        throw new Error(`친구 요청을 수락하는 데 실패했습니다. (${response.status})`);
      }

      Alert.alert("친구 요청 수락", `${name}님과 친구가 되었습니다.`);
      setFriendRequests((prev) => prev.filter((request) => request.followId !== followId));
    } catch (error) {
      console.error("❌ 친구 요청 수락 실패:", error);
      Alert.alert("오류", error instanceof Error ? error.message : "알 수 없는 오류 발생");
    }
  };

  // 🔹 친구 요청 거절
  const declineRequest = async (followId: number, name: string) => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) {
        Alert.alert("오류", "로그인이 필요합니다.");
        return;
      }

      const response = await fetch(`https://api.passion4-jeans.store/follow/requests/${followId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      console.log("🚫 친구 요청 거절 응답:", response.status);
      if (!response.ok) {
        throw new Error(`친구 요청을 거절하는 데 실패했습니다. (${response.status})`);
      }

      Alert.alert("친구 요청 거절", `${name}님의 친구 요청을 거절하였습니다.`);
      setFriendRequests((prev) => prev.filter((request) => request.followId !== followId));
    } catch (error) {
      console.error("❌ 친구 요청 거절 실패:", error);
      Alert.alert("오류", error instanceof Error ? error.message : "알 수 없는 오류 발생");
    }
  };

  return (
    <View style={styles.container}>
      <TopNavBar />

      <Text style={styles.title}>받은 친구 요청</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#008DBF" />
      ) : friendRequests.length === 0 ? (
        <Text style={styles.noRequestsText}>받은 친구 요청이 없습니다.</Text>
      ) : (
        <FlatList
          data={friendRequests}
          keyExtractor={(item) => item.followId.toString()}
          renderItem={({ item }) => (
            <View style={styles.requestContainer}>
              <Image source={{ uri: item.profileUrl }} style={styles.profileImage} />
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.acceptButton}
                  onPress={() => acceptRequest(item.followId, item.name)}
                >
                  <Text style={styles.buttonText}>수락</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.declineButton}
                  onPress={() => declineRequest(item.followId, item.name)}
                >
                  <Text style={styles.buttonText}>거절</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 35,
    fontFamily: 'Bold',
    marginVertical: 20,
    textAlign: 'center',
    marginTop: 150,
    marginBottom: 50,
  },
  noRequestsText: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
    marginTop: 50,
    fontFamily: 'Medium',
  },
  requestContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  name: {
    fontSize: 18,
    fontFamily: 'Medium',
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  acceptButton: {
    backgroundColor: '#008DBF',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
  },
  declineButton: {
    backgroundColor: '#FF4C4C',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Medium',
  },
});
