import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import FullButton from '@/components/FullButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PhotoSelectionScreen() {
  const router = useRouter();

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selectedImageUri = result.assets[0].uri; // ✅ 선택한 사진의 URI

      // ✅ AsyncStorage에 저장
      await AsyncStorage.setItem('selectedImage', selectedImageUri);

      // ✅ 글귀 선택 화면으로 이동
      router.push('/Quote/quote-select-word-gallery');
    }
  };
  return (
    <View style={styles.container}>
      <TopNavBar />
      {/* 타이틀 */}
      <Text style={styles.title}>글귀를 담고 싶은 {'\n'} 사진을 선택해주세요.</Text>

      {/* 버튼 컨테이너 */}
      <View style={styles.buttonContainer}>
        <FullButton title='갤러리에서 사진 선택' onPress={pickImages}></FullButton>
        <FullButton title='기본 사진 선택'  onPress={() => router.push('/Quote/quote-select-basic-img')}></FullButton>
      </View>

      {/* 빈 공간 추가 (하단 네비게이션을 아래로 밀기 위함) */}
      <View style={{ flex: 1 }} />

      <BottomNavBar />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Bold',
    textAlign: 'center',
    marginBottom: 50,
    marginTop: 250,
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
  },
});
