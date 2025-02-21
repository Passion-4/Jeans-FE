import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { useSignup } from "@/hooks/SignupContext"; // ✅ Context 연결
import { Ionicons } from "@expo/vector-icons";
import FullButton from "@/components/FullButton";
import { useRouter } from "expo-router";

export default function SignupBirth() {
  const router = useRouter();
  const { signupData, updateSignupData } = useSignup(); // ✅ Context API 활용
  const inputRef = useRef<TextInput>(null);
  const [isListening, setIsListening] = useState(false);
  const [birthday, setBirthday] = useState(signupData.birthday || ""); // ✅ 초기값 설정

  // 🔹 마이크 버튼 눌렀을 때 UI 효과
  const handleMicPress = () => {
    setIsListening(true);
    setTimeout(() => setIsListening(false), 2000);
  };

  // 🔹 다음 버튼 동작
  const handleNext = () => {
    if (!birthday.trim() || birthday.length !== 6) {
      alert("올바른 생년월일을 입력해주세요. (예: 200101)");
      return;
    }
    updateSignupData("birthday", birthday); // ✅ Context에 저장
    router.push("/SignUp/signup-phone"); // 다음 화면 이동
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <Text style={styles.label}>생년월일</Text>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="예: 200101"
        keyboardType="numeric"
        maxLength={6}
        value={birthday}
        onChangeText={setBirthday}
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
    marginBottom: 40,
    fontFamily: "Bold",
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
    fontSize: 18,
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
