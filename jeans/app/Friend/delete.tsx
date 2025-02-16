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

  const toggleFriendSelection = (friendId: number) => {
    setSelectedFriends((prev) =>
      prev.includes(friendId) ? prev.filter(id => id !== friendId) : [...prev, friendId]
    );
  };

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

  const deleteSelectedFriends = () => {
    setFriends(friends.filter(friend => !selectedFriends.includes(friend.id)));
    setSelectedFriends([]);
  };

  return (
    <View style={styles.container}>
      <TopNavBar />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>친구 삭제</Text>
      </View>

      <FlatList
        data={friends}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.friendCard, selectedFriends.includes(item.id) && styles.selectedFriend]}
            onPress={() => toggleFriendSelection(item.id)}>
            <Image source={item.profileImage} style={styles.friendImage} />
            <Text style={styles.friendName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.friendsContainer}
      />

      <TouchableOpacity
        style={[styles.confirmButton, selectedFriends.length === 0 && styles.disabledButton]}
        onPress={confirmDelete}
        disabled={selectedFriends.length === 0}>
        <Text style={styles.confirmText}>삭제 하기</Text>
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
    borderColor: 'white'
  },
  selectedFriend: {
    borderColor: 'rgba(255, 183, 6, 0.8)',
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
    fontFamily: 'Bold',
    color: '#FFFFFF',
  },
});
