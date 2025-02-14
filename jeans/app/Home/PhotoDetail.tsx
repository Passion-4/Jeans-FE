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

export default function PhotoDetailScreen() {
  const router = useRouter();
  const { photoId } = useLocalSearchParams(); // 📌 선택된 사진 ID 가져오기
  const [isRecording, setIsRecording] = useState(false); // 녹음 중 여부

  // 📌 더미 데이터
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
        <Image source={photoData.imageUrl} style={styles.photo} />
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
        <Ionicons name="mic" size={30} color="white" />
        <Text style={styles.recordButtonText}>메시지를 녹음하세요</Text>
      </TouchableOpacity>

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
    backgroundColor: '#008DBF',
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
    marginTop:-10,
    marginBottom:20
  },
  stopButton: {
    backgroundColor: '#008DBF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop:20
  },
  stopButtonText: {
    fontSize: 18,
    fontFamily: 'Medium',
    color: 'white',
  },
});
