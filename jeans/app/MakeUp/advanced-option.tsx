import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import CustomButton from '../../components/FullButton'; 

export default function PhotoSelectionScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* 타이틀 */}
      <Text style={styles.title}>하고 싶은 추가 보정을 {'\n'}선택해주세요.</Text>

      {/* 편집 기능 3가지 */}
      <View style={styles.buttonContainer}>
        <CustomButton title="동안" onPress={() => router.push('/Makeup/advanced-younger')} />
        <CustomButton title="V라인" onPress={() => router.push('/Makeup/advanced-grayhair')} />
        <CustomButton title="머리숱" onPress={() => router.push('/Makeup/advanced-body')} />
        <CustomButton 
          title="추가 보정 하지 않고 사진 저장" 
          onPress={() => router.push('/Makeup/makeup-finish')} 
          color="#FF616D" 
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
    fontSize: 30,
    fontFamily: 'Bold',
    textAlign: 'center',
    marginBottom: 50,
    marginTop: 150,
  },
  buttonContainer: {
    alignItems: 'center',
  },
});
