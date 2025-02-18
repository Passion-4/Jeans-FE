import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';

const imageSources = [
  require('../../assets/images/bg/bg1.jpg'),
  require('../../assets/images/bg/bg2.jpg'),
  require('../../assets/images/bg/bg3.jpg'),
  require('../../assets/images/bg/bg4.jpg'),
  require('../../assets/images/bg/bg5.jpg'),
  require('../../assets/images/bg/bg6.jpg'),
  require('../../assets/images/bg/bg7.png'),
  require('../../assets/images/bg/bg8.png'),
  require('../../assets/images/bg/bg9.png'),
  require('../../assets/images/bg/bg10.png'),
  require('../../assets/images/bg/bg11.png')
];

export default function BackgroundSelectionScreen() {
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();

  const handleConfirm = () => {
    if (selectedImage) {
      router.push({
        pathname: '/Quote/quote-select-word',
        params: { imageUri: selectedImage }
      });
    }
  };

  return (
    <View style={styles.container}>
      <TopNavBar />
      <Text style={styles.title}>글귀 배경 선택하기</Text>
      <FlatList
        data={imageSources}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.imageCard, selectedImage === item && styles.selectedImage]}
            onPress={() => setSelectedImage(item)}
          >
            <Image source={item} style={styles.image} />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      <TouchableOpacity
        style={[styles.customButton, !selectedImage && styles.disabledButton]}
        onPress={handleConfirm}
        disabled={!selectedImage}
      >
        <Text style={styles.customButtonText}>다 음</Text>
      </TouchableOpacity>
      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 120,
    paddingHorizontal: 0,
  },
  title: {
    fontSize: 30,
    fontFamily: 'Bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  imageCard: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    elevation: 3,
  },
  selectedImage: {
    borderWidth: 6,
    borderColor: '#FFB706',
    borderRadius:15
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  customButton: {
    width: '80%',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#008DBF',
    marginBottom: 120,
    marginLeft:35
  },
  customButtonText: {
    fontSize: 20,
    fontFamily: 'Medium',
    color: 'white',
  },
  disabledButton: {
    backgroundColor: '#B0BEC5',
  },
});
