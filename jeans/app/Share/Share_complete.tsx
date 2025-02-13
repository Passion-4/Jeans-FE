import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useImageContext } from '../../app/Context/ImageContext'
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';

export default function HomeUILayout() {
  const router = useRouter();
  const { selectedImages } = useImageContext(); // Context에서 이미지 가져오기

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* 타이틀 */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>사진과 함께 첨부할 메세지를 녹음하세요</Text>
      </View>

      {/* 선택한 이미지 표시 공간 */}
      <ScrollView contentContainerStyle={styles.imageContainer}>
        {selectedImages.length > 0 ? (
          selectedImages.map((uri: string, index: number) => (
            <Image key={index} source={{ uri }} style={styles.image} />
          ))
        ) : (
          <Text style={styles.emptySpaceText}>사진</Text>
        )}
      </ScrollView>

      {/* 확인 버튼 */}
      <TouchableOpacity style={styles.confirmButton} onPress={() => router.push('/Home/Mainpage')}>
        <Text style={styles.confirmText}>확인</Text>
      </TouchableOpacity>

      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  titleContainer: {
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingHorizontal: 15,
    marginTop: 120,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 300, // 선택한 이미지 크기 조정
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  emptySpaceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  confirmButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#008DBF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 20,
    marginBottom: 120,
  },
  confirmText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
