import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import HalfButton from '../../components/HalfButton'; // ✅ 재사용 버튼 적용

export default function BestShotScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const selectedIndex = params.selectedIndex ? Number(params.selectedIndex) : 0; // ✅ 인덱스 값 변환

  // ✅ 선택한 인덱스에 대응하는 로컬 이미지 목록
  const mappedImages = [
    require('@/assets/images/1.png'), // 첫 번째 선택 → result1.png 표시
    require('@/assets/images/2.png'), // 두 번째 선택 → result2.png 표시
    require('@/assets/images/3.jpg'), // 세 번째 선택 → result3.png 표시
    require('@/assets/images/4.jpg'), // 네 번째 선택 → result4.png 표시
  ];

  // ✅ 기본 보정 안내 모달 상태 추가
  const [isHelpVisible, setIsHelpVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TopNavBar />

      <Text style={styles.title}>
        베스트샷입니다.{'\n'}기본 보정을 하시겠어요?
      </Text>

      {/* ❓ 기본 보정 안내 버튼 */}
      <TouchableOpacity style={styles.helpButton} onPress={() => setIsHelpVisible(true)}>
        <View style={styles.helpCircle}>
          <Text style={styles.helpIcon}>?</Text>
        </View>
        <Text style={styles.helpText}>기본 보정이 뭔가요?</Text>
      </TouchableOpacity>

      {/* ✅ 선택한 인덱스에 따라 로컬 이미지 표시 */}
      <View style={styles.imageContainer}>
        <Image source={mappedImages[selectedIndex]} style={styles.image} />
      </View>

      <View style={styles.buttonContainer}>
        <HalfButton title="아니오" color="#FF616D" onPress={() => router.push('/Makeup/makeup-finish')} />
        <HalfButton title="예" onPress={() => router.push('/Makeup/advanced-makeup')} />
      </View>

      <BottomNavBar />

      {/* ✅ 기본 보정 안내 모달 */}
      <Modal
        transparent
        visible={isHelpVisible}
        animationType="fade"
        onRequestClose={() => setIsHelpVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>기본 보정 안내</Text>
            <Text style={styles.modalDescription}>
              기본 보정은 사진의 명암, 색감, 선명도를 자동으로 조정하여 {'\n'}
              더 좋은 느낌을 주는 기능입니다.
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
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  title: {
    fontSize: 25,
    fontFamily: 'Bold',
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 120,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 15,
    marginBottom: 10,
  },
  emptySpaceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 80,
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
});
