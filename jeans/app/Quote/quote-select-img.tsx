import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import FullButton from '@/components/FullButton';

export default function PhotoSelectionScreen() {
  const router = useRouter();

  // 갤러리에서 사진 선택 -> 선택 즉시 다음 페이지로 이동
  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // 이미지 선택
      allowsMultipleSelection: false, // 한 장만 선택 가능하도록 변경
      quality: 1, // 원본 화질 유지
    });

    if (!result.canceled && result.assets.length > 0) {
      const selectedImageUri = result.assets[0].uri; // 첫 번째 선택 이미지

      // 선택된 이미지를 다음 화면으로 전달하면서 자동 이동
      router.push({
        pathname: '/Quote/quote-select-word-gallery',
        params: { imageUri: selectedImageUri },
      });
    }
  };

  return (
    <View style={styles.container}>
      <TopNavBar />

      <View style={styles.centerContainer}>
        <Text style={styles.title}>글귀를 담고 싶은 {'\n'} 사진을 선택해주세요.</Text>

        {/* 갤러리 선택 버튼 */}
        <TouchableOpacity style={styles.optionButton} onPress={pickImages}>
          <Text style={styles.buttonText}>갤러리에서 사진 선택</Text>
        </TouchableOpacity>

        {/* 기본 사진 선택 버튼 */}
        <FullButton
          title="기본 사진 선택"
          onPress={() => router.push('/Quote/quote-select-basic-img')}
        />
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
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  title: {
    fontSize: 30,
    fontFamily: 'Bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  optionButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#3DB2FF',
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Medium',
    color: 'white',
  },
});
