import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import HalfButton from '../../components/HalfButton';
import { Image as RNImage } from 'react-native';
import { useImageContext } from '../Context/ImageContext';
import { useLocalSearchParams } from 'expo-router';

export default function BestShotScreen() {
  const router = useRouter();
  const [showOriginal, setShowOriginal] = useState(false);
  const { setSelectedImages } = useImageContext();

  
const params = useLocalSearchParams();
const selectedIndex = params.selectedIndex ? Number(params.selectedIndex) : 0;

const originalImages = [
  require('@/assets/images/데모이미지/1-기본.png'),
  require('@/assets/images/데모이미지/2-기본.png'),
  require('@/assets/images/데모이미지/3-기본.jpg'),
  require('@/assets/images/데모이미지/4-기본.jpg'),
];


const editedImages = [
  require('@/assets/images/데모이미지/1-slim.png'), // 인덱스 0 - V라인 적용
  require('@/assets/images/데모이미지/2-slim.png'), // 인덱스 1 - V라인 적용
  require('@/assets/images/데모이미지/3-slim.png'), // 인덱스 2 - V라인 적용
  require('@/assets/images/데모이미지/4-slim.png'), // 인덱스 3 - V라인 적용
];

const originalImage = originalImages[selectedIndex];
const editedImage = editedImages[selectedIndex];

  // ✅ `uri` 형식으로 변환 (React Native에서 require()된 이미지 처리)
  const editedImageUri = RNImage.resolveAssetSource(editedImage).uri;

  // ✅ 보정된 사진을 공유 페이지로 전달하는 함수
  const handleShare = () => {
  setSelectedImages([editedImageUri]); // ✅ 보정된 이미지만 저장
  router.push({
    pathname: '/Share/share-select-friend',
    params: { sharedImageUri: editedImageUri }, // ✅ 공유 화면으로 보정된 이미지 넘김
  });
};

  

  return (
    <View style={styles.container}>
      <TopNavBar />
      <Text style={styles.title}>V라인 보정 결과물입니다.</Text>

      <View style={styles.imageContainer}>
      <Image 
  source={showOriginal ? originalImage : editedImage} 
  style={styles.image} 
/>

        <TouchableOpacity 
          style={styles.toggleButton} 
          onPress={() => setShowOriginal(!showOriginal)}
        >
          <Text style={styles.toggleButtonText}>
            {showOriginal ? "보정된 사진 보기" : "원본 보기"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <HalfButton title="저장" color="#FF616D" onPress={() => router.push('/MakeUp/advanced-option')} />
        <HalfButton title="공유" onPress={handleShare} />
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
  title: {
    fontSize: 28,
    fontFamily: 'Bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 40,
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginBottom: 30,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
  toggleButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  toggleButtonText: {
    fontSize: 16,
    fontFamily: 'Medium',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 40,
  },
});
