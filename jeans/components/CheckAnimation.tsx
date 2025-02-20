import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // ✅ 체크 아이콘 추가

export default function CheckAnimation() {
  // ✅ 애니메이션 값 설정
  const circleScale = useRef(new Animated.Value(0)).current;
  const checkScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // ✅ 원이 커지는 애니메이션
    Animated.timing(circleScale, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start(() => {
      // ✅ 체크 아이콘이 나타나는 애니메이션
      Animated.timing(checkScale, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  }, []);

  return (
    <View style={styles.animationWrapper}>
      {/* ✅ 원 애니메이션 */}
      <Animated.View
        style={[
          styles.circle,
          { transform: [{ scale: circleScale }] },
        ]}
      />
      {/* ✅ 체크 아이콘 */}
      <Animated.View style={[styles.check, { transform: [{ scale: checkScale }] }]}>
        <Ionicons name="checkmark" size={60} color="white" />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  /** ✅ 애니메이션 컨테이너 */
  animationWrapper: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginVertical: 20,
  },

  /** ✅ 원 애니메이션 */
  circle: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 60,
    backgroundColor: '#FF616D',
    opacity: 0.9,
  },

  /** ✅ 체크 아이콘 */
  check: {
    position: 'absolute',
  },
});
