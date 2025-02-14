import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';

const dummyFriends = [
  { id: 1, name: '김춘자', relation: '친구', profileImage: require('../../assets/images/selec1.jpg') },
  { id: 2, name: '이순복', relation: '친구', profileImage: require('../../assets/images/selec1.jpg') },
  { id: 3, name: '박영남', relation: '친구', profileImage: require('../../assets/images/selec1.jpg') },
  { id: 4, name: '박보석', relation: '아들', profileImage: require('../../assets/images/selec1.jpg') },
  { id: 5, name: '박준용', relation: '손자', profileImage: require('../../assets/images/selec1.jpg') },
  { id: 6, name: '유삼복', relation: '친구', profileImage: require('../../assets/images/selec1.jpg') },
];

export default function FriendDeleteScreen() {
  const [friends, setFriends] = useState(dummyFriends);
  const [selectedFriends, setSelectedFriends] = useState<number[]>([]);
  const router = useRouter();

  // 친구 선택 토글
  const toggleFriendSelection = (friendId: number) => {
    setSelectedFriends((prev) =>
      prev.includes(friendId) ? prev.filter((id) => id !== friendId) : [...prev, friendId]
    );
  };

  // 삭제 확인 경고창
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

  // 선택된 친구 삭제
  const deleteSelectedFriends = () => {
    setFriends((prev) => prev.filter((friend) => !selectedFriends.includes(friend.id)));
    setSelectedFriends([]); // 선택 초기화
  };

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* 타이틀 */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>친구 삭제</Text>
      </View>

      {/* 친구 목록 컨테이너 */}
      <FlatList
        data={friends}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.friendButton, selectedFriends.includes(item.id) && styles.selectedFriend]}
            onPress={() => toggleFriendSelection(item.id)}
          >
            <Image source={item.profileImage} style={styles.friendImage} />
            <Text style={styles.friendName}>{item.name}</Text>
            <Text style={styles.friendRelation}>{item.relation}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={[styles.friendsContainer, { paddingBottom: 100 }]}
      />

      {/* 삭제 버튼 */}
      <TouchableOpacity
        style={[styles.deleteButton, selectedFriends.length === 0 && styles.disabledButton]}
        onPress={confirmDelete}
        disabled={selectedFriends.length === 0}
      >
        <Text style={styles.confirmText}>삭제 하기</Text>
      </TouchableOpacity>

      {/* 뒤로가기 버튼 */}
      <TouchableOpacity style={styles.confirmButton} onPress={() => router.back()}>
        <Text style={styles.confirmText}>뒤로 가기</Text>
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
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingHorizontal: 15,
    marginTop: 120,
  },
  title: {
    fontSize: 35,
    fontFamily:'Bold'
  },
  friendsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  friendButton: {
    width: 100,
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    elevation: 3,
  },
  selectedFriend: {
    borderWidth: 3,
    borderColor: '#008DBF',
  },
  friendImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 5,
  },
  friendName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  friendRelation: {
    fontSize: 12,
    color: '#777',
  },
  deleteButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#87CEEB',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 10,
  },
  confirmButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#008DBF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 120,
  },
  disabledButton: {
    backgroundColor: '#B0BEC5',
  },
  confirmText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
