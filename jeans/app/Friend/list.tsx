import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
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

export default function FriendListScreen() {
  const router = useRouter();
  const [selectedFriend, setSelectedFriend] = useState<number | null>(null);

  // 친구 선택 시 실행되는 함수
  const selectFriend = (friendId: number) => {
    setSelectedFriend(friendId === selectedFriend ? null : friendId);
  };

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* 타이틀 */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>친구 목록 및 별명 생성하기</Text>
      </View>

      {/* 친구 목록 컨테이너 */}
      <FlatList
        data={dummyFriends}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.friendCard, selectedFriend === item.id && styles.selectedFriend]}
            onPress={() => selectFriend(item.id)}
          >
            <Image source={item.profileImage} style={styles.friendImage} />
            <Text style={styles.friendName}>{item.name}</Text>
            <Text style={styles.friendRelation}>{item.relation}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={[styles.friendsContainer, { paddingBottom: 100 }]}
      />

      {/* 별명 만들기 버튼 - 친구 선택 시만 활성화 */}
      <TouchableOpacity
        style={[styles.confirmButton, selectedFriend === null && styles.disabledButton]}
        onPress={() => router.push('/Friend/relation')}
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
    fontWeight: 'bold',
  },
  friendsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  friendCard: {
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
    backgroundColor: '#D6EAF8', // 선택된 친구의 배경색 변경
    borderWidth: 2,
    borderColor: '#008DBF',
  },
  friendImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 7,
  },
  friendName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  friendRelation: {
    fontSize: 18,
    color: '#777',
  },
  confirmButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#008DBF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 20,
    marginBottom: 200,
  },
  disabledButton: {
    backgroundColor: '#B0BEC5', // 선택되지 않았을 때 비활성화 색상
  },
  confirmText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
