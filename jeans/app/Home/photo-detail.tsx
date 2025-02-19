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
import { BlurView } from 'expo-blur';
import { useRouter, useLocalSearchParams } from 'expo-router';
import LottieView from 'lottie-react-native';
import { Ionicons } from '@expo/vector-icons';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';

export default function PhotoDetailScreen() {
  const router = useRouter();
  const { photoId } = useLocalSearchParams();
  const [isRecording, setIsRecording] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 임의 데이터
  const photoData = {
    title: '맛있는 칼국수',
    imageUrl: require('../../assets/images/photo2.png'),
    description: '사진 제목 : 맛있는 칼국수 \n일시 : 2025-02-14 \n장소 : 제주도',
    messages: [
      { id: 1, sender: '이순복', text: '너무 맛있어 보이네요!', profileImage: require('../../assets/images/ex.png') },
      { id: 2, sender: '나', text: '맞아요! 정말 맛집이에요.', profileImage: null },
    ],
  };

  // 녹음 시작
  const startRecording = () => {
    setIsRecording(true);
  };

  // 녹음 종료
  const stopRecording = () => {
    setIsRecording(false);
  };

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* 사진 & 설명 */}
      <View style={styles.photoInfoContainer}>
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <Image source={photoData.imageUrl} style={styles.photo} />
        </TouchableOpacity>
        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionText}>{photoData.description}</Text>
        </View>
      </View>

      {/* 버튼 영역 */}
      <View style={styles.reactionButtons}>
        <TouchableOpacity style={styles.reactionButton}>
          <Text style={styles.reactionText}>좋아요</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reactionButton}>
          <Text style={styles.reactionText}>기뻐요</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reactionButton}>
          <Text style={styles.reactionText}>멋져요</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reactionButton}>
          <Text style={styles.reactionText}>최고예요</Text>
        </TouchableOpacity>
      </View>

      {/* 대화 내역 */}
      <ScrollView style={styles.chatContainer}>
        {photoData.messages.map((message) =>
          message.sender === '나' ? (
            <View key={message.id} style={styles.chatBubbleRight}>
              <Text style={styles.chatTextRight}>{message.text}</Text>
            </View>
          ) : (
            <View key={message.id} style={styles.chatBubbleLeft}>
              <Image source={message.profileImage} style={styles.profileImage} />
              <View style={styles.chatTextContainer}>
                <Text style={styles.friendName}>{message.sender}</Text>
                <Text style={styles.chatText}>{message.text}</Text>
              </View>
            </View>
          )
        )}
      </ScrollView>

      {/* 하단 버튼 (녹음, 태그) */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.recordButton} onPress={startRecording}>
          <Ionicons name="chatbubble-ellipses" size={25} color="white" />
          <Text style={styles.recordButtonText}>메시지를 녹음하세요</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tagButton}>
          <Text style={styles.tagButtonText}>태그</Text>
        </TouchableOpacity>
      </View>

      <BottomNavBar />

      {/* 사진 확대 모달 */}
      <Modal visible={isModalVisible} transparent animationType="fade">
        <BlurView intensity={30} style={styles.modalBackground}>
          <TouchableOpacity style={styles.modalCloseArea} onPress={() => setIsModalVisible(false)} />
          <View style={styles.modalContent}>
            <Image source={photoData.imageUrl} style={styles.modalImage} />
            <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
              <Ionicons name="close-circle" size={40} color="white" />
            </TouchableOpacity>
          </View>
        </BlurView>
      </Modal>

      {/* 녹음 중 모달 */}
      <Modal visible={isRecording} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.animationContainer}>
            <LottieView
              source={require('../../assets/animations/Animation - 1739445445148.json')}
              autoPlay
              loop
              resizeMode="cover"
              style={styles.animation}
            />
          </View>
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
    paddingTop: 90,
  },
  photoInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 30,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  descriptionBox: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    padding: 15,
    borderRadius: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#555',
    fontFamily: 'Medium'
  },
  reactionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  reactionButton: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  reactionText: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Medium'
  },
  chatContainer: {
    flex: 1,
    marginBottom: 50,
  },
  chatBubbleLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  chatTextContainer: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 10,
    maxWidth: '70%',
  },
  chatText: {
    fontSize: 16,
    fontFamily: 'Medium'
  },
  friendName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Medium'
  },
  chatBubbleRight: {
    alignSelf: 'flex-end',
    backgroundColor: '#3DB2FF',
    padding: 10,
    borderRadius: 10,
    maxWidth: '70%',
    marginBottom: 10,
  },
  chatTextRight: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Medium'
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 120,
  },
  recordButton: {
    flex: 2,
    backgroundColor: '#008DBF',
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  recordButtonText: {
    color: 'white',
    marginLeft: 10,
    fontFamily: 'Medium'
  },
  tagButton: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 10,
  },
  tagButtonText: {
    color: '#333',
    fontFamily: 'Medium'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)', // 블러 효과
  },
  
  /** ✅ Lottie 애니메이션 크기 고정 */
  animationContainer: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // 애니메이션 넘침 방지
  },
  
  animation: {
    width: '100%',
    height: '100%',
    transform: [{ scale: 1 }],
  },
  
  /** ✅ 녹음 중 텍스트 */
  recordingText: {
    fontSize: 30,
    fontFamily: 'Bold',
    color: 'white',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  
  /** ✅ 완료 버튼 스타일 */
  stopButton: {
    backgroundColor: '#008DBF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 10,
    elevation: 5,
  },
  
  stopButtonText: {
    fontSize: 18,
    fontFamily: 'Medium',
    color: 'white',
    textAlign: 'center',
  },
  
  
    /** 사진 확대  */
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.9)', // ✅ 블러 효과와 함께 배경 어둡게 설정
    },
    modalCloseArea: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
    modalContent: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.2)', // ✅ 투명한 배경 추가
      padding: 20,
      borderRadius: 10,
    },
    modalImage: {
      width:250,
      height:250,
      aspectRatio: 1, // 정방형 유지
      borderRadius: 10,
    },
    closeButton: {
      position: 'absolute',
      top: -10,
      right: -10,
    },
  
});



