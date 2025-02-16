import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import HalfButton from '../../components/HalfButton'; // ✅ 재사용 버튼 적용
import { useImageContext } from '../Context/ImageContext';

export default function BestShotScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<string>("원본"); // 기본값을 "원본"으로 설정
  const { selectedImages } = useImageContext(); 

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* 텍스트 설명 */}
      <Text style={styles.title}>동안 보정을 선택하세요.</Text>

      {/* 일단 임의로 첫 번째 사진 표시 */}
                  <View style={styles.imageContainer}>
                    {selectedImages && selectedImages.length > 0 ? (
                      <Image source={{ uri: selectedImages[0] }} style={styles.image} />
                    ) : (
                      <Text style={styles.emptySpaceText}>사진 없음</Text>
                    )}
                  </View>
        {/* 보정 옵션 버튼 */}
        <View style={styles.filterContainer}>
          {["원본", "조금", "많이"].map((label, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.filterButton, selectedFilter === label && styles.selectedFilter]}
              onPress={() => setSelectedFilter(label)}
            >
              <Text style={[styles.filterText, selectedFilter === label && styles.selectedFilterText]}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>


      {/* 버튼 컨테이너 */}
      <View style={styles.buttonContainer}>
        <HalfButton title="그만두기" color="#3DB2FF"onPress={() => router.push('/Makeup/Edit1')} />
        <HalfButton title="완료" onPress={() => router.push('/Makeup/Edit1')} />
      </View>
      
      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 40,
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
  filterContainer: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom:250
  },
  filterButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginHorizontal: 5,
    
  },
  selectedFilter: {
    backgroundColor: '#FFFFFF', // 선택된 버튼 배경을 흰색으로 변경
  },
  filterText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Medium',
  },
  selectedFilterText: {
    color: '#000', // 선택된 버튼의 텍스트를 검은색으로 변경
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 40,
  },
  emptySpaceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});
