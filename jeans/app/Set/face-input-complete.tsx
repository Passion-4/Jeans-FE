import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import FullButton from '@/components/FullButton';
import { Ionicons } from '@expo/vector-icons';
import CheckAnimation from '@/components/CheckAnimation';

export default function FriendRequestCompleteScreen() {
  const router = useRouter();


  return (
    <View style={styles.container}>

      <View style={styles.content}>
        <Text style={styles.title}>사진이 선택되었습니다!</Text>

        <CheckAnimation></CheckAnimation>

        <FullButton title="확 인" onPress={() => router.push('/Set/photo-selection1')} />
      </View>
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
    fontSize: 28,
    fontFamily: 'Bold',
    textAlign: 'center',
    marginBottom: 20,
  },

});
