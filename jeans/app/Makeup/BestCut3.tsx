import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import HalfButton from '../../components/HalfButton'; // ✅ 재사용 버튼 적용
import { useImageContext } from '../Context/ImageContext';

export default function BestShotScreen() {
  const router = useRouter();
  const { selectedImages } = useImageContext(); 

  return (
    <View style={styles.container}>
      <TopNavBar/>

      {/* 텍스트 설명 */}
      <Text style={styles.title}>
        베스트샷입니다.{'\n'}기본 보정을 하시겠어요?
      </Text>

      {/* 일단 임의로 첫 번째 사진 표시 */}
      <View style={styles.imageContainer}>
        {selectedImages && selectedImages.length > 0 ? (
          <Image source={{ uri: selectedImages[0] }} style={styles.image} />
        ) : (
          <Text style={styles.emptySpaceText}>사진 없음</Text>
        )}
      </View>

      {/* 버튼 컨테이너 */}
      <View style={styles.buttonContainer}>
        <HalfButton 
          title="아니오" 
          color="#3DB2FF"
          onPress={() => router.push('/Makeup/MakeUp_Finish')} 
        />
        <HalfButton 
          title="예" 
          onPress={() => router.push('/Makeup/Edit0')} 
        />
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
    fontSize: 30,
    fontFamily: 'Bold',
    textAlign: 'center',
    marginBottom: 15,
    marginTop:150
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
    marginBottom:30
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
