import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { useSignup } from "@/hooks/SignupContext"; // ✅ Context 연결
import { Ionicons } from "@expo/vector-icons";
import FullButton from "@/components/FullButton";
import { useRouter } from "expo-router";

export default function SignupPhone() {
  const router = useRouter();
  const { signupData, updateSignupData } = useSignup(); // ✅ Context API 활용
  const inputRef = useRef<TextInput>(null);
  const [isListening, setIsListening] = useState(false);
  const [phone, setPhone] = useState(signupData.phone || ""); // ✅ 초기값 설정

  // 🔹 마이크 버튼 눌렀을 때 UI 효과
  const handleMicPress = () => {
    setIsListening(true);
    setTimeout(() => setIsListening(false), 2000);
  };

  // 🔹 다음 버튼 동작
  const handleNext = () => {
    if (!phone.trim() || phone.length !== 11 || !/^\d{11}$/.test(phone)) {
      alert("올바른 전화번호를 입력해주세요. (예: 01012345678)");
      return;
    }
    updateSignupData("phone", phone); // ✅ Context에 저장
    router.push("/SignUp/signup-password"); // 다음 화면 이동
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <Text style={styles.label}>전화번호</Text>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="01012345678 형태로 입력해주세요."
        keyboardType="numeric"
        maxLength={11}
        value={phone}
        onChangeText={setPhone}
      />
      <Text style={styles.infoText}>* 입력하신 전화번호는 아이디로 사용됩니다.</Text>

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
    marginBottom: 5,
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
  infoText: {
    fontSize: 15,
    color: "#3DB2FF",
    fontFamily: "Medium",
    alignSelf: "flex-start",
  },
  listeningText: {
    fontSize: 16,
    color: "#3DB2FF",
    fontFamily: "Medium",
    marginTop: 10,
  },
});
