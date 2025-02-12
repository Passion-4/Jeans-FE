import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function PhotoSelectionIntroScreen() {
  const router = useRouter();
  const [selectedBox, setSelectedBox] = useState<number | null>(null);

  // 사진 경로 배열
  const photoSources = [
    require('../../assets/images/selec1.jpg'),
    require('../../assets/images/selec2.jpg'),
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
      <Text style={styles.title}>선호하는 사진 선택</Text>
      <Text style={styles.description}>더 예뻐보이는 사진을 골라주세요.</Text>

      {/* 사진 선택 영역 */}
      {photoSources.map((source, index) => (
        <TouchableOpacity key={index} onPress={() => handlePhotoSelect(index)}>
          <Image
            source={source}
            style={[styles.photo, selectedBox === index && styles.selected]}
          />
        </TouchableOpacity>
      ))}

      {/* 확인 버튼 - 사진 선택 시만 표시 */}
      {selectedBox !== null && (
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmSelection}>
          <Text style={styles.confirmText}>확인</Text>
        </TouchableOpacity>
      )}
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
    fontFamily: 'Bold',
  },
  description: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Medium',
  },
  photo: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  selected: {
    borderWidth: 8,
    borderColor: 'rgba(255, 183, 6, 0.6)'
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
