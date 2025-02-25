import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import HalfButton from '@/components/HalfButton';

const quotesDictionary = {
  건강: ['건강은 최고의 재산이다.', '몸이 건강해야 마음도 건강하다.', '오늘도 건강한 하루 되세요!'],
  응원: ['당신의 꿈을 응원합니다!', '포기하지 마세요, 당신은 해낼 수 있어요!', '앞으로 나아가는 당신이 멋져요.'],
  안부: ['잘 지내시죠? 항상 응원합니다.', '따뜻한 하루 보내세요!', '오늘도 행복하세요!'],
  위로: ['괜찮아요, 당신은 충분히 잘하고 있어요.', '힘든 날도 지나가요.', '여기서 잠시 쉬어가요.'],
  축하: ['축하합니다! 행복한 날 되세요.', '당신의 성취를 축하해요!', '오늘은 당신을 위한 날이에요!'],
  명언: ['"성공은 준비된 자에게 온다." - 파스퇴르', '"노력은 배신하지 않는다." - 손흥민', '"꿈을 꾸는 사람이 세상을 바꾼다." - 앨런 케이']
} as const;

export default function QuoteSelectImg1() {
  const { selectedKeyword } = useLocalSearchParams();
  const [imageUri, setImageUri] = useState<string | null>(null);

  // ✅ 저장된 이미지 불러오기
  useEffect(() => {
    const loadImage = async () => {
      const storedImage = await AsyncStorage.getItem('selectedImage');
      setImageUri(storedImage);
    };
    loadImage();
  }, []);

  const randomQuote = quotesDictionary[selectedKeyword as keyof typeof quotesDictionary]?.[
    Math.floor(Math.random() * quotesDictionary[selectedKeyword as keyof typeof quotesDictionary].length)
  ] || "선택한 키워드에 해당하는 글귀가 없습니다.";

  return (
    <View style={styles.container}>
      <TopNavBar />
      <Text style={styles.title}>글귀 이미지가 생성되었습니다!</Text>

      {imageUri && (
        <ImageBackground source={{ uri: imageUri }} style={styles.imageBackground}>
          <View style={styles.overlay}>
            <Text style={styles.quoteText}>{randomQuote}</Text>
          </View>
        </ImageBackground>
      )}

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
    flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center',
    paddingTop: 70, paddingBottom: 80,
  },
  title: {
    fontSize: 30, fontFamily: 'Bold', textAlign: 'center', marginBottom: 20, marginTop:30,
  },
  imageBackground: {
    width: 250, height: 300, justifyContent: 'center', alignItems: 'center',
    borderRadius: 15, overflow: 'hidden',
  },
  overlay: {
    width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center', alignItems: 'center',
  },
  quoteText: {
    fontSize: 30, fontFamily: 'Quote', color: '#FFFFFF', textAlign: 'center', paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30,
    width: '100%', paddingTop: 20,
  },
});
