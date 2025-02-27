import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import ListeningAnimation from "./ListeningAnimation";

export default function BottomNavBar() {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const wsRef = useRef<WebSocket | null>(null); // WebSocket 객체 저장

  // 🔹 WebSocket 연결
  useEffect(() => {
    connectWebSocket();

    return () => {
      disconnectWebSocket(); // 🔹 컴포넌트 언마운트 시 WebSocket 연결 해제
    };
  }, []);

  const connectWebSocket = () => {
    wsRef.current = new WebSocket("wss://api.passion4-jeans-ai.store/api/ws-process");

    wsRef.current.onopen = () => {
      console.log("✅ WebSocket 연결 완료");
    };

    wsRef.current.onmessage = (event) => {
      console.log("📩 WebSocket 메시지 수신:", event.data);
      try {
        const result = JSON.parse(event.data);
        if (result && result.path) {
          console.log(`✅ 이동할 경로: ${result.path}`);
          router.push(result.path); // 🔹 서버에서 받은 경로로 이동
        } else {
          console.warn("⚠️ 서버 응답에 'path' 값이 없음:", result);
        }
      } catch (jsonError) {
        console.error("❌ JSON 파싱 오류:", event.data);
      }
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

      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await newRecording.startAsync();
      setRecording(newRecording);
      setIsRecording(true);
    } catch (err) {
      console.error("녹음 시작 실패:", err);
    }
  };

  // 🔹 녹음 중지 및 WebSocket으로 전송
  const stopRecording = async () => {
    if (!recording) return;

    console.log("🛑 녹음 중지");
    setIsRecording(false);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setRecording(null);

    if (uri) {
      console.log("📤 WebSocket으로 오디오 전송 중...", uri);
      await sendAudioToWebSocket(uri);
    }
  };

  // 🔹 WebSocket을 통해 음성 파일 전송 (바이너리 데이터)
  const sendAudioToWebSocket = async (audioUri: string) => {
    try {
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        console.error("❌ WebSocket이 열려있지 않음.");
        return;
      }

      // 🔹 파일을 바이너리로 읽어오기
      const fileData = await FileSystem.readAsStringAsync(audioUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      if (!fileData) {
        console.error("❌ 오디오 파일을 읽을 수 없음.");
        return;
      }

      // 🔹 Base64 → 바이너리 변환 후 WebSocket으로 전송
      const binaryData = Uint8Array.from(atob(fileData), (c) => c.charCodeAt(0));
      wsRef.current.send(binaryData);
      console.log("🚀 WebSocket으로 바이너리 오디오 데이터 전송 완료!");

    } catch (error) {
      console.error("❌ WebSocket 오디오 전송 오류:", error);
    }
  };

  return (
    <>
      {/* 하단 네비게이션 바 */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push("/Home/main-page")}>
          <Text style={styles.navText}>친구 소식</Text>
        </TouchableOpacity>

        {/* 🔹 마이크 버튼 */}
        <TouchableOpacity style={styles.centerButton} onPress={startRecording}>
          <Ionicons name="mic" size={50} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => router.push("/MakeUp/select-function")}>
          <Text style={styles.navText}>사진 편집</Text>
        </TouchableOpacity>
      </View>

      {/* 🔹 녹음 모달 */}
      <Modal visible={isRecording} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <ListeningAnimation />
          <TouchableOpacity style={styles.stopButton} onPress={stopRecording}>
            <Text style={styles.stopButtonText}>완료</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: "#E0E0E0",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  navButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  navText: {
    fontSize: 20,
    fontFamily: "Bold",
    marginBottom: 20,
  },
  centerButton: {
    width: 90,
    height: 90,
    backgroundColor: "#FF616D",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    marginBottom: 40,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  stopButton: {
    backgroundColor: "#008DBF",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 50,
  },
  stopButtonText: {
    fontSize: 18,
    fontFamily: "Medium",
    color: "white",
    textAlign: "center",
  },
});
