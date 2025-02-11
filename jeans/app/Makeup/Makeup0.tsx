import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function PhotoSelectionScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 상단 배너 */}
      <View style={styles.banner}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={40} color="black" />
        </TouchableOpacity>
      </View>

      {/* 타이틀 */}
      <Text style={styles.title}>보정하고 싶은 사진을 선택해주세요.</Text>

      {/* 버튼 컨테이너 */}
      {/* 베스트컷 예정정 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.optionButton} 
          
        >
          <Text style={styles.buttonText}>베스트 컷</Text>
        </TouchableOpacity>
        {/* 보정 예정*/}
        <TouchableOpacity 
          style={styles.optionButton} 

        >
          <Text style={styles.buttonText}>보 정</Text>
        </TouchableOpacity>
      </View>
    
    {/* 하단 네비게이션 바 */}
        <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navText}>홈</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.centerButton}>
            <Ionicons name="mic" size={60} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/Makeup/Makeup0')}>
            <Text style={styles.navText}>보정</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  banner: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 50,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  optionButton: {
    width: '100%',
    paddingVertical: 20,
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
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  navText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  centerButton: {
    width: 100,
    height: 80,
    backgroundColor: '#008DBF',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
