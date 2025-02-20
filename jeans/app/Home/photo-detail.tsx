import React, { useState,useRef } from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Modal, Animated, Dimensions,} from 'react-native';
import { BlurView } from 'expo-blur';
import { useRouter, useLocalSearchParams } from 'expo-router';
import LottieView from 'lottie-react-native';
import { Ionicons } from '@expo/vector-icons';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import ListeningAnimation from '@/components/ListeningAnimation';

const screenWidth = Dimensions.get('window').width;

interface EmojiItem {
  id: string;
  emoji: string;
  xPosition: number;
  animatedValue: Animated.Value;
}

export default function PhotoDetailScreen() {
  const router = useRouter();
  const { photoId } = useLocalSearchParams();
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [fallingEmojis, setFallingEmojis] = useState<EmojiItem[]>([]);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);

  const handleReactionPress = (reaction: string) => {
    if (selectedReaction === reaction) {
      // 같은 버튼을 다시 눌러 취소하는 경우, 이모티콘을 쏟지 않음
      setSelectedReaction(null);
    } else {
      // 새로운 반응을 누르면, 상태 변경 후 이모티콘을 떨어뜨림
      setSelectedReaction(reaction);
      dropEmojis(reaction);
    }
  };

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
  
  const dropEmojis = (emoji: string) => {
    const newEmojis: EmojiItem[] = Array.from({ length: 10 }, (_, index): EmojiItem => ({
      id: Math.random().toString() + index, // 인덱스를 추가하여 고유 ID 보장
      emoji,
      xPosition: Math.random() * (screenWidth - 50),
      animatedValue: new Animated.Value(-50),
    }));
  
    setFallingEmojis((prev) => [...prev, ...newEmojis]);
  
    newEmojis.forEach((item) => {
      Animated.timing(item.animatedValue, {
        toValue: 500, // 떨어지는 최종 위치
        duration: 1000 + Math.random() * 500, // 1초 ~ 1.5초 랜덤 지속시간
        useNativeDriver: true,
      }).start(() => {
        setFallingEmojis((prev) => prev.filter((e) => e.id !== item.id));
      });
    });
  };
  const [isCancelPopupVisible, setIsCancelPopupVisible] = useState<boolean>(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const showCancelPopup = () => {
    setIsCancelPopupVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300, // 0.3초 동안 등장
      useNativeDriver: true,
    }).start();

    // ✅ 2초 후에 팝업 사라지고 자동으로 메인 페이지 이동
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300, // 0.3초 동안 사라짐
        useNativeDriver: true,
      }).start(() => {
      
        router.push('/Home/main-page'); // ✅ 메인 페이지로 이동
      });
    }, 2000);
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

      {/* 📌 버튼 영역 */}
      <View style={styles.reactionButtons}>
        <TouchableOpacity style={[styles.reactionButton, selectedReaction === "👍" && styles.selectedReaction]} onPress={() => handleReactionPress("👍")}>
          <Text style={styles.reactionText}>👍 좋아요</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.reactionButton, selectedReaction === "😆" && styles.selectedReaction]} onPress={() => handleReactionPress("😆")}>
          <Text style={styles.reactionText}>😆 기뻐요</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.reactionButton, selectedReaction === "🔥" && styles.selectedReaction]} onPress={() => handleReactionPress("🔥")}>
          <Text style={styles.reactionText}>🔥 멋져요</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.reactionButton, selectedReaction === "💖" && styles.selectedReaction]} onPress={() => handleReactionPress("💖")}>
          <Text style={styles.reactionText}>💖 최고예요</Text>
        </TouchableOpacity>
      </View>

      {/* 📌 떨어지는 이모티콘 */}
      {fallingEmojis.map((item) => (
        <Animated.Text
          key={item.id}
          style={[
            styles.emoji,
            {
              transform: [{ translateY: item.animatedValue }],
              left: item.xPosition,
            },
          ]}
        >
          {item.emoji}
        </Animated.Text>
      ))}
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

      {/* 하단 (녹음, 태그) */}
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
              <Ionicons name="close-circle" size={40} color="black" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={showCancelPopup}>
              <Text style={styles.cancelButtonText}>공유 취소</Text>
            </TouchableOpacity>

          </View>
        </BlurView>
      </Modal>

      {/* 녹음 중 모달 */}
      <Modal visible={isRecording} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <ListeningAnimation></ListeningAnimation>
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
    width: 90,
    height: 90,
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
    fontSize: 18,
    color: '#555',
    fontFamily: 'Medium'
  },
  emoji: {
    position: 'absolute',
    fontSize: 40, // 이모티콘 크기
    top: 90, // 화면 위에서 시작
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
  selectedReaction: {
    backgroundColor: 'rgba(255, 183, 6, 0.6)', // 선택된 경우 파란색으로 변경
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Medium'
  },
  chatBubbleRight: {
    alignSelf: 'flex-end',
    backgroundColor: '#FFE2E5',
    padding: 10,
    borderRadius: 10,
    maxWidth: '70%',
    marginBottom: 10,
  },
  chatTextRight: {
    fontSize: 16,
    color: 'black',
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
    fontFamily: 'Medium',
    fontSize:18
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
    fontFamily: 'Medium',
    fontSize:18
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)', // 블러 효과
  },
  /** 완료 버튼 */
  stopButton: {
    backgroundColor: '#008DBF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 40,
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



    cancelButton: {
      backgroundColor: '#FF616D',
      paddingVertical: 12,
      paddingHorizontal: 25,
      borderRadius: 25,
      marginTop: 20,
      elevation: 5,
    },
    cancelButtonText: {
      fontSize: 18,
      fontFamily: 'Medium',
      color: 'white',
      textAlign: 'center',
    },
  
});



