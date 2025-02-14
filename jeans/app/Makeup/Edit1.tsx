import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import CustomButton from '../../components/FullButton'; // ✅ 재사용 버튼 가져오기

export default function PhotoSelectionScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* 타이틀 */}
      <Text style={styles.title}>하고 싶은 추가 보정을 {'\n'}선택해주세요.</Text>

      {/* 편집 기능 3가지 (재사용 버튼 적용) */}
      <View style={styles.buttonContainer}>
        <CustomButton title="동안" onPress={() => router.push('/Makeup/Edit2-0')} />
        <CustomButton title="새치" onPress={() => router.push('/Makeup/Edit2-1')} />
        <CustomButton title="몸매" onPress={() => router.push('/Makeup/Edit2-2')} />
        <CustomButton 
          title="추가 보정 하지 않고 사진 저장하기" 
          onPress={() => router.push('/Makeup/MakeUp_Finish')} 
          color="#3DB2FF" 
        />
      </View>
      
      <BottomNavBar />
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
    fontFamily: 'Bold',
    textAlign: 'center',
    marginBottom: 50,
    marginTop: 200,
  },
  buttonContainer: {
    alignItems: 'center',
  },
});
