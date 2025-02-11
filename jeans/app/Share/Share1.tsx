import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


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

  return (
    <View style={styles.container}>
      {/* 상단 배너 */}
      <View style={styles.banner}>
        <Ionicons name="arrow-back" size={40} color="black" />
        <View style={styles.headerIcons}>
          <Ionicons name="search" size={40} color="black" style={styles.icon} />
          <Ionicons name="settings-outline" size={40} color="black" style={styles.icon} />
        </View>
      </View>

      {/* 타이틀 */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>친구들에게 공유하기</Text>
      </View>

      {/* 친구 버튼 목록 컨테이너 */}
      <View style={styles.friendsWrapper}>
        <View style={styles.friendsContainer}>
          {[1, 2, 3, 4, 5, 6].map((friend: number) => (
            <TouchableOpacity
              key={friend}
              style={[styles.friendButton, selectedFriends.includes(friend) && styles.selectedFriend]}
              onPress={() => toggleFriendSelection(friend)}
            >
              <Text style={styles.friendText}>친구</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 확인 버튼 */}
      <TouchableOpacity style={styles.confirmButton} onPress={() => router.push('/Share/Share2')}>
        <Text style={styles.confirmText}>확인</Text>
      </TouchableOpacity>

      {/* 하단 네비게이션 바 */}
        <View style={styles.bottomNav}>
            <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navText}>홈</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.centerButton}>
            <Ionicons name="mic" size={60} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navText}>보정</Text>
            </TouchableOpacity>
        </View>
        </View>
        );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 0,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  banner: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 20,
  },
  titleContainer: {
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  friendsWrapper: {
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  friendsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  friendButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  selectedFriend: {
    borderWidth: 3,
    borderColor: '#008DBF',
  },
  friendText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  confirmButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#008DBF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  confirmText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  navText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  middleContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  line: {
    width: 2,
    height: 50,
    backgroundColor: '#008DBF',
    position: 'absolute',
    top: -55,
  },
  centerButton: {
    width: 100,
    height: 100,
    backgroundColor: '#008DBF',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
