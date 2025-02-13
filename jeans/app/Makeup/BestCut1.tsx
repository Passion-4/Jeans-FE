import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import { useRouter } from 'expo-router';

export default function BestCutScreen() {
  const params = useLocalSearchParams();
  const selectedImages = params.images ? JSON.parse(params.images as string) : [];
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* 버튼 컨테이너 (가로 정렬) */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.optionButton} 
          onPress={() => router.push('/Makeup/BestCut2')}>
          <Text style={styles.buttonText}>사진 선택 완료</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.optionButton} 
          onPress={() => router.push('/Makeup/BestCut0')}>
          <Text style={styles.buttonText}>다시 선택하기</Text>
        </TouchableOpacity>
      </View>

      {/* 선택한 이미지들 표시 */}
      <ScrollView contentContainerStyle={styles.imageContainer}>
        {selectedImages.map((uri: string, index: number) => (
          <Image key={index} source={{ uri }} style={styles.image} />
        ))}
      </ScrollView>

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
    fontSize: 35,
    fontFamily: 'Bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  image: {
    width: 300,
    height: 180,
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row', // 가로 정렬
    justifyContent: 'space-between', // 버튼 간격 자동 조정
    alignItems: 'center',
    marginVertical: 20,
  },
  optionButton: {
    flex: 1, // 두 버튼이 동일한 비율을 가지도록 설정
    paddingVertical: 20,
    backgroundColor: '#008DBF',
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 10, // 버튼 간격 조정
    marginTop:100
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Medium',
    color: 'white',
  },
});
