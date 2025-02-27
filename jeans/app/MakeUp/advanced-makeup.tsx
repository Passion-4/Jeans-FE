import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import HalfButton from '../../components/HalfButton';
import MakeUpAnimation from "@/components/MakeUpAnimation";

export default function BestShotScreen() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(true);
  const [isHelpVisible, setIsHelpVisible] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false); // ✅ 원본/보정 결과 토글 상태

  // ✅ 로컬 이미지 (원본 & 보정 결과)
  const originalImage = require('@/assets/images/2.png'); 
  const editedImage = require('@/assets/images/basic.jpg');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsProcessing(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isProcessing) {
    return (
      <View style={styles.processingContainer}>
        <MakeUpAnimation />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TopNavBar />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>기본 보정이 완료되었습니다.{'\n'}추가 보정을 해보시겠어요?</Text>
        {/* 물음표 아이콘 및 안내 버튼 */}
        <TouchableOpacity style={styles.helpButton} onPress={() => setIsHelpVisible(true)}>
          <View style={styles.helpCircle}>
            <Text style={styles.helpIcon}>?</Text>
          </View>
          <Text style={styles.helpText}>추가 보정이 뭔가요?</Text>
        </TouchableOpacity>
      </View>

      {/* ✅ 원본 또는 보정 결과 이미지 표시 */}
      <View style={styles.imageContainer}>
        <Image 
          source={showOriginal ? originalImage : editedImage} 
          style={styles.image} 
        />
        
        {/* ✅ 사진 위에 배치된 원본/보정 토글 버튼 */}
        <TouchableOpacity 
          style={styles.toggleButton} 
          onPress={() => setShowOriginal(!showOriginal)}
        >
          <Text style={styles.toggleButtonText}>
            {showOriginal ? "보정된 사진 보기" : "원본 보기"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <HalfButton title="아니오" color="#FF616D" onPress={() => router.push('/Makeup/makeup-finish')} />
        <HalfButton title="예" onPress={() => router.push('/Makeup/advanced-option')} />
      </View>

      <BottomNavBar />

      {/* 추가 보정 안내 모달 */}
      <Modal
        transparent
        visible={isHelpVisible}
        animationType="fade"
        onRequestClose={() => setIsHelpVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>추가 보정 안내</Text>
            <Text style={styles.modalDescription}>
              추가 보정은 사진 내의 내 모습에 {'\n'}동안, 새치, 몸매 보정을 적용하는{'\n'} 기능입니다.
            </Text>
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setIsHelpVisible(false)}>
              <Text style={styles.modalCloseText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    fontFamily: 'Bold',
    textAlign: 'center',
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  helpCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#008DBF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  helpIcon: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  helpText: {
    fontSize: 18,
    fontFamily: 'Medium',
    color: '#008DBF',
    textDecorationLine: 'underline',
  },
  imageContainer: {
    position: 'relative', // ✅ 버튼을 절대 위치 시키기 위한 설정
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 30,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
  /** ✅ 사진 위에 배치된 원본/보정 전환 버튼 */
  toggleButton: {
    position: 'absolute',
    bottom: 10, // ✅ 사진 아래쪽에 배치
    right: 10, // ✅ 사진 오른쪽 아래에 배치
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // ✅ 반투명 배경 추가
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  toggleButtonText: {
    fontSize: 16,
    fontFamily:'Medium',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 40,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: 280,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: 'Bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    fontFamily: 'Medium',
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalCloseButton: {
    backgroundColor: '#008DBF',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  modalCloseText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: 'Medium',
  },
  processingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
