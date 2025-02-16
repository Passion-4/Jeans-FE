import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { useRouter } from 'expo-router';

export default function BottomNavBar() {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false); // 🔹 녹음 모달 상태 관리

  return (
    <>
      {/* ✅ 하단 네비게이션 바 고정 */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/Home/Mainpage')}>
          <Text style={styles.navText}>친구 소식</Text>
        </TouchableOpacity>

        {/* 🔹 마이크 버튼 */}
        <TouchableOpacity style={styles.centerButton} onPress={() => setIsRecording(true)}>
          <Ionicons name="mic" size={50} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/Makeup/Makeup0')}>
          <Text style={styles.navText}>사진 편집</Text>
        </TouchableOpacity>
      </View>

      {/* 🔹 녹음 모달 */}
      {/* 🔹 녹음 모달 */}
<Modal visible={isRecording} transparent animationType="fade">
  <View style={styles.modalContainer}>
    {/* ✅ 고정된 크기의 뷰에 LottieView 배치 */}
    <View style={styles.animationContainer}>
      <LottieView
        source={require('../assets/animations/Animation - 1739445445148.json')}
        autoPlay
        loop
        resizeMode="cover"
        style={styles.animation}
      />
    </View>

    {/* 텍스트 및 버튼 고정 */}
    <Text style={styles.recordingText}>듣는 중입니다...</Text>
    <TouchableOpacity style={styles.stopButton} onPress={() => setIsRecording(false)}>
      <Text style={styles.stopButtonText}>완료</Text>
    </TouchableOpacity>
  </View>
</Modal>

    </>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute', // 항상 하단 고정
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
    zIndex: 1000, // 다른 요소들보다 위로 배치
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
  },
  navText: {
    fontSize: 20,
    fontFamily: 'Bold',
    marginBottom:20
  },
  centerButton: {
    width: 90,
    height: 90,
    backgroundColor: '#008DBF',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    marginBottom: 40, // ✅ 버튼이 네비게이션 바와 자연스럽게 정렬됨
  },

  /** 🔹 녹음 모달 스타일 */
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  
  /* ✅ Lottie 애니메이션 크기 고정 */
  animationContainer: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // 애니메이션 범위를 제한
  },
  
  animation: {
    width: 150,
    height: 150,
    transform: [{ scale: 1 }],
  },
  
  recordingText: {
    fontSize: 30,
    fontFamily: 'Bold',
    color: 'white',
    marginVertical: 20,
    textAlign: 'center',
  },
  
  stopButton: {
    backgroundColor: '#008DBF',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 10,
  },
  
  stopButtonText: {
    fontSize: 18,
    fontFamily: 'Medium',
    color: 'white',
    textAlign: 'center',
  },
  
});
