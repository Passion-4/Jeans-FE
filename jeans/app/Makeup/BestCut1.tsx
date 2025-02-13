import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView,TouchableOpacity } from 'react-native';
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
<TouchableOpacity style={styles.optionButton} onPress={() => router.push('/Makeup/BestCut0')}>
          <Text style={styles.buttonText}>나의 베스트 컷 찾기</Text>
        </TouchableOpacity>
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
    marginTop:30
  },
  image: {
    width: 300,
    height: 180,
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  optionButton: {
    width: '100%',
    paddingVertical: 20,
    backgroundColor: '#008DBF',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 0,
    marginTop:120
  },
  buttonText: {
    fontSize: 20,
    fontFamily:'Medium',
    color: 'white',
  },
});
