import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import FullButton from '../../components/FullButton';
import CheckAnimation from '@/components/CheckAnimation';

export default function PhotoSelectionCompleteScreen() {
  const router = useRouter();
  const [animationFinished, setAnimationFinished] = useState(false);

  return (
    <View style={styles.container}>
      {/* ✅ 타이틀 */}
      <Text style={styles.title}>회원가입이 {'\n'}완료되었습니다!</Text>

      <CheckAnimation></CheckAnimation>

      <FullButton title='로그인 하러 가기' onPress={() => router.push('/explore')}></FullButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 35,
    fontFamily: 'Bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});

