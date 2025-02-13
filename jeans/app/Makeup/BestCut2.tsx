import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

// 네비게이션 바 가져오기
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';

export default function PhotoSelectionIntroScreen() {
  const router = useRouter();
  const [selectedBox, setSelectedBox] = useState<number | null>(null);

  // 사진 경로 배열
  const photoSources = [
    require('../../assets/images/image 16.png'),
    require('../../assets/images/image 17.png'),
    require('../../assets/images/image 18.png'),
    require('../../assets/images/image 19.png'),
  ];

  const handlePhotoSelect = (boxNumber: number) => {
    setSelectedBox(boxNumber);
  };

  const handleConfirmSelection = () => {
    if (selectedBox !== null) {
      router.push('/Set/PhotoSelection2');
    }
  };

  return (
    <View style={styles.container}>
      {/* 상단 네비게이션 바 */}
      <TopNavBar />

      <Text style={styles.title}>마음에 드는 얼굴을 {'\n'}하나만 선택해주세요.</Text>

      {/* 2x2 사진 정렬 */}
      <View style={styles.photoGrid}>
        {photoSources.map((source, index) => (
          <TouchableOpacity key={index} onPress={() => handlePhotoSelect(index)}>
            <Image
              source={source}
              style={[styles.photo, selectedBox === index && styles.selected]}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* 확인 버튼 - 사진 선택 시만 표시 */}
      {selectedBox !== null && (
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmSelection}>
          <Text style={styles.confirmText}>확인</Text>
        </TouchableOpacity>
      )}

      {/* 하단 네비게이션 바 */}
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
    fontSize: 35,
    fontFamily: 'Bold',
    textAlign: 'center',
    marginBottom: 20, // 이미지와 간격 추가
    marginTop: 30,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap', // 자동 줄 바꿈
    justifyContent: 'center',
    gap: 20, // 사진 간 간격 조정
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  selected: {
    borderWidth: 8,
    borderColor: 'rgba(255, 183, 6, 0.6)',
  },
  confirmButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#008DBF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  confirmText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: 'Medium',
  },
});
