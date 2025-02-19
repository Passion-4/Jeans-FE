import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import HalfButton from '@/components/HalfButton';

export default function QuoteSelectImg1() {
  const { friendImage, quote } = useLocalSearchParams();

  // friendImage가 string 형태이면 JSON으로 파싱
  const parsedFriendImage = typeof friendImage === "string" ? JSON.parse(friendImage) : friendImage;

  return (
    <View style={styles.container}>
      <TopNavBar />
      <Text style={styles.title}>글귀 이미지가 생성되었습니다!</Text>

      {/* 배경 이미지로 설정 */}
      <ImageBackground source={parsedFriendImage} style={styles.imageBackground}>
        <View style={styles.overlay}>
          <Text style={styles.quoteText}>{quote}</Text>
        </View>
      </ImageBackground>


      {/* 버튼 컨테이너 */}
      <View style={styles.buttonContainer}>
        <HalfButton title="사진 받기" color="#3DB2FF" onPress={() => router.push('/MakeUp/makeup-download')} />
        <HalfButton title="공유하기" onPress={() => router.push('/Share/share-select-friend')} />
      </View>


      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 70,
    paddingBottom:80
  },
  title: {
    fontSize: 24,
    fontFamily: 'Bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  imageBackground: {
    width: 300, // 원하는 크기로 조정
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    overflow: 'hidden', // 배경 이미지 둥글게
  },
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // 살짝 어두운 오버레이 추가
    justifyContent: 'center',
    alignItems: 'center',
  },
  quoteText: {
    fontSize: 22,
    fontFamily: 'Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    width:'100%',
    paddingTop:20
  },
});
