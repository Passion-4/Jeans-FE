import React, { useState }from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';

export default function CompleteSignupScreen() {
  const router = useRouter();
  const [animationFinished, setAnimationFinished] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입이 완료되었습니다!</Text>
      <LottieView 
              source={require('../../assets/animations/Animation - 1739343498719.json')} 
              autoPlay
              loop={false} // 반복 X
              style={styles.lottie}
              onAnimationFinish={() => setAnimationFinished(true)} // 애니메이션 끝나도 유지
            />

      {/* 홈 화면 또는 로그인 화면으로 이동 */}
      <TouchableOpacity 
        style={styles.signupButton} 
        onPress={() => router.push('/explore')}> {/* 홈 화면으로 이동 */}
        <Text style={styles.signupText}>로그인 하러 가기</Text>
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  checkmark: {
    fontSize: 50,
    marginBottom: 40,
  },
  signupButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#008DBF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  signupText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily:'Medium'
  },
  completeButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#008DBF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  lottie: {
    width: 90,  
    height: 90, 
    marginBottom: 20,
  },
});
