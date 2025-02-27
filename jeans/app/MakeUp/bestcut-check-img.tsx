import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import HalfButton from '../../components/HalfButton';

export default function BestCutScreen() {
  const router = useRouter();

  // ✅ 로컬 이미지 리스트
  const localImages = [
    require('@/assets/images/1.png'),
    require('@/assets/images/2.png'),
    require('@/assets/images/3.jpg'),
    require('@/assets/images/4.jpg'),
  ];

  // ✅ 현재 보여지는 이미지 인덱스
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // ✅ 이전 사진 보기
  const handlePrevImage = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  // ✅ 다음 사진 보기
  const handleNextImage = () => {
    if (selectedImageIndex < localImages.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* ✅ 타이틀 문구 */}
      <Text style={styles.title}>선택된 사진을 보려면 {'\n'}옆으로 넘겨보세요</Text>

      {/* ✅ 이미지 뷰어 */}
      <View style={styles.imageViewer}>
        {/* 왼쪽 화살표 (첫 번째 이미지가 아닐 때만 표시) */}
        {selectedImageIndex > 0 && (
          <TouchableOpacity style={styles.arrowLeft} onPress={handlePrevImage}>
            <Ionicons name="chevron-back-circle" size={40} color="#FFE2E5" />
          </TouchableOpacity>
        )}

        {/* 현재 선택된 이미지 */}
        <Image source={localImages[selectedImageIndex]} style={styles.image} />

        {/* 오른쪽 화살표 (마지막 이미지가 아닐 때만 표시) */}
        {selectedImageIndex < localImages.length - 1 && (
          <TouchableOpacity style={styles.arrowRight} onPress={handleNextImage}>
            <Ionicons name="chevron-forward-circle" size={40} color="#FFE2E5" />
          </TouchableOpacity>
        )}
      </View>

      {/* ✅ 버튼 컨테이너 */}
      <View style={styles.buttonContainer}>
        <HalfButton title="다시 선택하기" color="#FF616D" onPress={() => router.push('/MakeUp/bestcut-select-img')} />
        <HalfButton title="사진 선택 완료" onPress={() => router.push('/MakeUp/bestcut-choose')} />
      </View>

      <BottomNavBar />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontFamily: 'Bold',
    textAlign: 'center',
    marginBottom: 20, // 이미지와 간격 추가
    marginTop: 180,
  },
  imageViewer: {
    width: '100%',
    height: 250, 
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 10,
  },
  image: {
    width: 260,
    height: 200,
    borderRadius: 10,
  },
  arrowLeft: {
    position: 'absolute',
    left: -10,
  },
  arrowRight: {
    position: 'absolute',
    right: -10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '100%',
    paddingHorizontal: 20,
  },
});
