import React, { useState } from "react";
import { StyleSheet, View, Text, Switch, Alert } from "react-native";
import FullButton from "@/components/FullButton";
import { useRouter } from "expo-router";

export default function PrivacySignupScreen() {
  const router = useRouter();
  const [agreed1, setAgreed1] = useState(false);
  const [agreed2, setAgreed2] = useState(false);
  const [agreed3, setAgreed3] = useState(false);

  const handleNext = () => {
    if (!agreed1 || !agreed2 || !agreed3) {
      Alert.alert("이용 약관 동의", "모든 항목에 동의해야 합니다.");
      return;
    }
    router.push("/SignUp/signup-complete");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <Text style={styles.label}>개인정보 수집 및 이용 동의</Text>

      <View style={styles.switchContainer}>
        <Text style={styles.context}>갤러리(사진, 미디어 접근 권한)</Text>
        <Switch value={agreed1} onValueChange={setAgreed1} />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.context}>마이크(음성 녹음 권한)</Text>
        <Switch value={agreed2} onValueChange={setAgreed2} />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.context}>위치 정보</Text>
        <Switch value={agreed3} onValueChange={setAgreed3} />
      </View>

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
    marginBottom: 40,
    fontFamily: "Medium",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
    marginBottom: 20,
  },
  context: {
    fontSize: 18,
    marginBottom: 0,
    fontFamily: "Medium",
    color: "#5E6365",
  },
});
