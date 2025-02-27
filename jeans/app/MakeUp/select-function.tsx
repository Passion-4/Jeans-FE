import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import CustomButton from '../../components/FullButton';

export default function PhotoSelectionScreen() {
  const router = useRouter();
  const translateY = useRef(new Animated.Value(0)).current; // ✅ 애니메이션 값 설정

  useEffect(() => {
    // 위아래로 부드럽게 움직이는 애니메이션
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -5, // 위로 살짝 이동
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0, // 다시 원래 위치로
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* ✅ 말풍선 애니메이션 추가 */}
      <Animated.View style={[styles.tooltip, { transform: [{ translateY }] }]}>
        <Text style={styles.tooltipText}>화면에 대한 설명을 {'\n'} 볼 수 있어요!</Text>
      </Animated.View>

      {/* 타이틀 */}
      <Text style={styles.title}>원하는 사진 편집 기능을 {'\n'}선택해주세요.</Text>

      {/* 버튼 컨테이너 */}
      <View style={styles.buttonContainer}>
        <CustomButton title="나의 베스트 컷" onPress={() => router.push('/Makeup/bestcut-select-img')} />
        <CustomButton title="사진 보정" onPress={() => router.push('/Makeup/edit-select-img')} />
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
  /** 말풍선  */
  tooltip: {
    position: 'absolute',
    top: 120, // 설명서 버튼 아래 위치 조정
    left: '0%',
    marginLeft:15,
    transform: [{ translateX: -80 }], // 가운데 정렬
    backgroundColor: '#FFE2E5', // 연한 노란색 배경
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  tooltipText: {
    fontSize: 15,
    fontFamily: 'Medium',
    color: '#333',
    textAlign: 'center',
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
