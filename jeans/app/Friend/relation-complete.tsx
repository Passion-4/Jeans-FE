import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import FullButton from '@/components/FullButton';
import CheckAnimation from '@/components/CheckAnimation';

export default function FriendNicknameCompleteScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* ✅ 고정된 컨텐츠 박스 */}
      <View style={styles.content}>
        <Text style={styles.title}>별명이 생성되었습니다!</Text>

        <CheckAnimation></CheckAnimation>

        {/* ✅ 완료 버튼 */}
        <FullButton title="확 인" onPress={() => router.push('/Friend/list')} />
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
    fontSize: 30,
    fontFamily: 'Bold',
    textAlign: 'center',
    marginBottom: 30,
  },

  /** ✅ 애니메이션 고정 크기 컨테이너 */
  lottieContainer: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 30,
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
});
