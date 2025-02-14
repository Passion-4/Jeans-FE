import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import HalfButton from '../../components/HalfButton'; // ✅ 재사용 버튼 적용

export default function BestCutScreen() {
  const params = useLocalSearchParams();
  const selectedImages = params.images ? JSON.parse(params.images as string) : [];
  const router = useRouter();
  const [expanded, setExpanded] = useState(false); // ✅ 전체 보기 상태

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* ✅ 겹쳐진 사진 영역 */}
      <TouchableOpacity onPress={() => setExpanded(!expanded)} style={styles.imageStackContainer}>
        {!expanded ? (
          selectedImages.slice(0, 4).map((uri: string, index: number) => (
            <Image key={index} source={{ uri }} style={[styles.image, { top: index * 8, left: index * 8 }]} />
          ))
        ) : (
          <ScrollView contentContainerStyle={styles.imageContainer}>
            {selectedImages.map((uri: string, index: number) => (
              <Image key={index} source={{ uri }} style={styles.fullImage} />
            ))}
          </ScrollView>
        )}
      </TouchableOpacity>

      {/* ✅ 버튼 컨테이너 */}
      <View style={styles.buttonContainer}>
        <HalfButton title="다시 선택하기" color="#3DB2FF"onPress={() => router.push('/Makeup/BestCut0')} />
        <HalfButton title="사진 선택 완료" onPress={() => router.push('/Makeup/BestCut2')} />
      </View>

      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  imageStackContainer: {
    width: 250,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    marginTop: 250,
  },
  image: {
    width: 250,
    height: 150,
    borderRadius: 10,
    borderWidth: 2, // ✅ 테두리 추가 (사진 구분)
    borderColor: 'black',
    position: 'absolute',
  },
  fullImage: {
    width: 300,
    height: 200,
    borderRadius: 10,
    borderWidth: 2, // ✅ 세로 리스트에서도 테두리 유지
    borderColor: '#008DBF',
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
    width: '100%',
    paddingHorizontal: 40,
  },
});

