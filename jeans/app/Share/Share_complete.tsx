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
      </View>

      {/* 타이틀 */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>사진과 함께 첨부할 메세지를 녹음하세요</Text>
      </View>

      {/* 친구 목록 빈 공간 */}
      <View style={styles.emptySpace}>
            <Text style={styles.emptySpaceText}>사진</Text></View>

      {/* 확인 버튼 */}
      <TouchableOpacity style={styles.confirmButton} onPress={() => router.push('/Home/Mainpage')}>
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
  emptySpace: {
    flex: 1,
    backgroundColor: '#DDDDDD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  emptySpaceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
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
