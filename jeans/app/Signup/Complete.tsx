import React, { useState }from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import FullButton from '@/components/FullButton';

export default function CompleteSignupScreen() {
  const router = useRouter();
  const [animationFinished, setAnimationFinished] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입이 {'\n'}완료되었습니다!</Text>
      <LottieView 
              source={require('../../assets/animations/Animation - 1739343498719.json')} 
              autoPlay
              loop={false} // 반복 X
              style={styles.lottie}
              onAnimationFinish={() => setAnimationFinished(true)} // 애니메이션 끝나도 유지
            />

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
    marginBottom: 20,
    textAlign: 'center',
    fontFamily:'Bold'
  },
  checkmark: {
    fontSize: 50,
    marginBottom: 40,
  },
  lottie: {
    width: 90,  
    height: 90, 
    marginBottom: 20,
  },
});
