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

      <View style={styles.titleContainer}>
        <Text style={styles.title}>친구 목록 및 {'\n'}별명 생성하기</Text>
      </View>

      <FlatList
        data={dummyFriends}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.friendCard, selectedFriend === item.id && styles.selectedFriend]}
            onPress={() => selectFriend(item.id)}>
            <View style={styles.friendCardContent}>
              <Image source={item.profileImage} style={styles.friendImage} />
              <Text style={styles.friendName}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.friendsContainer}
      />

      <TouchableOpacity
        style={[styles.confirmButton, selectedFriend === null && styles.disabledButton]}
        onPress={() => router.push('/Friend/')}
        disabled={selectedFriend === null}>
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
    borderColor:'white'
  },
  selectedFriend: {
    borderColor: 'rgba(255, 183, 6, 0.8)',
    borderWidth:5
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
    fontFamily: 'Bold',
    color: '#FFFFFF',
  },
});
