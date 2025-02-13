




import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar'

export default function PhotoSelectionScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
    <TopNavBar/>

    {/* 타이틀 */}
    <Text style={styles.title}>원하는 사진 편집 기능을 {'\n'}선택해주세요. </Text>

      {/* 편집 기능 3가지 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.optionButton} onPress={() => router.push('/Makeup/BestCut0')}>
          <Text style={styles.buttonText}>나의 베스트 컷 찾기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.buttonText}>사진 보정</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.buttonText}>콜라주 만들기</Text>
        </TouchableOpacity>
      </View>

      {/* 빈 공간 추가 (하단 네비게이션을 아래로 밀기 위함) */}
      <View style={{ flex: 1 }} />

      <BottomNavBar/>

    
          </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // 전체 화면을 채우도록 설정
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 35,
    fontFamily:'Bold',
    textAlign: 'center',
    marginBottom: 50,
    marginTop:200
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
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 20,
    fontFamily:'Medium',
    color: 'white',
  },
});
