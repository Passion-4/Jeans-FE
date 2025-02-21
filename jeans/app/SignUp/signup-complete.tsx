import React, { useState } from "react";
import { StyleSheet, View, Text, ActivityIndicator, Alert } from "react-native";
import { useSignup } from "@/hooks/SignupContext";
import { useRouter } from "expo-router";
import FullButton from "@/components/FullButton";
import CheckAnimation from "@/components/CheckAnimation";

export default function CompleteScreen() {
  const { signupData } = useSignup();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.passion4-jeans.store/members/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      if (!response.ok) {
        throw new Error("회원가입 실패");
      }

      Alert.alert("회원가입 완료", "정상적으로 가입되었습니다.");
      router.push("/explore"); // ✅ 홈 화면으로 이동
    } catch (error) {
      const errorMessage = (error as Error).message || "알 수 없는 오류가 발생했습니다.";
      Alert.alert("회원가입 실패", errorMessage);
    }
     finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* ✅ 타이틀 */}
      <Text style={styles.title}>회원가입이 {"\n"}완료되었습니다!</Text>

      {/* ✅ 애니메이션 */}
      <CheckAnimation />

      {/* ✅ 회원가입 버튼 */}
      {loading ? (
        <ActivityIndicator size="large" color="#3DB2FF" />
      ) : (
        <FullButton title="로그인 하러 가기" onPress={handleSignup} />
      )}
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
    textAlign: "center",
    marginBottom: 20,
  },
});
