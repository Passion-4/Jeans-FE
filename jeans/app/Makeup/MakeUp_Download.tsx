import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import FullButton from '@/components/FullButton';

export default function FriendRequestCompleteScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TopNavBar />

      <View style={styles.content}>
        {/* 타이틀 */}
        <Text style={styles.title}>사진이 저장되었습니다!</Text>

        {/* Lottie 애니메이션 */}
        <View style={styles.lottieContainer}>
          <LottieView 
            source={require('../../assets/animations/Animation - 1739343498719.json')} 
            autoPlay
            loop={false} 
            style={styles.lottie}
          />
        </View>

        <FullButton title='확 인' onPress={() => router.push('/Home/Mainpage')}></FullButton>
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

  /** Lottie 애니메이션 */
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
