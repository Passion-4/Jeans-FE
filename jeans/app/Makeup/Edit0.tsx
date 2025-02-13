import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';

export default function BestShotScreen() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    // 3초 후 애니메이션 종료 -> 실제 화면 표시
    const timer = setTimeout(() => {
      setIsProcessing(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isProcessing) {
    return (
      <View style={styles.processingContainer}>
        <LottieView
          source={require('../../assets/animations/Animation - 1739445445148.json')} // JSON 애니메이션
          autoPlay
          loop
          style={styles.animation}
        />
        <Text style={styles.processingText}>기본 보정 중입니다...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* 텍스트 설명 */}
      <Text style={styles.title}>기본 보정이 완료되었습니다.{'\n'}추가 보정을 해보시겠어요?</Text>

      {/* 이미지 컨테이너 */}
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/images/people.png')} style={styles.image} />
      </View>

      {/* 버튼 컨테이너 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.noButton} onPress={() => router.push('/Makeup/BestCut2')}>
          <Text style={styles.buttonText}>아니오</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.yesButton} onPress={() => router.push('/Makeup/Edit1')}>
          <Text style={styles.buttonText}>예</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  processingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  processingText: {
    fontSize: 30,
    fontFamily:'Bold',
    marginTop: 20,
  },
  animation: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 30,
    fontFamily: 'Bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: 330,
    height: 300,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 40,
  },
  noButton: {
    flex: 1,
    backgroundColor: '#008DBF',
    paddingVertical: 15,
    marginRight: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  yesButton: {
    flex: 1,
    backgroundColor: '#008DBF',
    paddingVertical: 15,
    marginLeft: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
