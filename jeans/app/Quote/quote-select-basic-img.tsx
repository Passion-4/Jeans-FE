import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';

const dummyFriends = [
  { id: 1, Image: require('../../assets/images/bg/bg1.jpg') },
  { id: 2, Image: require('../../assets/images/bg/bg2.jpg') },
  { id: 3, Image: require('../../assets/images/bg/bg3.jpg') },
  { id: 4, Image: require('../../assets/images/bg/bg4.jpg') },
  { id: 5, Image: require('../../assets/images/bg/bg5.jpg') },
  { id: 6, Image: require('../../assets/images/bg/bg6.jpg') },
  { id: 7, Image: require('../../assets/images/bg/bg7.png') },
  { id: 8, Image: require('../../assets/images/bg/bg8.png') },
  { id: 9, Image: require('../../assets/images/bg/bg9.png') },
  { id: 10, Image: require('../../assets/images/bg/bg10.png') },
  { id: 11, Image: require('../../assets/images/bg/bg11.png') },
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
      const selectedFriend = dummyFriends.find(friend => friend.id === selectedFriends[0]);
  
      router.push({
        pathname: '/Quote/quote-select-img1',
        params: {

          friendImage: JSON.stringify(selectedFriend?.Image), // ✅ JSON 변환 후 전달
        },
      });
    }
  };
  
  

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* 타이틀 */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>글귀 배경 선택하기</Text>
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
            <Image source={item.Image} style={styles.friendImage} />
          </TouchableOpacity>
        )}
        contentContainerStyle={[styles.friendsContainer, { paddingBottom: 100 }]}
      />

      {/* ✅ CustomButton 스타일 적용된 '다음' 버튼 */}
      <TouchableOpacity
        style={[
          styles.customButton,
          selectedFriends.length === 0 && styles.disabledButton,
        ]}
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
    height: 100,
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
    borderColor: 'rgba(255, 183, 6, 0.6)',
  },
  friendImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 7,
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
