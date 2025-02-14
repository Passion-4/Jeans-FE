import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
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

export default function HomeUILayout() {
  const [selectedFriends, setSelectedFriends] = useState<number[]>([]);
  const router = useRouter();

  const toggleFriendSelection = (friendId: number) => {
    setSelectedFriends((prev: number[]) =>
      prev.includes(friendId)
        ? prev.filter((id: number) => id !== friendId)
        : [...prev, friendId]
    );
  };

  const handleConfirm = () => {
    if (selectedFriends.length === 1) {
      router.push('/Share/Share_voice');
    } else if (selectedFriends.length > 1) {
      router.push('/Share/Share2');
    }
  };

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* 타이틀 */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>공유할 친구 선택하기</Text>
      </View>

      {/* 친구 목록 컨테이너 */}
      <FlatList
        data={dummyFriends}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.friendCard, selectedFriends.includes(item.id) && styles.selectedFriend]}
            onPress={() => toggleFriendSelection(item.id)}
          >
            <Image source={item.profileImage} style={styles.friendImage} />
            <Text style={styles.friendName}>{item.name}</Text>
            <Text style={styles.friendRelation}>{item.relation}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={[styles.friendsContainer, { paddingBottom: 100 }]}
      />

      {/* 확인 버튼 */}
      <TouchableOpacity
        style={[styles.confirmButton, selectedFriends.length === 0 && styles.disabledButton]}
        onPress={handleConfirm}
        disabled={selectedFriends.length === 0}
      >
        <Text style={styles.confirmText}>다 음</Text>
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
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    elevation: 3,
    padding: 10,
  },
  selectedFriend: {
    borderWidth: 5,
    borderColor: '#008DBF',
  },
  friendImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 7,
  },
  friendName: {
    fontSize: 20,
    fontFamily:'Medium',
    marginBottom: 5,
  },
  friendRelation: {
    fontSize: 18,
    color: '#777',
    fontFamily:'Medium'
  },
  confirmButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#008DBF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 20,
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
