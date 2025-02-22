import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage"; // ✅ 토큰 저장
import FullButton from "../components/FullButton";

export default function LoginScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔹 로그인 처리 함수
  const handleLogin = async () => {
    if (!phone.trim() || !password.trim()) {
      Alert.alert("입력 오류", "전화번호와 비밀번호를 입력하세요.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://api.passion4-jeans.store/members/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password }),
      });

      const responseData = await response.json();
      console.log("로그인 응답:", responseData);

      if (!response.ok) {
        throw new Error(responseData.message || "로그인 정보가 없습니다.");
      }

      // ✅ 로그인 성공 시 토큰 저장
      await AsyncStorage.setItem("accessToken", responseData.accessToken);

      Alert.alert("로그인 성공", "환영합니다!");
      router.push("/Set/face-input"); // ✅ 홈 화면으로 이동
    } catch (error) {
      let errorMessage = "로그인 실패. 다시 시도해주세요.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      Alert.alert("로그인 실패", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>환영합니다!</Text>

      <Text style={styles.label}>전화번호</Text>
      <TextInput
        style={styles.input}
        placeholder="전화번호를 입력하세요."
        placeholderTextColor="#5E6365"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <Text style={styles.label}>비밀번호</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="비밀번호를 입력하세요."
          placeholderTextColor="#5E6365"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#3DB2FF" />
      ) : (
        <FullButton title="로그인" onPress={handleLogin} />
      )}

      <TouchableOpacity onPress={() => router.push("/SignUp/signup-voice")}>
        <Text style={styles.signup}>회원가입</Text>
      </TouchableOpacity>
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
    marginBottom: 30,
    fontFamily: "Bold",
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: 5,
    fontSize: 20,
    marginBottom: 8,
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
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  signup: {
    color: "#008DBF",
    fontSize: 20,
    marginTop: 5,
    fontFamily: "Bold",
  },
});
