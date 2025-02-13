import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';

export default function Share2Screen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* 타이틀 */}
      <Text style={styles.title}>어떻게 보낼지 선택하세요</Text>

      {/* 옵션 버튼 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => router.push('/Share/Share_complete')}
        >
          <Text style={styles.buttonText}>각자 보내실래요?</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => router.push('/Share/Share_checkgroup')}
        >
          <Text style={styles.buttonText}>그룹에 보내실래요?</Text>
        </TouchableOpacity>
      </View>

      {/* 그만하기 버튼 */}
      <TouchableOpacity style={styles.quitButton} onPress={() => router.push('/Home/Mainpage')}>
        <Text style={styles.quitText}>그만하기</Text>
      </TouchableOpacity>

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
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  optionButton: {
    width: '200%',
    paddingVertical: 40,
    backgroundColor: '#87CEEB',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  quitButton: {
    width: '100%',
    paddingVertical: 20,
    backgroundColor: '#008DBF',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 50,
  },
  quitText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
