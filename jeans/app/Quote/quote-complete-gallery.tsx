import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import HalfButton from '@/components/HalfButton';

export default function CompleteScreen() {
  const { imageUri, quote } = useLocalSearchParams();
  const validImageUri = Array.isArray(imageUri) ? imageUri[0] : imageUri;

  return (
    <View style={styles.container}>
      <TopNavBar />
      <Text style={styles.title}>글귀 이미지가 생성되었습니다!</Text>

      {/* 선택한 이미지 위에 글귀 표시 */}
      {validImageUri ? (
        <ImageBackground source={{ uri: validImageUri }} style={styles.imageContainer}>
          <View style={styles.overlay}>
            <Text style={styles.quoteText}>{quote}</Text>
          </View>
        </ImageBackground>
      ) : (
        <Text style={styles.noImageText}>선택된 이미지가 없습니다.</Text>
      )}

      {/* 버튼 컨테이너 */}
      <View style={styles.buttonContainer}>
        <HalfButton title="사진 받기" color="#3DB2FF" onPress={() => router.push('/MakeUp/makeup-download')} />
        <HalfButton title="공유하기" onPress={() => router.push('/Share/share-select-friend')} />
      </View>

      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingTop: 30,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 100,
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 15,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quoteText: {
    fontSize: 22,
    fontFamily: 'Bold',
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  noImageText: {
    fontSize: 18,
    color: '#888',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    width: '100%',
    paddingTop: 20,
  },
});
