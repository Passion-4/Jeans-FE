import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';

export default function FriendNicknameCompleteScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TopNavBar />

      <View style={styles.content}>
        <Text style={styles.title}>별명이 생성되었습니다!</Text>

        {/* 애니메이션 */}
        <LottieView 
          source={require('../../assets/animations/Animation - 1739343498719.json')} 
          autoPlay
          loop={false} 
          style={styles.lottie}
        />

        {/* 확인 버튼 */}
        <TouchableOpacity 
          style={styles.confirmButton} 
          onPress={() => router.push('/Friend/list')}
        >
          <Text style={styles.confirmText}>확인</Text>
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
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  lottie: {
    width: 150,  
    height: 150, 
    marginBottom: 30,
  },
  confirmButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#008DBF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 30,
  },
  confirmText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
