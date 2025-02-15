import React, { useState } from 'react';
import { View, TextInput, ScrollView, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router'; // 🔹 router 추가
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';

const screenWidth = Dimensions.get('window').width;
const numColumns = 2; // 🔹 2열 그리드 (변경됨)

// 🔹 더미 데이터 (dummyData 적용)
const dummyData = [
  { id: '1', image: require('../../assets/images/friend1.jpg') },
  { id: '2', image: require('../../assets/images/friend1.jpg') },
  { id: '3', image: require('../../assets/images/friend1.jpg') },
  { id: '4', image: require('../../assets/images/friend1.jpg') },
  { id: '5', image: require('../../assets/images/friend1.jpg') },
  { id: '6', image: require('../../assets/images/friend1.jpg') },
  { id: '7', image: require('../../assets/images/friend1.jpg') },
  { id: '8', image: require('../../assets/images/friend1.jpg') },
  { id: '9', image: require('../../assets/images/friend1.jpg') },
];

export default function SearchScreen() {
  const [searchText, setSearchText] = useState('');
  const router = useRouter(); // 🔹 router 선언

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* 🔍 검색창 */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="검색"
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* 📷 이미지 그리드 (dummyData 사용) */}
      <ScrollView contentContainerStyle={styles.photoGrid} showsVerticalScrollIndicator={false}>
        {dummyData.map((item) => (
          <TouchableOpacity 
            key={item.id}
            onPress={() => router.push({ pathname: '/Home/PhotoDetail', params: { photoId: item.id } })}
          >
            <Image source={item.image} style={styles.sharedPhoto} />
          </TouchableOpacity>
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
    },
    searchContainer: {
      backgroundColor: '#F1F1F1',
      paddingHorizontal: 10,
      paddingVertical: 12,
      marginTop: 110,
    },
    searchInput: {
      backgroundColor: 'white',
      height: 40,
      borderRadius: 10,
      paddingLeft: 15,
      fontSize: 18,
    },
    /** 📷 사진 그리드 (2열) */
    photoGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      paddingBottom: 100, // 하단 네비게이션 고려
      marginTop: 20,
    },
    sharedPhoto: {
      width: screenWidth / numColumns - 15, // 🔹 2열 간격 조정 (10 → **15** 변경)
      height: screenWidth / numColumns - 15,
      marginBottom: 10, // 🔹 사진 아래쪽 간격 증가
      borderRadius: 10,
    },
  });
