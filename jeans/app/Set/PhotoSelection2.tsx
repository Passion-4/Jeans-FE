import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import FullButton from '../../components/FullButton';

export default function PhotoSelectionCompleteScreen() {
  const router = useRouter();
  const [animationFinished, setAnimationFinished] = useState(false);

  return (
    <View style={styles.container}>
      {/* ✅ 타이틀 */}
      <Text style={styles.title}>사진 선택이 {'\n'}완료되었습니다!</Text>

      {/* ✅ 고정된 Lottie 애니메이션 컨테이너 */}
      <View style={styles.lottieContainer}>
        <LottieView 
          source={require('../../assets/animations/Animation - 1739343498719.json')} 
          autoPlay
          loop={false} 
          style={styles.lottie}
          onAnimationFinish={() => setAnimationFinished(true)}
        />
      </View>

      {/* ✅ 완료 버튼 */}
      <FullButton title="완 료" onPress={() => router.push('/Home/Mainpage')} />
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

  /** ✅ 애니메이션 고정 크기 컨테이너 */
  lottieContainer: {
    width: 120, 
    height: 120, 
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginVertical: 20, 
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
});
