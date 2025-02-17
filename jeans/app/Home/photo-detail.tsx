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
  const { photoId } = useLocalSearchParams(); // 📌 선택된 사진 ID 가져오기
  const [isRecording, setIsRecording] = useState(false); // 녹음 중 여부
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 임의 데이터
  const photoData = {
    title: '맛있는 칼국수',
    imageUrl: require('../../assets/images/photo2.png'),
    description: '사진 제목 : 맛있는 칼국수 \n일시 : 2025-02-14 \n장소 : 제주도',
    messages: [
      { id: 1, sender: '이순복', text: '너무 맛있어 보이네요!', profileImage: require('../../assets/images/friend1.jpg') },
      { id: 2, sender: '나', text: '맞아요! 정말 맛집이에요.', profileImage: null },
    ],
  };

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

      {/* 📌 사진 & 설명 */}
      <View style={styles.photoContainer}>
        <TouchableOpacity onPress={() => setIsModalVisible(true)}> 
          <Image source={photoData.imageUrl} style={styles.photo} />
        </TouchableOpacity>
        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionText}>{photoData.description}</Text>
        </View>
      </View>

      {/* 📌 대화 내역 */}
      <ScrollView style={styles.chatContainer}>
        {photoData.messages.map((message) => (
          message.sender === '나' ? (
            // 📌 내가 보낸 메시지 (오른쪽 정렬)
            <View key={message.id} style={styles.chatBubbleRight}>
              <Text style={styles.chatTextRight}>{message.text}</Text>
            </View>
          ) : (
            // 📌 상대방 메시지 (왼쪽 정렬, 프사 포함)
            <View key={message.id} style={styles.chatBubbleLeft}>
              <Image source={message.profileImage} style={styles.profileImage} />
              <View style={styles.chatTextContainer}>
                <Text style={styles.friendName}>{message.sender}</Text>
                <Text style={styles.chatText}>{message.text}</Text>
              </View>
            </View>
          )
        ))}
      </ScrollView>

      {/* 📌 녹음 버튼 */}
      <TouchableOpacity style={styles.recordButton} onPress={startRecording}>
        <Ionicons name="chatbubble-ellipses" size={30} color="white" />
        <Text style={styles.recordButtonText}>메시지를 녹음하세요</Text>
      </TouchableOpacity>

      <BottomNavBar />

      {/* ✅ 사진 확대 모달 */}
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

      {/* 📌 녹음 중 UI */}
<Modal visible={isRecording} transparent animationType="fade">
  <View style={styles.modalContainer}>
    {/* 고정된 크기 컨테이너에 LottieView */}
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
    paddingTop: 100,
  },
  photoTitle: {
    fontSize: 24,
    fontFamily: 'Bold',
    marginBottom: 10,
    marginTop:100,
    textAlign:'left',
    marginLeft:200
  },
  photoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop:30
  },
  photo: {
    width: 103,
    height: 103,
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
    fontSize: 20,
    fontFamily: 'Medium',
    color: '#555',
  },

  /** 📌 채팅 스타일 */
  chatContainer: {
    flex: 1,
    marginBottom: 80, // 녹음 버튼과의 간격
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
  friendName: {
    fontSize: 15,
    fontFamily: 'Medium',
    color: '#555',
    marginBottom: 3,
  },
  chatText: {
    fontSize: 20,
    fontFamily: 'Medium',
  },
  chatBubbleRight: {
    alignSelf: 'flex-end',
    backgroundColor: '#3DB2FF',
    padding: 10,
    borderRadius: 10,
    maxWidth: '100%',
    marginBottom: 10,
  },
  chatTextRight: {
    fontSize: 20,
    fontFamily: 'Medium',
    color: 'white',
  },

  /** 📌 녹음 버튼 */
  recordButton: {
    position: 'absolute',
    bottom: 100,
    left: '10%',
    right: '10%',
    flexDirection: 'row',
    backgroundColor: '#008DBF',
    paddingVertical: 8,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:20
  },
  recordButtonText: {
    fontSize: 20,
    fontFamily: 'Medium',
    color: 'white',
    marginLeft: 10,
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
