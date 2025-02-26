import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Animated,
  Easing,
} from "react-native";
import { useSignup } from "@/hooks/SignupContext";
import { Ionicons } from "@expo/vector-icons";
import FullButton from "@/components/FullButton";
import { useRouter } from "expo-router";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import styles from './signup-st';

export default function SignupPassword() {
  const router = useRouter();
  const { signupData, updateSignupData } = useSignup();
  const inputRef = useRef<TextInput>(null);
  const confirmInputRef = useRef<TextInput>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [password, setPassword] = useState(signupData.password || "");
  const [confirmPassword, setConfirmPassword] = useState("");
  const pulseAnimation = useRef(new Animated.Value(1)).current;
  const recordingRef = useRef<Audio.Recording | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

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
      disconnectWebSocket(); // 🔹 언마운트 시 WebSocket 해제
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
      setPassword(event.data); // 🔹 비밀번호 입력 필드에 반영
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

  // 🔹 녹음 시작 애니메이션
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

  // 🔹 다음 버튼 동작
  const handleNext = () => {
    if (!password.trim()) {
      Alert.alert("비밀번호 오류", "비밀번호를 입력해주세요.");
      return;
    }
  
    updateSignupData("password", password);
    router.push("/SignUp/signup-privacy");
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title2}>회원가입</Text>

      {/* 안내 문구 */}
      <Text style={styles.QText}>Q. 당신의 첫 사랑은 누구인가요?</Text>
      <Text style={styles.infoText2}>* 입력하신 답변은 비밀번호로 사용됩니다.</Text>

      {/* 🔹 비밀번호 입력란 */}
      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="비밀번호를 입력하세요."
          secureTextEntry={false}
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#5E6365"
        />
      </View>

      {/* 🔹 음성 버튼 */}
      <TouchableOpacity style={{ width: "100%" }} onPress={handleMicPress} activeOpacity={0.8}>
        <View style={styles.micContainer}>
          {isRecording && (
            <Animated.View style={[styles.pulseCircle, { transform: [{ scale: pulseAnimation }] }]} />
          )}
          <View style={styles.recordButton}>
            <Ionicons name="mic" size={25} color="white" />
            <Text style={styles.recordButtonText}>
              {isRecording ? "듣는 중..." : "이름을 말해보세요"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* 🔹 다음 버튼 */}
      <FullButton title="다 음" onPress={handleNext} />
    </View>
  );
}
