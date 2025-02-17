import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import HalfButton from '../../components/HalfButton';
import { useImageContext } from '../Context/ImageContext';

export default function BestShotScreen() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(true);
  const [isHelpVisible, setIsHelpVisible] = useState(false);
  const { selectedImages } = useImageContext(); 
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsProcessing(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isProcessing) {
    return (
      <View style={styles.processingContainer}>
        <Text style={styles.processingText}>기본 보정 중입니다...</Text>
        <View style={styles.fixedAnimationContainer}>
          <LottieView
            source={require('../../assets/animations/Animation - 1739445445148.json')}
            autoPlay
            loop
            style={styles.animation}
          />
        </View>
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

        {/* 일단 임의로 첫 번째 사진 표시 */}
        <View style={styles.imageContainer}>
              {selectedImages && selectedImages.length > 0 ? (
                <Image source={{ uri: selectedImages[0] }} style={styles.image} />
              ) : (
                <Text style={styles.emptySpaceText}>사진 없음</Text>
              )}
            </View>

      <View style={styles.buttonContainer}>
        <HalfButton title="아니오" color="#3DB2FF" onPress={() => router.push('/MakeUp/makeup-finish')} />
        <HalfButton title="예" onPress={() => router.push('/MakeUp/advanced-option')} />
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
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 30,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 40,
  },
  /** 모달 스타일 */
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
  emptySpaceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },

  processingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  processingText: {
    fontSize: 30,
    fontFamily: 'Bold',
    marginBottom: 20,
  },
  fixedAnimationContainer: {
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: '100%',
    height: '100%',
  },
});
