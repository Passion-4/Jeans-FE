import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { useSignup } from "@/hooks/SignupContext"; // ✅ Context 연결
import { Ionicons } from "@expo/vector-icons";
import FullButton from "@/components/FullButton";
import { useRouter } from "expo-router";

export default function SignupPassword() {
  const router = useRouter();
  const { signupData, updateSignupData } = useSignup(); // ✅ Context API 활용
  const inputRef = useRef<TextInput>(null);
  const [isListening, setIsListening] = useState(false);
  const [password, setPassword] = useState(signupData.password || ""); // ✅ 초기값 설정
  const [confirmPassword, setConfirmPassword] = useState(""); // 🔹 비밀번호 확인

  // 🔹 마이크 버튼 눌렀을 때 UI 효과
  const handleMicPress = () => {
    setIsListening(true);
    setTimeout(() => setIsListening(false), 2000);
  };

  // 🔹 다음 버튼 동작
  const handleNext = () => {
    if (password.length < 6) {
      Alert.alert("비밀번호 오류", "비밀번호는 6자리 이상이어야 합니다.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("비밀번호 불일치", "비밀번호가 일치하지 않습니다. 다시 입력해주세요.");
      return;
    }

    updateSignupData("password", password); // ✅ Context에 저장
    router.push("/SignUp/signup-privacy"); // 다음 화면 이동
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>

      {/* 안내 문구 추가 */}
      <Text style={styles.QText}>Q. 당신의 첫 사랑은 누구인가요?</Text>
      <Text style={styles.infoText}>* 이 질문에 대한 답이 당신의 비밀번호가 될 것입니다.</Text>

      <Text style={styles.label}>비밀번호</Text>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="비밀번호를 입력하세요."
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#5E6365"
      />

      <Text style={styles.label}>비밀번호 확인</Text>
      <TextInput
        style={styles.input}
        placeholder="비밀번호를 다시 입력하세요."
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholderTextColor="#5E6365"
      />

      {/* 🔹 마이크 버튼 */}
      <TouchableOpacity onPress={handleMicPress} activeOpacity={0.8}>
        <View style={styles.micContainer}>
          <Ionicons name="mic" size={25} color="white" />
          <Text style={styles.recordButtonText}>음성 입력 시작</Text>
        </View>
      </TouchableOpacity>

      {/* 🔹 듣는 중일 때 표시 */}
      {isListening && <Text style={styles.listeningText}>듣는 중입니다...</Text>}

      {/* 다음 버튼 - 개인정보 동의 화면으로 이동 */}
      <FullButton title="다 음" onPress={handleNext} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 35,
    fontFamily: "Bold",
    marginBottom: 40,
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: 5,
    fontSize: 20,
    marginBottom: 15,
    fontFamily: "Medium",
  },
  input: {
    width: "100%",
    height: 55,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#F8F8F8",
    marginBottom: 15,
    fontFamily: "Medium",
    fontSize: 16,
  },
  QText: {
    fontSize: 20,
    fontFamily: "Bold",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  infoText: {
    fontSize: 14,
    fontFamily: "Medium",
    marginBottom: 30,
    alignSelf: "flex-start",
  },
  micContainer: {
    width: "100%",
    height: 70,
    backgroundColor: "#3DB2FF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 10,
  },
  recordButtonText: {
    color: "white",
    marginLeft: 10,
    fontFamily: "Medium",
    fontSize: 21,
  },
  listeningText: {
    fontSize: 16,
    color: "#3DB2FF",
    fontFamily: "Medium",
    marginTop: 10,
  },
});
