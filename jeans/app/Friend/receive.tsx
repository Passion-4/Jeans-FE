import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';

export default function FriendRequestsScreen() {
  const router = useRouter();

  // 친구 요청 데이터 (백엔드에서 가져온다고 가정)
  const [friendRequests, setFriendRequests] = useState([
    { id: 1, name: '김민수', profileImage: require('../../assets/images/icon.png') },
    { id: 2, name: '박지연', profileImage: require('../../assets/images/icon.png') },
    { id: 3, name: '이정환', profileImage: require('../../assets/images/icon.png') },
  ]);

  useEffect(() => {
    // 실제 백엔드 API 요청 부분 (예: axios.get('/api/friendRequests').then(res => setFriendRequests(res.data)))
  }, []);

  // 친구 요청 수락
  const acceptRequest = (id: number, name: string) => {
    Alert.alert("친구 요청 수락", `${name}님이랑 친구가 되었습니다.`);
    setFriendRequests((prev) => prev.filter((request) => request.id !== id));
    // TODO: 백엔드에 친구 요청 수락 API 요청 보내기
  };

  // 친구 요청 거절
  const declineRequest = (id: number, name: string) => {
    Alert.alert("친구 요청 거절", `${name}님의 친구 요청을 거절하였습니다.`);
    setFriendRequests((prev) => prev.filter((request) => request.id !== id));
    // TODO: 백엔드에 친구 요청 거절 API 요청 보내기
  };

  return (
    <View style={styles.container}>
      <TopNavBar />

      <Text style={styles.title}>받은 친구 요청</Text>

      {friendRequests.length === 0 ? (
        <Text style={styles.noRequestsText}>받은 친구 요청이 없습니다.</Text>
      ) : (
        <FlatList
          data={friendRequests}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.requestContainer}>
              <Image source={item.profileImage} style={styles.profileImage} />
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={styles.acceptButton} 
                  onPress={() => acceptRequest(item.id, item.name)}
                >
                  <Text style={styles.buttonText}>수락</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.declineButton} 
                  onPress={() => declineRequest(item.id, item.name)}
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
    fontSize: 30,
    fontWeight: 'bold',
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
    fontWeight: 'bold',
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
    fontWeight: 'bold',
  },
});
