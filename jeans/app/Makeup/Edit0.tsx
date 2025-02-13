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
      <Text style={styles.title1}>기본 보정이 완료되었습니다.{'\n'}</Text>
      <Text style={styles.title2}>추가 보정을 해보시겠어요?</Text>


      {/* 이미지 컨테이너 */}
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/images/people.png')} style={styles.image} />
      </View>

      {/* 버튼 컨테이너 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.noButton} onPress={() => router.push('/Makeup/MakeUp_Finish')}>
          <Text style={styles.buttonText}>아니오{'\n'}사진 저장</Text>
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
    justifyContent: 'center', // 전체 중앙 정렬 (위아래)
    alignItems: 'center', // 좌우 중앙 정렬
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
    fontFamily: 'Bold',
    marginTop: 20,
    textAlign: 'center',
  },
  animation: {
    width: 150,
    height: 150,
  },
  title1: {
    fontSize: 25,
    fontFamily: 'Bold',
    textAlign: 'center',
    marginBottom:-10,
    marginTop: 30,
  },
  title2: {
    fontSize: 30,
    fontFamily: 'Bold',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 0,
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 30, // 버튼과의 간격 추가
  },
  image: {
    width: 330,
    height: 300,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row', // 가로 배치
    justifyContent: 'center', // 중앙 정렬
    alignItems: 'center', // 위아래 중앙 정렬
    marginTop: 10,
    marginBottom:20,
    width: '100%',
  },
  noButton: {
    backgroundColor: '#008DBF',
    paddingVertical: 20,
    marginRight: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center', // 텍스트 중앙 정렬
    width:100,
    height:85
  },
  yesButton: {
    width:100,
    height:85,
    backgroundColor: '#008DBF',
    paddingVertical: 20,
    marginLeft: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center', // 텍스트 중앙 정렬
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Medium',
    textAlign: 'center', // 버튼 내 텍스트 중앙 정렬
  },
});
