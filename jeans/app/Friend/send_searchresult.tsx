import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';

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

      {/* 버튼 컨테이너 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.optionButton} 
          onPress={() => router.push('/Friend/send_complete')}
        >
          <Text style={styles.buttonText}>친구 요청 보내기</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>뒤로가기</Text>
        </TouchableOpacity>
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
    marginTop: 100,
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  friendContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  friendImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  friendName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  optionButton: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#87CEEB',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  backButton: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#008DBF',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});
