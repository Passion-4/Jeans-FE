import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import LottieView from 'lottie-react-native';
import { Ionicons } from '@expo/vector-icons';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import { useImageContext } from '../../app/Context/ImageContext'
import CustomButton from '@/components/FullButton';

export default function PhotoDetailScreen() {
  const router = useRouter();
  const { selectedImages } = useImageContext(); 
  const { photoId } = useLocalSearchParams(); // 📌 선택된 사진 ID 가져오기
  const [isRecording, setIsRecording] = useState(false); // 녹음 중 여부

  // ✅ 녹음 시작 (모달 띄우기)
  const startRecording = () => {
    setIsRecording(true);
  };

  // ✅ 녹음 종료 (모달 닫기)
  const stopRecording = () => {
    setIsRecording(false);
  };

  return (
    <View style={styles.container}>
      <TopNavBar />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>사진과 함께 첨부할 {'\n'}메시지를 녹음하세요.</Text>
      </View>

      {/* ✅ 스크롤 가능하도록 설정 */}
      <ScrollView contentContainerStyle={styles.imageContainer}>
        {selectedImages.length > 0 ? (
          selectedImages.map((uri: string, index: number) => (
            <Image key={index} source={{ uri }} style={styles.image} />
          ))
        ) : (
          <Text style={styles.emptySpaceText}>사진</Text>
        )}
      </ScrollView>

      {/* ✅ 버튼 컨테이너 (버튼이 항상 보이도록 설정) */}
      <View style={styles.buttonWrapper}>
        {/* 📌 녹음 버튼 */}
        <TouchableOpacity style={styles.recordButton} onPress={startRecording}>
          <Ionicons name="mic" size={30} color="white" />
          <Text style={styles.recordButtonText}>메시지를 녹음하세요</Text>
        </TouchableOpacity>

        {/* 📌 확인 버튼 */}
        <View style={styles.confirmButtonContainer}>
          <CustomButton title="확 인" onPress={() => router.push('/Share/Share_complete')} />
        </View>
      </View>

      <BottomNavBar />

      {/* 📌 녹음 중 UI */}
      <Modal visible={isRecording} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <LottieView
            source={require('../../assets/animations/Animation - 1739445445148.json')}
            autoPlay
            loop
            style={styles.animation}
          />
          <Text style={styles.recordingText}>녹음 중입니다...</Text>
          <TouchableOpacity style={styles.stopButton} onPress={stopRecording}>
            <Text style={styles.stopButtonText}>완료</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingTop: 100,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 15,
    marginTop: 50,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
    flexGrow: 1, // ✅ 스크롤이 가능하도록 설정
  },
  title: {
    fontSize: 30,
    fontFamily: 'Bold',
    textAlign: 'center',
    marginBottom: 0, 
    marginTop: 30,
  },
  image: {
    width: 300, 
    height: 200,
    borderRadius: 10,
    marginBottom: 30,
    marginTop:-40
  },
  emptySpaceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },

  /** 📌 버튼 컨테이너 */
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingBottom: 30, // ✅ 버튼이 하단 네비게이션과 겹치지 않도록 설정
  },

  /** 📌 녹음 버튼 */
  recordButton: {
    flexDirection: 'row',
    backgroundColor: '#3DB2FF',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%', 
    alignSelf: 'center', 
    marginBottom: 20, // ✅ 확인 버튼과 간격 추가
  },
  recordButtonText: {
    fontSize: 20,
    fontFamily: 'Medium',
    color: 'white',
    marginLeft: 10,
  },

  /** 📌 확인 버튼 컨테이너 */
  confirmButtonContainer: {
    width: '90%',
    alignSelf: 'center',
    marginBottom:100
  },

  /** 📌 추가된 스타일 */
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)', // 블러 효과
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
    marginTop: -10,
    marginBottom: 20,
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
