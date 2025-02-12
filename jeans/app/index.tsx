import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function SplashScreen() {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(1)).current; // 초기 크기 1

  useEffect(() => {
    // 로고 크기 점점 커지는 애니메이션 (3초 동안)
    Animated.timing(scaleAnim, {
      toValue: 1.5, // 최종 크기 1.5배
      duration: 3500, 
      useNativeDriver: true,
    }).start();

    // 3초 후 explore.tsx(로그인 화면)으로 이동
    const timer = setTimeout(() => {
      router.replace('/explore');
    }, 3500);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 제거
  }, []);

  return (
    <LinearGradient
      colors={['rgba(255, 183, 6, 0.6)', 'rgba(255, 183, 6, 0.1)']}
      style={styles.container}
    >
      {/* Animated.Image를 사용하여 로고 크기 애니메이션 적용 */}
      <Animated.Image
        source={require('@/assets/images/Jeans-logo2.png')}
        style={[styles.logo, { transform: [{ scale: scaleAnim }] }]}
      />

      {/* Subtitle (청춘은 바로 지금) */}
      <Text style={styles.subtitle}>청춘은 바로 지금</Text>

      {/* Title (청바지) */}
      <Text style={styles.title}>청바지</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100, // 기본 크기
    height: 100,
    marginBottom: 20, // 텍스트와 간격 조절
  },
  subtitle: {
    fontSize: 16,
    color: '#1A3A5E', // 흰색 텍스트
    marginBottom: 5,
    fontFamily: 'Bold'
  },
  title: {
    fontSize: 35,
    color: '#1A3A5E', // 노란색 텍스트
    fontFamily: 'Bold'
  },
});
