import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import HalfButton from '../../components/HalfButton'; 
import { useImageContext } from '../Context/ImageContext';

export default function BestShotScreen() {
  const router = useRouter();
  const { selectedImages } = useImageContext(); 

  return (
    <View style={styles.container}>
      <TopNavBar/>

      {/* 텍스트 설명 */}
      <Text style={styles.title}>
      완성된 사진입니다.{'\n'}저장하거나 공유해볼까요?
      </Text>

      {/* ✅ 첫 번째 사진만 표시 */}
      <View style={styles.imageContainer}>
        {selectedImages && selectedImages.length > 0 ? (
          <Image source={{ uri: selectedImages[0] }} style={styles.image} />
        ) : (
          <Text style={styles.emptySpaceText}>사진 없음</Text>
        )}
      </View>

      {/* 버튼 컨테이너 */}
      <View style={styles.buttonContainer}>
        <HalfButton title="사진 받기" color="#3DB2FF" onPress={() => router.push('/Makeup/makeup-download')} />
        <HalfButton title="공유하기" onPress={() => router.push('/Share/share-select-friend')} />
      </View>


      <BottomNavBar/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,

  },
  title: {
    fontSize: 25,
    fontFamily: 'Bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop:120
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 15,
    marginBottom:10
  },
  emptySpaceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
});
