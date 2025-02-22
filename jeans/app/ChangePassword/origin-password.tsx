import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import FullButton from "@/components/FullButton";

export default function VerifyIdentityScreen() {
  const router = useRouter();
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 본인 확인 요청 (GET 요청)
  const handleVerify = async () => {
    if (!birthday.trim() || !phone.trim()) {
      Alert.alert("입력 오류", "생년월일과 전화번호를 입력하세요.");
      return;
    }
  
    setLoading(true);
    try {
      const accessToken = await AsyncStorage.getItem("accessToken"); // ✅ 인증 토큰 가져오기 (필요 시)
      
      const url = `https://api.passion4-jeans.store/my/check?birthday=${birthday}&phone=${phone}`;

      console.log("📌 요청 URL:", url);
      console.log("📌 요청 헤더:", accessToken ? `Bearer ${accessToken}` : "토큰 없음");

      const response = await fetch(url, {
        method: "GET",
        headers: accessToken ? { "Authorization": `Bearer ${accessToken}` } : {}, 
      });

      console.log("📌 서버 응답 상태 코드:", response.status);

      if (response.ok) {
        const responseText = await response.text();
        console.log("📌 서버 응답:", responseText);
        Alert.alert("본인 확인 완료", "비밀번호를 변경할 수 있습니다.");
        router.push("/ChangePassword/new-password");
      } 
      else if (response.status === 403) {
        Alert.alert("본인 확인 실패", "입력한 정보와 일치하는 계정이 없습니다. 입력값을 다시 확인해주세요.");
      } 
      else {
        throw new Error("본인 확인에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("📌 오류:", error);
      Alert.alert("오류", error instanceof Error ? error.message : "본인 확인 요청 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>본인 확인</Text>

      <Text style={styles.label}>생년월일</Text>
      <TextInput
        style={styles.input}
        placeholder="예: 000101"
        keyboardType="numeric"
        maxLength={6}
        value={birthday}
        onChangeText={setBirthday}
      />

      <Text style={styles.label}>전화번호</Text>
      <TextInput
        style={styles.input}
        placeholder="예: 01012345678"
        keyboardType="numeric"
        maxLength={11}
        value={phone}
        onChangeText={setPhone}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#3DB2FF" />
      ) : (
        <FullButton title="다 음" onPress={handleVerify} />
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
    marginBottom: 30,
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
});
