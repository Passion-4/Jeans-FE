import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import FullButton from '../../components/FullButton';

export default function PhotoSelectionCompleteScreen() {
  const router = useRouter();
  const [animationFinished, setAnimationFinished] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>사진 선택이 {'\n'}완료되었습니다!</Text>
      
      {/* 애니메이션 */}
      <LottieView 
        source={require('../../assets/animations/Animation - 1739343498719.json')} 
        autoPlay
        loop={false} // 반복 X
        style={styles.lottie}
        onAnimationFinish={() => setAnimationFinished(true)} // 애니메이션 끝나도 유지
      />

      {/* 완료 버튼 */}
      <FullButton title='완 료' onPress={() => router.push('/Home/Mainpage')}></FullButton>
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
    fontFamily: 'Bold',
  },
  lottie: {
    width: 90,  
    height: 90, 
    marginBottom: 20,
  },
});
