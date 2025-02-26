import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import CustomButton from '@/components/FullButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PhotoSelectionScreen() {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);

  // 이미지 선택 후 API 호출
  const pickImageAndUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, 
      allowsMultipleSelection: false,
      quality: 1,
    });
  
    if (!result.canceled && result.assets) {
      const imageUri = result.assets[0].uri;
  
      try {
        const token = await AsyncStorage.getItem('accessToken');
  
        if (!token) {
          console.error("❌ 토큰이 없습니다. 로그인이 필요합니다.");
          return;
        }
  
        // ✅ 이미지 파일을 Blob으로 변환
        const response = await fetch(imageUri);
        const blob = await response.blob();
  
        let formData = new FormData();
        formData.append('image', {
          uri: imageUri,
          name: 'photo.jpg',
          type: 'image/jpeg',
        } as unknown as Blob);
  
        let res = await fetch('https://api.passion4-jeans.store/photo/basic', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });
  
        const textResponse = await res.text();
        if (!textResponse) {
          throw new Error('서버에서 응답이 없습니다.');
        }
  
        let data;
        try {
          data = JSON.parse(textResponse);
          console.log('API 응답 데이터:', data); // ✅ 응답 확인용 로그
        } catch (err) {
          console.error('JSON Parse 오류: 서버 응답이 올바르지 않습니다.', textResponse);
          return;
        }
  
        if (data.originalUrl && data.editedUrl) {
          console.log('✅ 보정된 이미지 URL:', data.editedUrl);
          router.push({
            pathname: '/MakeUp/advanced-makeup',
            params: {
              originalUrl: data.originalUrl,
              editedUrl: data.editedUrl,
            },
          });
        } else {
          console.error('❌ API 응답에 필요한 URL이 없습니다:', data);
        }
      } catch (error) {
        console.error('❌ 이미지 업로드 중 오류 발생:', error);
      }
    }
  };
  
  
  return (
    <View style={styles.container}>
      <TopNavBar />
      <Text style={styles.title}>보정하고 싶은 사진을 {'\n'}한 장 선택해주세요.</Text>

      <Image 
        source={require('../../assets/images/senior.png')} 
        style={styles.image}
        resizeMode="contain"
      />

      <CustomButton title={isUploading ? '업로드 중...' : '갤러리에서 사진 선택'} onPress={pickImageAndUpload} disabled={isUploading} />

      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontFamily: 'Bold',
    textAlign: 'center',
    marginBottom: 20, 
    marginTop: 30,
  },
  image: {
    width: 200, 
    height: 180,
    marginBottom: 30,
  },
});
