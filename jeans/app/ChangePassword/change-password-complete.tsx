import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import FullButton from '@/components/FullButton';
import CheckAnimation from '@/components/CheckAnimation';

export default function FriendRequestCompleteScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TopNavBar />
      <View style={styles.content}>
        {/* 고정된 크기의 애니메이션 컨테이너로 글씨 밀림 방지 */}
        <Text style={styles.title}>비밀번호가 {'\n'}변경 되었습니다!</Text>
        <CheckAnimation></CheckAnimation>
        <FullButton title='확 인' onPress={() => router.push('/MyPage/my-page')} />
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
    fontSize: 35,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Bold',
  },
});
