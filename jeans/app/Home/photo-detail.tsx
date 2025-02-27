import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Modal, Animated, Dimensions, Alert, ActivityIndicator } from 'react-native';
import { BlurView } from 'expo-blur';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';

const screenWidth = Dimensions.get('window').width;

interface EmojiItem {
  id: string;
  emoji: string;
  xPosition: number;
  animatedValue: Animated.Value;
}

interface VoiceMessage {
  voiceId: number;
  profileUrl: string;
  name: string;
  transcript: string;
  voiceUrl: string;
  isUser: boolean;
}

interface PhotoDetail {
  photoId: number;
  title: string;
  photoUrl: string;
  date: string;
  emojiType: number | null;
  voiceList: VoiceMessage[];
}

const emojiMap: Record<number, string> = {
  1: "👍",
  2: "😆",
  3: "🔥",
  4: "💖",
};

export default function PhotoDetailScreen() {
  const router = useRouter();
  const { photoId } = useLocalSearchParams();
  const [photoDetail, setPhotoDetail] = useState<PhotoDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [fallingEmojis, setFallingEmojis] = useState<EmojiItem[]>([]);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isCancelPopupVisible, setIsCancelPopupVisible] = useState<boolean>(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isTagModalVisible, setIsTagModalVisible] = useState(false);
  const [emoticonList, setEmoticonList] = useState<{ emojiType: number; name: string; profileUrl: string }[]>([]);
  const [selectedTranscript, setSelectedTranscript] = useState<string | null>(null);

  const fetchEmoticonList = async () => {
    try {
      let token = await AsyncStorage.getItem("accessToken");
      if (!token) {
        Alert.alert("오류", "로그인이 필요합니다.");
        return;
      }

      const response = await fetch(`https://api.passion4-jeans.store/team-photos/${photoId}/emoticons`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`이모티콘 목록 조회 실패 (${response.status})`);
      }

      const data = await response.json();
      console.log("✅ 이모티콘 목록:", data);
      setEmoticonList(data);
    } catch (error) {
      console.error("❌ 이모티콘 목록 불러오기 실패:", error);
      Alert.alert("오류", error instanceof Error ? error.message : "알 수 없는 오류 발생");
    }
  };

    const navigateToTagInfo = (tag: String) => {
      Alert.alert("${tag}");
      // 여기에서 실제 네비게이션 코드 추가 가능 (예: React Navigation 사용 시)
      // navigation.navigate('TagInfoScreen', { tag });
    };

    // ✅ 사진 상세 정보를 가져온 후, 이모티콘 애니메이션 실행
    useEffect(() => {
      const fetchPhotoDetail = async () => {
        try {
          let token = await AsyncStorage.getItem("accessToken");
          if (!token) {
            Alert.alert("오류", "로그인이 필요합니다.");
            return;
          }

          const response = await fetch(`https://api.passion4-jeans.store/photos/${photoId}/detail`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error(`사진 상세 정보 불러오기 실패 (${response.status})`);
          }

          const data = await response.json();
          console.log("✅ 사진 상세 정보:", data);

          setPhotoDetail(data);

          if (photoId) fetchEmoticonList();

          // ✅ 이모티콘이 존재하면 입장 시 애니메이션 실행
          if (data.emojiTypeList && data.emojiTypeList.length > 0) {
            console.log("🎉 입장 시 이모티콘 애니메이션 실행!", data.emojiTypeList);
            data.emojiTypeList.forEach((emojiType: number) => {
              if (emojiMap[emojiType]) {
                dropEmojis(emojiMap[emojiType]);
              }
            });
          }

        } catch (error) {
          console.error("❌ 사진 상세 조회 실패:", error);
          Alert.alert("오류", error instanceof Error ? error.message : "알 수 없는 오류 발생");
        } finally {
          setLoading(false);
        }
      };

      if (photoId) fetchPhotoDetail();
    }, [photoId]);


    // 녹음 시작
    const startRecording = () => {
      setIsRecording(true);
    };
  
    // 녹음 종료
    const stopRecording = () => {
      setIsRecording(false);
    };

    const sendEmoticon = async (emojiType: number) => {
      try {
        let token = await AsyncStorage.getItem("accessToken");
        if (!token) {
          Alert.alert("오류", "로그인이 필요합니다.");
          return;
        }
    
        const response = await fetch(`https://api.passion4-jeans.store/photos/${photoId}/emoticon/${emojiType}`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
    
        if (!response.ok) {
          throw new Error(`이모티콘 전송 실패 (${response.status})`);
        }
    
        Alert.alert("성공", "이모티콘이 전송되었습니다.");
      } catch (error) {
        console.error("❌ 이모티콘 전송 실패:", error);
        Alert.alert("오류", error instanceof Error ? error.message : "알 수 없는 오류 발생");
      }
    };

  // ✅ 이모티콘 애니메이션 처리
  const dropEmojis = (emoji: string) => {
    const newEmojis: EmojiItem[] = Array.from({ length: 10 }, (_, index): EmojiItem => ({
      id: Math.random().toString() + index,
      emoji,
      xPosition: Math.random() * (screenWidth - 50),
      animatedValue: new Animated.Value(-50),
    }));

    setFallingEmojis((prev) => [...prev, ...newEmojis]);

    newEmojis.forEach((item) => {
      Animated.timing(item.animatedValue, {
        toValue: 500,
        duration: 1000 + Math.random() * 500,
        useNativeDriver: true,
      }).start(() => {
        setFallingEmojis((prev) => prev.filter((e) => e.id !== item.id));
      });
    });
  };

  const handleReactionPress = (reaction: string, emojiType: number) => {
    if (selectedReaction === reaction) {
      setSelectedReaction(null);
    } else {
      setSelectedReaction(reaction);
      dropEmojis(reaction);
      sendEmoticon(emojiType); // ✅ API 호출 추가
    }
  };

  const deleteSharedPhoto = async () => {
    try {
      let token = await AsyncStorage.getItem("accessToken");
      console.log("🔑 Token 확인:", token); // 🔍 콘솔에서 토큰 확인
  
      if (!token) {
        Alert.alert("오류", "로그인이 필요합니다.");
        return;
      }
  
      const response = await fetch(`https://api.passion4-jeans.store/photos/${photoId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text(); // 서버에서 제공하는 에러 메시지 확인
        console.error(`❌ 사진 삭제 실패 (${response.status}):`, errorText);
        throw new Error(`사진 삭제 실패 (${response.status}): ${errorText}`);
      }
  
      Alert.alert("삭제 완료", "사진이 삭제되었습니다.");
      router.push("/Home/main-page");
  
    } catch (error) {
      console.error("❌ 사진 삭제 중 오류 발생:", error);
      Alert.alert("오류", error instanceof Error ? error.message : "알 수 없는 오류 발생");
    }
  };
  
  return (
    <View style={styles.container}>
      <TopNavBar />

      {loading ? (
        <ActivityIndicator size="large" color="#008DBF" />
      ) : (
        <View style={styles.photoInfoContainer}>
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <Image source={{ uri: photoDetail?.photoUrl }} style={styles.photo} />
          </TouchableOpacity>
          <View style={styles.descriptionBox}>
            <Text style={styles.descriptionText}>{photoDetail?.title}</Text>
            <Text style={styles.descriptionText}>일시: {photoDetail?.date}</Text>
          </View>
        </View>
      )}

      {/* 📌 버튼 영역 */}
      <View style={styles.reactionButtons}>
      <TouchableOpacity 
        style={[styles.reactionButton, selectedReaction === "👍" && styles.selectedReaction]} 
        onPress={() => handleReactionPress("👍", 1)}
      >
        <Text style={styles.reactionText}>👍 좋아요</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.reactionButton, selectedReaction === "😆" && styles.selectedReaction]} 
        onPress={() => handleReactionPress("😆", 2)}
      >
        <Text style={styles.reactionText}>😆 기뻐요</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.reactionButton, selectedReaction === "🔥" && styles.selectedReaction]} 
        onPress={() => handleReactionPress("🔥", 3)}
      >
        <Text style={styles.reactionText}>🔥 멋져요</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.reactionButton, selectedReaction === "💖" && styles.selectedReaction]} 
        onPress={() => handleReactionPress("💖", 4)}
      >
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

      {/* 대화 내역  나중에는 setSelectedTranscript 함수가 녹음 틀어지면 보이고 끝나면 안 보이게*/}
      <ScrollView style={styles.chatContainer}>
        {photoDetail?.voiceList.map((voice) =>
          voice.isUser ? (
            
            // ✅ 내가 보낸 메시지 (녹음 파일만 표시, 클릭 시 transcript 표시)
            <View key={voice.voiceId} style={styles.chatBubbleRight}>
               <Ionicons name="mic-circle" size={25} color="blue" style={{ marginRight: 5 }} />
  <View style={styles.bubble}>
    <Text style={styles.bubbleText}>{voice.transcript}</Text>
  </View>
</View>

          ) : (
            // ✅ 상대방이 보낸 메시지 (이름 + 프로필 사진 + 음성 버튼)
            <View key={voice.voiceId} style={styles.chatBubbleLeftContainer}>
              {/* 이름 표시 */}
              <Text style={styles.friendName}>{voice.name}</Text>

              <View style={styles.chatBubbleLeft}>
                <Image source={{ uri: voice.profileUrl }} style={styles.profileImage} />
                <View style={styles.chatTextContainer}>
                  <TouchableOpacity onPress={() => setSelectedTranscript(voice.transcript)}>
                    <Ionicons name="mic-circle" size={30} color="blue" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )
        )}
      </ScrollView>


        {/* ✅ 클릭된 transcript 표시 영역 */}
        {selectedTranscript && (
          <View style={styles.transcriptContainer}>
            <Text style={styles.transcriptText}>{selectedTranscript}</Text>
          </View>
        )}

      {/* 하단 (녹음, 태그) */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.recordButton} onPress={startRecording}>
          <Ionicons name="chatbubble-ellipses" size={25} color="white" />
          <Text style={styles.recordButtonText}>메시지를 녹음하세요</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tagButton} onPress={() => setIsTagModalVisible(true)}>
          <Text style={styles.tagButtonText}>태그</Text>
        </TouchableOpacity>
      </View>

      {/* 태그 안내 모달 */}
      <Modal
        transparent
        visible={isTagModalVisible}
        animationType="fade"
        onRequestClose={() => setIsTagModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>태그 안내</Text>
            <Text style={styles.modalDescription}>
              사진과 관련된 태그를 자동으로 생성하고 태그를 클릭하면 관련된 정보를 볼 수 있습니다.
            </Text>

            {/* 태그 리스트 */}
            <View style={styles.tagContainer}>
              {["#행복", "#우정 사진", "#MZ 포즈"].map((tag, index) => (
                <TouchableOpacity key={index} style={styles.tagButton} onPress={() => navigateToTagInfo(tag)}>
                  <Text style={styles.tagText}>{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setIsTagModalVisible(false)}>
              <Text style={styles.modalCloseText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


      <BottomNavBar />

      {/* 사진 확대 모달 */}
      <Modal visible={isModalVisible} transparent animationType="fade">
        <BlurView intensity={30} style={styles.modalBackground}>
          <TouchableOpacity style={styles.modalCloseArea} onPress={() => setIsModalVisible(false)} />

          {/* 공유 취소 버튼 */}
          <TouchableOpacity style={styles.cancelButton} onPress={deleteSharedPhoto}>
            <Text style={styles.cancelButtonText}>공유 취소</Text>
          </TouchableOpacity>
          
          {/* 확대된 사진 */}
          <Image source={{ uri: photoDetail?.photoUrl }} style={styles.modalImage} />
          
          {/* ✅ 확대된 사진 아래에 이모티콘 목록 추가 */}
          {emoticonList.length > 0 && (
            <View style={styles.modalEmoticonContainer}>
              {emoticonList.map((item, index) => (
                <View key={index} style={styles.emoticonItem}>
                  <Image source={{ uri: item.profileUrl }} style={styles.profileImage} />
                  <Text style={styles.emoticonText}>
                    {item.name}님이 {emojiMap[item.emojiType]}를 보냈어요!
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* 닫기 버튼 */}
          <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
            <Ionicons name="close-circle" size={40} color="black" />
          </TouchableOpacity>
        </BlurView>
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
    marginTop: 40,
  },
  chatBubbleLeftContainer: {
    marginBottom: 5, // ✅ 상대방 메시지 간격 조정
  },
  photo: {
    width: 120,
    height: 120,
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
    fontFamily: 'Bold'
  },
  transcriptContainer: {
    backgroundColor: "#F8F8F8",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  transcriptText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "Medium",
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
    marginBottom: 5,
  },
  friendName: {
    fontSize: 14, // ✅ 이름 크기 줄이기
    fontWeight: "bold",
    color: "#555",
    marginLeft: 50, // ✅ 프로필 사진과 정렬 맞추기
    marginBottom: 2, // ✅ 이름과 채팅 버블 간격 조정
  },
  chatBubbleLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 5, // ✅ 높이 줄이기
  },
  profileImage: {
    width: 38,
    height: 38,
    borderRadius: 20,
    marginRight: 10,
  },
  chatTextContainer: {
    backgroundColor: '#F0F0F0',
    padding: 8,
    borderRadius: 10,
    maxWidth: '70%',
  },
  chatText: {
    fontSize: 16,
    fontFamily: 'Medium'
  },
  chatBubbleRight: {
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    maxWidth: '70%',
    marginBottom: 5,
    paddingVertical: 5, // ✅ 높이 줄이기
  },
  chatTextRight: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Medium'
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 110,
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
  emoticonContainer: {
    backgroundColor: "#F8F8F8",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  emoticonItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  emoticonText: {
    fontSize: 16,
    color: "#333",
  },
  modalEmoticonContainer: {
    position: "absolute",
    bottom: 60, // ✅ 하단에 고정 (적절한 값 조정 가능)
    left: 20,
    right: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)", // ✅ 반투명 배경 추가
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  
  
    /** 사진 확대  */
    modalBackground: {
      flex: 1,
      justifyContent: "flex-start",  // ✅ 사진을 위쪽으로 배치
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.9)', // ✅ 블러 효과와 함께 배경 어둡게 설정
      paddingTop: 80, // ✅ 사진 위치 조정
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
      position: "absolute", // ✅ 사진을 독립적으로 배치
      top: "30%", // ✅ 화면의 20% 위치에 배치
    },
    closeButton: {
      position: 'absolute',
      top: 20,
      right: 20,
    
    },

    tagContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 20,
      marginBottom: 20,
      backgroundColor:'#FFE2E5'
    },
    tagText: {
      color: 'black',
      fontFamily: 'Medium',
    },

    cancelButton: {
      backgroundColor: '#FF616D',
      paddingVertical: 12,
      paddingHorizontal: 25,
      borderRadius: 25,
      marginTop: 20,
      elevation: 5,
      marginBottom: 30
    },
    cancelButtonText: {
      fontSize: 18,
      fontFamily: 'Medium',
      color: 'white',
      textAlign: 'center',
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

    bubble: {
      backgroundColor: "#E1F5FE",  // ✅ 연한 파란색 말풍선 (카카오톡 느낌)
      padding: 12,
      borderRadius: 15,
      maxWidth: "75%",  // ✅ 말풍선이 너무 길어지지 않게
    },
    bubbleText: {
      fontSize: 16,
      color: "#333",
    },
  });