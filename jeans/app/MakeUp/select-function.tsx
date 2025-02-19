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
      <Text style={styles.title}>원하는 사진 편집 기능을 {'\n'}선택해주세요.</Text>

      {/* 버튼 컨테이너 */}
      <View style={styles.buttonContainer}>
        <CustomButton title="나의 베스트 컷" onPress={() => router.push('/MakeUp/bestcut-select-img')} />
        <CustomButton title="사진 보정" onPress={() => router.push('/MakeUp/edit-select-img')} />
        <CustomButton title="좋은 글귀" onPress={() => router.push('/Quote/quote-select-img')} />
      </View>

      {/* 빈 공간 추가 (하단 네비게이션을 아래로 밀기 위함) */}
      <View style={{ flex: 1 }} />

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
    fontSize: 28,
    fontFamily: 'Bold',
    textAlign: 'center',
    marginBottom: 50,
    marginTop: 200,
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
  },
});
