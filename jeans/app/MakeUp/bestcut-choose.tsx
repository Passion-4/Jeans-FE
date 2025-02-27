import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import FullButton from '../../components/FullButton';

export default function PhotoSelectionIntroScreen() {
  const router = useRouter();
  const [selectedBox, setSelectedBox] = useState<number | null>(null);

  // ✅ 선택 가능한 사진 목록
  const photoSources = [
    require('../../assets/images/1-1.png'),
    require('../../assets/images/2-2.png'),
    require('../../assets/images/3-3.png'),
    require('../../assets/images/4-4.png'),
  ];

  const handlePhotoSelect = (index: number) => {
    setSelectedBox(index);
  };

  const handleConfirmSelection = () => {
    if (selectedBox !== null) {
      router.push({
        pathname: '/Makeup/basic-makeup',
        params: { selectedIndex: selectedBox.toString() }, // ✅ 선택한 인덱스를 쿼리 파라미터로 전달
      });
    }
  };

  return (
    <View style={styles.container}>
      <TopNavBar />

      <Text style={styles.title}>마음에 드는 얼굴을 {'\n'}하나만 선택해주세요.</Text>

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

      {selectedBox !== null && <FullButton title="확 인" onPress={handleConfirmSelection} />}

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
    fontSize: 30,
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
    marginBottom:50
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  selected: {
    borderWidth: 5,
    borderColor: '#FF616D',
  },
});
