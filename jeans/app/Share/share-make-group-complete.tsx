import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import FullButton from '@/components/FullButton';
import { Ionicons } from '@expo/vector-icons'; // ✅ 체크 아이콘 추가
import CheckAnimation from '@/components/CheckAnimation';

export default function CompleteSignupScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <TopNavBar />
      <View style={styles.content}>
        <Text style={styles.title}>그룹이 생성되었습니다!</Text>

        <CheckAnimation></CheckAnimation>

        <FullButton title='확 인' onPress={() => router.push('/Share/share-voice')} />
      </View>
      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontFamily: 'Bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});