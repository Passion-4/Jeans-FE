import React, { useEffect, useRef } from 'react';
import { View, Image, ImageBackground, StyleSheet, Animated, Text } from 'react-native';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1.5,
      duration: 3500,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      router.replace('/explore');
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground
      source={require('@/assets/images/bg.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <Animated.Image
        source={require('@/assets/images/real-logo.png')}
        style={[styles.logo, { transform: [{ scale: scaleAnim }] }]}
      />
      <Text style={styles.subtitle}>청춘은 바로 지금</Text>
      <Text style={styles.title}>청바지</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 24,
    color: 'black',
    marginBottom: 5,
    fontFamily: 'Landing',
  },
  title: {
    fontSize: 40,
    color: '#008DBF',
    fontFamily: 'Landing',
  },
});
