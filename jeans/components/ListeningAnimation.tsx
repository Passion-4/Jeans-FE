import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

export default function ListeningAnimation() {
  // ✅ 5개의 점에 대한 애니메이션 값 생성
  const animations = Array(5)
    .fill(0)
    .map(() => useRef(new Animated.Value(0)).current);

  useEffect(() => {
    const startAnimation = (animatedValue: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    // ✅ 각 점에 대해 약간의 딜레이를 주면서 애니메이션 시작
    animations.forEach((anim, index) => {
      startAnimation(anim, index * 150);
    });
  }, []);

  // ✅ 점의 색상 배열 (Google Assistant 느낌)
  const colors = ['#FFE2E5', '#F1B6CF', '#F282B0', '#FF616D', '#ED3241'];

  return (
    <View style={styles.container}>
      <View style={styles.dotContainer}>
        {animations.map((anim, index) => (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: colors[index] },
              {
                transform: [
                  {
                    translateY: anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -10], // 위아래로 움직이게
                    }),
                  },
                  {
                    scale: anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.3], // 크기 확대
                    }),
                  },
                ],
              },
            ]}
          />
        ))}
      </View>
      <Text style={styles.listeningText}>듣는 중입니다...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  listeningText: {
    fontSize: 30,
    fontFamily: 'Bold',
    color: 'white',
    marginTop: 15,
    textAlign: 'center',
  },
});
