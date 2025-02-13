import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';

export default function ShareCheckGroupScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* 타이틀 */}
      <Text style={styles.title}>그룹이 존재합니다</Text>

      {/* 그룹 정보 표시 */}
      <View style={styles.groupContainer}>
        <Image 
          source={require('../../assets/images/icon.png')} // 그룹 대표 이미지
          style={styles.groupImage}
        />
        <Text style={styles.groupName}>청바지</Text>
        <Text style={styles.groupType}>그룹</Text>
      </View>

      {/* 버튼 컨테이너 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.optionButton} 
          onPress={() => router.push('/Share/Share_voice')}
        >
          <Text style={styles.buttonText}>그룹에 보내기</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50,
  },
  groupContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  groupImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 30,
  },
  groupName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  groupType: {
    fontSize: 14,
    color: '#777',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionButton: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#87CEEB',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
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

