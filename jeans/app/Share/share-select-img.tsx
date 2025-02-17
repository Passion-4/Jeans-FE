import React, { useCallback } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import { useImageContext } from '../../app/Context/ImageContext';
import FullButton from '../../components/FullButton'; // ✅ FullButton 불러오기

export default function PhotoSelectionScreen() {
  const router = useRouter();
  const {setSelectedImages} = useImageContext(); // ✅ 이미지 저장을 위한 context 사용

  // 갤러리에서 사진 선택 -> 선택 즉시 다음 페이지로 이동
  const pickImages = useCallback(async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 5,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const imageUris = result.assets.map((asset) => asset.uri);

      setSelectedImages(imageUris); // ✅ 선택한 이미지를 글로벌 상태에 저장

      // 선택된 사진을 다음 화면으로 전달하면서 자동 이동
      router.push('/Share/share-select-friend');
    }
  }, [router, setSelectedImages]);

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* 타이틀 */}
      <Text style={styles.title}>공유할 사진을{'\n'}선택해주세요.</Text>

      {/* 로컬 이미지 */}
      <Image 
        source={require('../../assets/images/photo1.png')} 
        style={styles.image}
        resizeMode="contain"
      />
      
      <FullButton title="갤러리에서 사진 선택" onPress={pickImages} />

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
    marginBottom: 20,
    marginTop: 70,
  },
  image: {
    width: 200,
    height: 190,
    marginBottom: 30,
    marginTop:20
  },
});
