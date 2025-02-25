import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
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
  const [selectedFriend, setSelectedFriend] = useState<number | null>(null);
  const router = useRouter();

  const toggleFriendSelection = (friendId: number) => {
    if (selectedFriend === friendId) {
      setSelectedFriend(null);
    } else if (selectedFriend !== null) {
      Alert.alert('경고', '하나의 사진만 선택할 수 있습니다.');
    } else {
      setSelectedFriend(friendId);
    }
  };

  const handleConfirm = () => {
    if (selectedFriend !== null) {
      const selectedFriendData = dummyFriends.find(friend => friend.id === selectedFriend);

      router.push({
        pathname: '/Quote/quote-select-word-basic',
        params: { selectedImage: JSON.stringify(selectedFriendData?.Image) }, // ✅ 선택한 배경 이미지 저장 후 이동
      });
    }
  };

  return (
    <View style={styles.container}>
      <TopNavBar />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>글귀 배경 선택하기</Text>
      </View>

      <FlatList
        data={dummyFriends}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const isSelected = selectedFriend === item.id;
          return (
            <TouchableOpacity
              style={[styles.friendCard, isSelected && styles.selectedFriend]}
              onPress={() => toggleFriendSelection(item.id)}
            >
              <Image source={item.Image} style={[styles.friendImage, isSelected && styles.selectedFriendImage]} />
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={[styles.friendsContainer, { paddingBottom: 100 }]}
      />

      <TouchableOpacity
        style={[styles.customButton, selectedFriend === null && styles.disabledButton]}
        onPress={handleConfirm}
        disabled={selectedFriend === null}
      >
        <Text style={styles.customButtonText}>다 음</Text>
      </TouchableOpacity>

      <BottomNavBar />
    </View>
  );
}



const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', paddingTop: 20, paddingHorizontal: 15 },
  titleContainer: { alignItems: 'center', marginBottom: 20, paddingHorizontal: 15, marginTop: 150 },
  title: { fontSize: 30, fontFamily: 'Bold' },
  friendsContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 10 },
  friendCard: { width: 100, height: 100, alignItems: 'center', justifyContent: 'center', margin: 5, borderRadius: 10, backgroundColor: '#FFFFFF', elevation: 3, overflow: 'hidden' },
  selectedFriend: { borderWidth: 4, borderColor: '#FFE2E5' },
  friendImage: { width: '100%', height: '100%', borderRadius: 10 },
  selectedFriendImage: { width: '92%', height: '92%' },
  customButton: { width: '100%', paddingVertical: 16, borderRadius: 10, alignItems: 'center', backgroundColor: '#008DBF', marginBottom: 150 },
  customButtonText: { fontSize: 20, fontFamily: 'Medium', color: 'white' },
  disabledButton: { backgroundColor: '#B0BEC5' },
});
