import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { useRouter } from "expo-router";
import FullButton from "@/components/FullButton";
import { Ionicons } from "@expo/vector-icons";
import { useSignup } from "@/hooks/SignupContext";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";

export default function SignupScreen() {
  const router = useRouter();
  const { signupData, updateSignupData } = useSignup();
  const inputRef = useRef<TextInput>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [name, setName] = useState(signupData.name || ""); // Context에서 초기값 로드
  const pulseAnimation = useRef(new Animated.Value(1)).current;
  const recordingRef = useRef<Audio.Recording | null>(null); // 녹음 객체 저장
  const wsRef = useRef<WebSocket | null>(null); // WebSocket 연결 저장

  useEffect(() => {
    if (isRecording) {
      startPulseAnimation();
    } else {
      pulseAnimation.setValue(1);
    }
  }, [isRecording]);

  useEffect(() => {
    // 🔹 WebSocket 연결
    connectWebSocket();

    return () => {
      disconnectWebSocket(); // 🔹 컴포넌트 언마운트 시 WebSocket 연결 해제
    };
  }, []);

  // 🔹 WebSocket 연결 함수
  const connectWebSocket = () => {
    wsRef.current = new WebSocket("wss://api.passion4-jeans-ai.store/api/ws-text");

    wsRef.current.onopen = () => {
      console.log("✅ WebSocket 연결 완료");
    };

    wsRef.current.onmessage = (event) => {
      console.log("📩 WebSocket 메시지 수신:", event.data);
      setName(event.data);
    };

    wsRef.current.onerror = (error) => {
      console.error("❌ WebSocket 오류:", error);
    };

    wsRef.current.onclose = () => {
      console.log("🔌 WebSocket 연결 종료됨");
    };
  };

  // 🔹 WebSocket 연결 해제
  const disconnectWebSocket = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  };

  // 🔹 원이 반복적으로 커졌다 작아지는 애니메이션
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

  // 🔹 마이크 버튼 눌렀을 때 녹음 시작 & 중지
  const handleMicPress = async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  };

  // 🔹 음성 녹음 시작
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
      inputRef.current?.focus();
    } catch (err) {
      console.error("녹음 시작 실패:", err);
    }
  };

  // 🔹 녹음 중지 및 WebSocket으로 전송
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

  // 🔹 WebSocket을 통해 음성 파일 전송
  const sendAudioToWebSocket = async (audioUri: string) => {
    try {
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        console.error("❌ WebSocket이 열려있지 않음.");
        return;
      }
  
      // 🔹 바이너리 데이터로 파일 읽기
      const fileData = await FileSystem.readAsStringAsync(audioUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      if (!fileData) {
        console.error("❌ 오디오 파일을 읽을 수 없음.");
        return;
      }
  
      // 🔹 Base64를 Uint8Array로 변환 (바이너리로 복원)
      const binaryData = Uint8Array.from(atob(fileData), (c) => c.charCodeAt(0));
  
      // 🔹 WebSocket을 통해 바이너리 데이터 전송
      wsRef.current.send(binaryData);
      console.log("🚀 WebSocket으로 바이너리 오디오 데이터 전송 완료!");
  
    } catch (error) {
      console.error("❌ WebSocket 오디오 전송 오류:", error);
    }
  };

  // 🔹 다음 버튼 눌렀을 때 실행
  const handleNext = () => {
    if (!name.trim()) {
      alert("이름을 입력해주세요.");
      return;
    }
    updateSignupData("name", name);
    router.push("/SignUp/signup-birth");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>

      <Text style={styles.label}>이름</Text>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="이름을 입력하세요."
        placeholderTextColor="#5E6365"
        value={name}
        onChangeText={setName}
      />

      {/* 🔹 음성 버튼 */}
      <TouchableOpacity style={{ width: "100%" }} onPress={handleMicPress} activeOpacity={0.8}>
        <View style={styles.micContainer}>
          {isRecording && (
            <Animated.View
              style={[styles.pulseCircle, { transform: [{ scale: pulseAnimation }] }]}
            />
          )}
          <View style={styles.recordButton}>
            <Ionicons name="mic" size={25} color="white" />
            <Text style={styles.recordButtonText}>
              {isRecording ? "듣는 중..." : "이름을 말해보세요"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <FullButton title="다 음" onPress={handleNext} />
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
  title: {
    fontSize: 35,
    marginBottom: 40,
    fontFamily: 'Bold',
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 5,
    fontSize: 20,
    marginTop: 10,
    marginBottom: 15,
    fontFamily: 'Medium',
  },
  input: {
    width: '100%',
    height: 55,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#F8F8F8',
    marginBottom: 15,
    fontFamily: 'Medium',
    fontSize: 18,
  },
  micContainer: {
    width: '100%', 
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:15,
    marginBottom:20
  },
  pulseCircle: {
    position: 'absolute',
    width: '84%',
    height: 85,
    borderRadius: 100,
    backgroundColor: '#FFE2E5',
  },
  recordButton: {
    width: '80%',
    height: 60,
    backgroundColor: '#FF616D',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10,
  },
  recordButtonText: {
    color: 'white',
    marginLeft: 10,
    fontFamily: 'Medium',
    fontSize: 21,
  },
  recordingNotice: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Medium',
    marginBottom: 30,
  },
});
