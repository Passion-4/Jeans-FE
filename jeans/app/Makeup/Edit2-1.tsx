import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';

export default function BestShotScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<string>("원본"); // 기본값을 "원본"으로 설정

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* 텍스트 설명 */}
      <Text style={styles.title}>새치 보정을 선택하세요.</Text>

      {/* 이미지 컨테이너 */}
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/images/people.png')} style={styles.image} />

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
      </View>

      {/* 버튼 컨테이너 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => router.push('/Makeup/Edit1')}>
          <Text style={styles.buttonText}>취소</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.confirmButton} onPress={() => router.push('/Makeup/MakeUp_Finish')}>
          <Text style={styles.buttonText}>완료</Text>
        </TouchableOpacity>
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
    fontSize: 30,
    fontFamily: 'Bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
  },
  image: {
    width: 330,
    height: 300,
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
  cancelButton: {
    flex: 1,
    backgroundColor: '#3DB2FF',
    paddingVertical: 15,
    marginRight: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#008DBF',
    paddingVertical: 15,
    marginLeft: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Medium',
  },
});
