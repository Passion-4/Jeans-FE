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
        <Text style={styles.title}>사진이 저장되었습니다!</Text>

        <CheckAnimation></CheckAnimation>

        <FullButton title='확 인' onPress={() => router.push('/Home/main-page')}></FullButton>
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
