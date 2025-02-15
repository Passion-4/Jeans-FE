import React,{useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import HalfButton from '../../components/HalfButton'; // ✅ 재사용 버튼 적용
import { useImageContext } from '../Context/ImageContext';

export default function BestShotScreen() {
  const router = useRouter();
  const { selectedImages } = useImageContext(); 
  const [isHelpVisible, setIsHelpVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TopNavBar/>

      {/* 텍스트 설명 */}
      <Text style={styles.title}>
        베스트샷입니다.{'\n'}기본 보정을 하시겠어요?
      </Text>
      {/* 물음표 아이콘 및 안내 버튼 */}
      <TouchableOpacity style={styles.helpButton} onPress={() => setIsHelpVisible(true)}>
          <View style={styles.helpCircle}>
            <Text style={styles.helpIcon}>?</Text>
          </View>
          <Text style={styles.helpText}>기본 보정이 뭔가요?</Text>
        </TouchableOpacity>

      {/* 일단 임의로 첫 번째 사진 표시 */}
      <View style={styles.imageContainer}>
        {selectedImages && selectedImages.length > 0 ? (
          <Image source={{ uri: selectedImages[0] }} style={styles.image} />
        ) : (
          <Text style={styles.emptySpaceText}>사진 없음</Text>
        )}
      </View>

      {/* 버튼 컨테이너 */}
      <View style={styles.buttonContainer}>
        <HalfButton 
          title="아니오" 
          color="#3DB2FF"
          onPress={() => router.push('/Makeup/MakeUp_Finish')} 
        />
        <HalfButton 
          title="예" 
          onPress={() => router.push('/Makeup/Edit0')} 
        />
      </View>

      <BottomNavBar/>

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
            기본 보정은 사진에 대해 {'\n'}명암, 색감, 선명도를 조정하여{'\n'}
            원하는 느낌을 줄 수 있는 기능입니다.
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
    paddingTop: 30,
    paddingBottom: 20,

  },
  title: {
    fontSize: 30,
    fontFamily: 'Bold',
    textAlign: 'center',
    marginBottom: 15,
    marginTop:150
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
    marginBottom:30
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
    marginLeft:80
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
