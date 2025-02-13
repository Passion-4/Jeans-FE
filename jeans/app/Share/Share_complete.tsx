import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';

export default function HomeUILayout() {
  const router = useRouter();
  const { images } = useLocalSearchParams(); // 이전 페이지에서 받은 이미지 데이터

  // 선택된 이미지 목록 (JSON 형태로 넘어오기 때문에 파싱 필요)
  const selectedImages = images ? JSON.parse(images as string) : [];

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* 타이틀 */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>사진과 함께 첨부할 메세지를 녹음하세요</Text>
      </View>

      {/* 사진 표시 공간 */}
      <View style={styles.imageContainer}>
        {selectedImages.length > 0 ? (
          <Image source={{ uri: selectedImages[0] }} style={styles.image} />
        ) : (
          <Text style={styles.emptySpaceText}>사진</Text>
        )}
      </View>

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
    marginTop: 120
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
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
