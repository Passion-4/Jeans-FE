import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, Animated, Easing  } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import { Ionicons } from "@expo/vector-icons";
import { useImageContext } from '../../app/Context/ImageContext';
import { Image as RNImage } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
import CustomButton from '@/components/FullButton';

export default function PhotoDetailScreen() {
  const router = useRouter();
  const { selectedImages } = useImageContext();
  const { sharedImageUri, receiverList, teamId } = useLocalSearchParams();
  const [isUploading, setIsUploading] = useState(false);
  const pulseAnimation = useRef(new Animated.Value(1)).current;
  const recordingRef = useRef<Audio.Recording | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [message, setMessage] = useState(""); // ✅ 변환된 텍스트 저장

  // ✅ WebSocket 연결
  useEffect(() => {
    connectWebSocket();
    return () => {
      disconnectWebSocket();
    };
  }, []);

  const connectWebSocket = () => {
    wsRef.current = new WebSocket("wss://api.passion4-jeans-ai.store/api/ws-text");

    wsRef.current.onopen = () => console.log("✅ WebSocket 연결 완료");
    wsRef.current.onmessage = (event) => setMessage(event.data);
    wsRef.current.onerror = (error) => console.error("❌ WebSocket 오류:", error);
    wsRef.current.onclose = () => console.log("🔌 WebSocket 연결 종료됨");
  };

  const disconnectWebSocket = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  };

  const toggleRecording = async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  };

    const startPulseAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnimation, {
            toValue: 1.1,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnimation, {
            toValue: 1,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

  const startRecording = async () => {
    try {
      console.log("🔹 마이크 권한 요청 중...");
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        alert("마이크 권한이 필요합니다.");
        return;
      }

      console.log("🎙️ 녹음 시작");
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await recording.startAsync();
      recordingRef.current = recording;

      setIsRecording(true);
      startPulseAnimation();
    } catch (err) {
      console.error("녹음 시작 실패:", err);
    }
  };

  // ✅ 녹음 중지 후 WebSocket으로 전송
  const stopRecording = async () => {
    if (!recordingRef.current) return;

    console.log("🛑 녹음 중지");
    setIsRecording(false);
    await recordingRef.current.stopAndUnloadAsync();
    const uri = recordingRef.current.getURI();
    recordingRef.current = null;

    if (uri) {
      console.log("📤 WebSocket으로 오디오 전송 중...", uri);
      await sendAudioToWebSocket(uri);
    }
  };

  const sendAudioToWebSocket = async (audioUri: string) => {
    try {
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        console.error("❌ WebSocket이 열려있지 않음.");
        return;
      }

      const fileData = await FileSystem.readAsStringAsync(audioUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      if (!fileData) {
        console.error("❌ 오디오 파일을 읽을 수 없음.");
        return;
      }

      const binaryData = Uint8Array.from(atob(fileData), (c) => c.charCodeAt(0));
      wsRef.current.send(binaryData);
      console.log("🚀 WebSocket으로 오디오 데이터 전송 완료!");
    } catch (error) {
      console.error("❌ WebSocket 오디오 전송 오류:", error);
    }
  };

  // ✅ 로컬 파일 변환 (보정된 이미지)
  const getLocalFileUri = async (imageUri: string) => {
    if (imageUri.startsWith("http")) {
      const fileUri = `${FileSystem.cacheDirectory}temp_image.jpg`;
      const { uri } = await FileSystem.downloadAsync(imageUri, fileUri);
      return uri;
    }
    return imageUri;
  };

  // ✅ 보정된 이미지 URI 변환
  const resolvedSharedImageUri = typeof sharedImageUri === "string"
    ? `file://${RNImage.resolveAssetSource({ uri: sharedImageUri }).uri}`
    : null;

  // ✅ 보정된 이미지가 있으면 그것만 사용, 없으면 갤러리에서 선택한 이미지 사용
  const allImages = resolvedSharedImageUri
    ? [resolvedSharedImageUri]
    : selectedImages.length > 0
    ? selectedImages
    : [];

  // ✅ JSON 데이터 파싱
  const parsedReceiverList = typeof receiverList === "string" ? JSON.parse(receiverList) : receiverList || [];
  const parsedTeamList = typeof teamId === "string" ? JSON.parse(teamId) : teamId ? [teamId] : [];


  // ✅ FormData 생성 함수 (보정된 이미지 & 갤러리 선택 이미지 포함)
  const createFormData = async () => {
    const formData = new FormData();
  
    for (const imageUri of allImages) {
      if (typeof imageUri === "string") {
        const localUri = await getLocalFileUri(imageUri); // ✅ 로컬 파일 변환

        const fileName = localUri.split("/").pop() || "photo.jpg";
        const fileType = "image/jpeg";

        formData.append("image", {
          uri: localUri,
          name: fileName,
          type: fileType,
        } as any);
      }
    }

    return formData;
  };

  // ✅ 사진 공유 API 호출
  const sendPhoto = async () => {
    if (allImages.length === 0) {
      Alert.alert("사진을 선택해주세요.");
      return;
    }

    setIsUploading(true);
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) {
        Alert.alert("로그인이 필요합니다.");
        setIsUploading(false);
        return;
      }

      const formData = await createFormData(); // ✅ FormData 생성

      const requests = [];

      if (parsedReceiverList.length > 0) {
        formData.append("dto", JSON.stringify({ receiverList: parsedReceiverList }));

        requests.push(
          fetch("https://api.passion4-jeans.store/photo/friend-share", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
          })
        );
      }

      if (parsedTeamList.length > 0) {
        for (const teamId of parsedTeamList) {
          const teamFormData = await createFormData();
          teamFormData.append("dto", JSON.stringify({ teamId }));

          requests.push(
            fetch("https://api.passion4-jeans.store/photo/team-share", {
              method: "POST",
              headers: { Authorization: `Bearer ${token}` },
              body: teamFormData,
            })
          );
        }
      }

      await Promise.all(requests);
      Alert.alert("사진 공유 완료", "사진이 성공적으로 공유되었습니다.");
      router.push("/Share/share-complete");
    } catch (error) {
      console.error("❌ 사진 공유 오류:", error);
      Alert.alert("오류 발생", "네트워크 오류가 발생했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TopNavBar />
      <Text style={styles.title}>공유할 사진을 확인하세요.</Text>

      <View style={styles.imageContainer}>
        {allImages.map((imageUri, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image source={{ uri: imageUri }} style={styles.image} />
            
            {/* 🔹 사진 위에 음성 녹음 버튼 */}
            <TouchableOpacity 
              style={styles.micButton} 
              onPress={isRecording ? stopRecording : startRecording}
              activeOpacity={0.8}
            >
              <Ionicons name="mic" size={30} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* 🔹 변환된 텍스트 말풍선 */}
      {message ? (
        <View style={styles.bubbleContainer}>
          <View style={styles.bubble}>
            <Text style={styles.bubbleText}>{message}</Text>
          </View>
        </View>
      ) : (
        <Text style={styles.placeholderText}>음성을 녹음하면 텍스트가 표시됩니다.</Text>
      )}
    <CustomButton title={isUploading ? "전송 중..." : "보내기"} onPress={sendPhoto} disabled={isUploading} />

      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingTop: 50,
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
  },
  title: {
    fontSize: 30,
    fontFamily: 'Bold',
    textAlign: 'center',
    marginBottom: 0,
    marginTop: 150,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  emptySpaceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingBottom: 20,
  },
  recordButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  recordText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bubbleContainer: { flexDirection: "row", justifyContent: "flex-start", width: "80%", marginTop: 20 },
  bubble: { backgroundColor: "#E0E0E0", padding: 10, borderRadius: 10, maxWidth: "80%" },
  bubbleText: { fontSize: 16 },
  placeholderText: { fontSize: 16, color: "#888", textAlign: "center", marginTop: 20 },
  imageWrapper: { position: 'relative' },
  micButton: { position: 'absolute', bottom: 10, right: 10, backgroundColor: "#FF5733", padding: 10, borderRadius: 30 },
});
