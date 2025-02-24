import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import FullButton from '@/components/FullButton';
import CheckAnimation from '@/components/CheckAnimation';
import useSelectedFriends from '@/hooks/useSelectedFriends'; // ✅ useSelectedFriends 추가

export default function FriendRequestCompleteScreen() {
  const router = useRouter();
  const { clearSelectedFriends } = useSelectedFriends(); // ✅ 선택된 친구/팀 초기화 함수 가져오기

  // ✅ "확인" 버튼 클릭 시 선택된 친구/팀 초기화 후 메인 페이지 이동
  const handleConfirm = () => {
    clearSelectedFriends(); // ✅ 선택된 친구/팀 초기화
    router.push('/Home/main-page'); // ✅ 메인 페이지로 이동
  };

  return (
    <View style={styles.container}>
      <TopNavBar />

      <View style={styles.content}>
        <Text style={styles.title}>공유가 완료되었습니다!</Text>

        <CheckAnimation />

        {/* ✅ "확인" 버튼 클릭 시 handleConfirm 실행 */}
        <FullButton title="확 인" onPress={handleConfirm} />
      </View>

      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});
