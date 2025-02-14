import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';

// 샘플 그룹 데이터 (DB 연결 시 대체 가능)
const dummyGroups = [
  { id: 1, members: [1, 2, 3] },
  { id: 2, members: [4, 5, 6] },
];

export default function Share2Screen() {
  const router = useRouter();
  const [selectedFriends, setSelectedFriends] = useState<number[]>([1, 2]); // 예제 데이터 (선택된 친구들)

  // 그룹 존재 여부 확인 함수
  const checkGroupExists = () => {
    return dummyGroups.some(group =>
      group.members.length === selectedFriends.length &&
      group.members.every(member => selectedFriends.includes(member))
    );
  };

  // 그룹에 보내기 버튼 클릭 핸들러
  const handleGroupSend = () => {
    if (checkGroupExists()) {
      router.push('/Share/Share_checkgroup'); // 기존 그룹이 있을 때
    } else {
      router.push('/Share/Share_makegroup0'); // 그룹이 없을 때

    }
  };

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* 타이틀 */}
      <Text style={styles.title}>공유 방법을{'\n'}선택해 주세요.</Text>

      {/* 옵션 버튼 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => router.push('/Share/Share_voice')}
        >
          <Text style={styles.buttonText}>각자 보내실래요?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={handleGroupSend}>
          <Text style={styles.buttonText}>그룹에 보내실래요?</Text>
        </TouchableOpacity>
      </View>

      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    fontFamily:'Bold',
    textAlign: 'center',
    marginBottom: 80,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  optionButton: {
    width: 300,
    paddingVertical: 40,
    backgroundColor: '#87CEEB',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  }
});
