import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';

export default function BestCutScreen() {
  const params = useLocalSearchParams();
  const selectedImages = params.images ? JSON.parse(params.images as string) : [];

  return (
    <View style={styles.container}>
      <TopNavBar />
      <Text style={styles.title}>선택한 사진들</Text>

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
    fontSize: 30,
    fontFamily: 'Bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 500,
    height: 250,
    borderRadius: 10,
    marginBottom: 15,
  },
});
