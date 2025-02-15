import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import FullButton from '../../components/FullButton';
import { useImageContext } from '../Context/ImageContext';

export default function PhotoSelectionScreen() {
  const router = useRouter();
  const { setSelectedImages } = useImageContext(); // ✅ 이미지 저장을 위한 context 사용
  

  // 갤러리에서 사진 선택 -> 선택 즉시 다음 페이지로 이동
  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // 이미지 선택
      allowsMultipleSelection: true, // 여러 개 선택 가능
      selectionLimit: 6, // 최대 선택 개수
      quality: 1, // 원본 화질 유지
    });

    

    if (!result.canceled && result.assets) {
      const imageUris = result.assets.map((asset) => asset.uri);
      setSelectedImages(imageUris); // ✅ 선택한 이미지를 글로벌 상태에 저장


      // 선택된 사진을 다음 화면으로 전달하면서 자동 이동
      router.push({
        pathname: '/Makeup/BestCut1',
        params: { images: JSON.stringify(imageUris) },
      });
    }
  };

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* 타이틀 */}
      <Text style={styles.title}>단체 사진 여러 개를 {'\n'}선택해주세요.</Text>

      {/* 로컬 이미지 추가 */}
      <Image 
        source={require('../../assets/images/people.png')} // assets 폴더의 이미지
        style={styles.image}
        resizeMode="contain"
      />

      {/* 갤러리 열기 버튼 */}
      <FullButton title='갤러리에서 사진 선택' onPress={pickImages}></FullButton>

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
    fontSize: 35,
    fontFamily: 'Bold',
    textAlign: 'center',
    marginBottom: 20, // 이미지와 간격 추가
    marginTop: 50,
  },
  image: {
    width: 200, // 이미지 크기 조정
    height: 200,
    marginBottom: 30, // 버튼과의 간격 추가
  },

});
