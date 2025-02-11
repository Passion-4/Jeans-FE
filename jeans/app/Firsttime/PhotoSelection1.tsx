import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function PhotoSelectionIntroScreen() {
  const router = useRouter();
  const [selectedBox, setSelectedBox] = useState<number | null>(null);

  const handlePhotoSelect = (boxNumber: number) => {
    setSelectedBox(boxNumber);
  };

  const handleConfirmSelection = () => {
    if (selectedBox !== null) {
      router.push('/Firsttime/PhotoSelection3');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>선호하는 사진 선택</Text>
      <Text style={styles.description}>선호하는 사진을 골라주세요.</Text>

      {/* 빈 사각형 영역 */}
      <TouchableOpacity onPress={() => handlePhotoSelect(1)}>
        <View style={[styles.emptyBox, selectedBox === 1 && styles.selected]}></View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlePhotoSelect(2)}>
        <View style={[styles.emptyBox, selectedBox === 2 && styles.selected]}></View>
      </TouchableOpacity>

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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyBox: {
    width: 200,
    height: 200,
    backgroundColor: '#DDDDDD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  selected: {
    borderWidth: 5,
    borderColor: '#008DBF',
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
    fontWeight: 'bold',
  },
});