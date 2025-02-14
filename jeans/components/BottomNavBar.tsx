import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { useRouter } from 'expo-router';

export default function BottomNavBar() {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false); // 🔹 녹음 모달 상태 관리

  return (
    <View>
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
      <Modal visible={isRecording} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <LottieView
            source={require('../assets/animations/Animation - 1739445445148.json')}
            autoPlay
            loop
            style={styles.animation}
          />
          <Text style={styles.recordingText}>듣는 중입니다...</Text>
          <TouchableOpacity style={styles.stopButton} onPress={() => setIsRecording(false)}>
            <Text style={styles.stopButtonText}>완료</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
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
    zIndex: 1000,
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 15,
  },
  navText: {
    fontSize: 20,
    fontFamily: 'Bold',
  },
  centerButton: {
    width: 90,
    height: 90,
    backgroundColor: '#008DBF',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    marginBottom: 40,
  },

  /** 🔹 녹음 모달 스타일 */
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  animation: {
    width: 150,
    height: 150,
  },
  recordingText: {
    fontSize: 30,
    fontFamily: 'Bold',
    color: 'white',
    marginVertical: 20,
  },
  stopButton: {
    backgroundColor: '#008DBF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  stopButtonText: {
    fontSize: 18,
    fontFamily: 'Medium',
    color: 'white',
  },
});
