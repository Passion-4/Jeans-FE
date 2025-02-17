import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import FullButton from '@/components/FullButton';

export default function ShareCheckGroupScreen() {
  const router = useRouter();
  const { name } = useLocalSearchParams(); // 이전 페이지에서 전달된 친구 이름 데이터 활용

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* 타이틀 */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>검색된 친구</Text>
      </View>

      {/* 친구 정보 표시 */}
      <View style={styles.friendContainer}>
        <Image 
          source={require('../../assets/images/icon.png')} // 기본 프로필 이미지
          style={styles.friendImage}
        />
        <Text style={styles.friendName}>{name || '이름 없음'}</Text> 
      </View>

      <View style={styles.buttonContainer}>
      <FullButton title='친구 요청 보내기' onPress={() => router.push('/Friend/send-complete')}></FullButton>
      </View>
      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
    marginTop: 160,
    marginBottom: 30,
  },
  title: {
    fontSize: 35,
    fontFamily:'Bold',
    textAlign: 'center',
  },
  friendContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  friendImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  friendName: {
    fontSize: 20,
    fontFamily:'Medium',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 180,
  },
 
});
