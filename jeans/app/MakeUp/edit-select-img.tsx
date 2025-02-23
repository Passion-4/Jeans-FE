import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import CustomButton from '@/components/FullButton';

export default function PhotoSelectionScreen() {
  const router = useRouter();

  // 갤러리에서 사진 선택 -> 선택 즉시 다음 페이지로 이동
  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // 이미지 선택
      allowsMultipleSelection: true, // 여러 개 선택 가능
      selectionLimit: 5, // 최대 선택 개수
      quality: 1, // 원본 화질 유지
    })

    if (!result.canceled && result.assets) {
      const imageUris = result.assets.map((asset) => asset.uri);

      // 선택된 사진을 다음 화면으로 전달하면서 자동 이동
      router.push({
        pathname: '/MakeUp/advanced-makeup',
        params: { images: JSON.stringify(imageUris) },
      });
    }
  };

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* 타이틀 */}
      <Text style={styles.title}>보정하고 싶은 사진을 {'\n'}하나만 선택해주세요.</Text>

      {/* 갤러리 이미지 */}
      <Image 
        source={require('../../assets/images/img.png')} 
        style={styles.image}
        resizeMode="contain"
      />

      {/* 갤러리 열기 버튼 */}
      
        <CustomButton title='갤러리에서 사진 선택' onPress={pickImages}></CustomButton>
     
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
