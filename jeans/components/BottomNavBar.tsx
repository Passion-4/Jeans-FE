import React, { useState, useRef } from "react";
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

  // 🔹 녹음 중지 및 FastAPI로 전송
  const stopRecording = async () => {
    if (!recording) return;

    console.log("🛑 녹음 중지");
    setIsRecording(false);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setRecording(null);

    if (uri) {
      console.log("📤 오디오 파일 저장 완료:", uri);
      await processAudio(uri);
    }
  };

  // 🔹 FastAPI `/api/process`로 음성 파일 전송
  const processAudio = async (audioUri: string) => {
    try {
      // 🔹 서버가 요구하는 파일 저장 경로 (React Native 내부 저장소)
      const newFilePath = FileSystem.documentDirectory + "recorded_audio.wav";
      await FileSystem.moveAsync({
        from: audioUri,
        to: newFilePath,
      });

      console.log("📂 파일 이동 완료:", newFilePath);

      // 🔹 서버에 `file_path`를 JSON으로 전송
      const requestBody = {
        file_path: newFilePath,
      };

      console.log("📤 JSON 요청 데이터:", requestBody);

      const response = await fetch("https://api.passion4-jeans-ai.store/api/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      console.log("📝 서버 응답 전체:", result);

      if (result && result.target_name && result.action && result.path) {
        console.log(`✅ 서버 결과: ${result.target_name}, ${result.action}, ${result.path}`);
        alert(`📢 실행할 기능: ${result.action}\n👤 대상: ${result.target_name}`);
      } else {
        console.error("⚠️ 서버 응답에 필요한 데이터가 없습니다.");
      }
    } catch (error) {
      console.error("❌ 음성 처리 오류:", error);
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
