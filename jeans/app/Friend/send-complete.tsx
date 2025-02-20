import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
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
        {/* 타이틀 */}
        <Text style={styles.title}>친구 요청을 보냈습니다.</Text>

        <CheckAnimation></CheckAnimation>

        <FullButton title='확 인' onPress={() => router.push('/MyPage/connect')}></FullButton>
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

  /** 타이틀 */
  title: {
    fontSize: 28,
    fontFamily: 'Bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});
