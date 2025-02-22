import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import HalfButton from '@/components/HalfButton';
import FullButton from '@/components/FullButton';
import { Colors } from '@/constants/Colors';

export default function FontSizeAdjustmentScreen() {
  const [fontSize, setFontSize] = useState(19); // 기본 글씨 크기
  const router = useRouter();

  const setYouthFont = () => setFontSize(16); // 청년
  const setActiveSeniorFont = () => setFontSize(19); // 액티브 시니어
  const setSeniorFont = () => setFontSize(22); // 시니어

  // 🔹 현재 폰트 크기에 따른 경로 반환
  const getNavigationPath = () => {
    if (fontSize <= 17) return '/Home/main-page_small';
    if (fontSize <= 21) return '/Home/main-page';
    return '/Home/main-page_large';
  };

  const handleConfirm = () => {
    router.push(getNavigationPath());
  };

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* 타이틀 */}
      <Text style={styles.title}>글씨 크기 조정</Text>

      {/* 미리보기 텍스트 */}
      <View style={styles.previewContainer}>
        <Text style={[styles.previewText, { fontSize }]}>이것은 미리보기 글씨입니다.</Text>
      </View>

      {/* ✅ 버튼 컨테이너 */}
      <View style={styles.buttonContainer}>
      <HalfButton title="청년" color="#70C6E9" onPress={setYouthFont} />
      <HalfButton title="액티브 시니어" color="#4F9ED3" onPress={setActiveSeniorFont} />
      <HalfButton title="시니어" color="#0C7BBC" onPress={setSeniorFont} />
      </View>

      {/* ✅ 확인 버튼 추가 */}
      <FullButton title="확인" onPress={handleConfirm} />

      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontFamily: 'Bold',
    marginBottom: 30,
  },
  previewContainer: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 10,
  },
  previewText: {
    fontFamily: 'Medium'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '100%',
    marginBottom:20
  },
});

