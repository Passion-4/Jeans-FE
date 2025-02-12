import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';

export default function PhotoSelectionCompleteScreen() {
  const router = useRouter();
  const [animationFinished, setAnimationFinished] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>사진 선택이 완료되었습니다!</Text>
      
      {/* Lottie 애니메이션 - 크기 고정 및 사라지지 않도록 수정 */}
      <LottieView 
        source={require('../../assets/animations/Animation - 1739343498719.json')} 
        autoPlay
        loop={false} // 반복 X
        style={styles.lottie}
        onAnimationFinish={() => setAnimationFinished(true)} // 애니메이션 끝나도 유지
      />

      {/* 완료 버튼 */}
      <TouchableOpacity 
        style={styles.completeButton} 
        onPress={() => router.push('/Home/Mainpage')}>
        <Text style={styles.completeText}>완료</Text>
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
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Bold',
  },
  lottie: {
    width: 90,  
    height: 90, 
    marginBottom: 20,
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
  completeText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: 'Medium',
  },
});
