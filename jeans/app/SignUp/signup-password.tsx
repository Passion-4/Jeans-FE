import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Animated, Easing } from "react-native";
import { useSignup } from "@/hooks/SignupContext"; // ✅ Context 연결
import { Ionicons } from "@expo/vector-icons";
import FullButton from "@/components/FullButton";
import { useRouter } from "expo-router";

export default function SignupPassword() {
  const router = useRouter();
  const { signupData, updateSignupData } = useSignup(); // ✅ Context API 활용
  const inputRef = useRef<TextInput>(null);
  const confirmInputRef = useRef<TextInput>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [password, setPassword] = useState(signupData.password || "");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 🔹 애니메이션 값 (버튼 주변 효과)
  const pulseAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isRecording) {
      startPulseAnimation();
    } else {
      pulseAnimation.setValue(1);
    }
  }, [isRecording]);

  // 🔹 원이 반복적으로 커졌다 작아지는 애니메이션
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

  // 🔹 마이크 버튼 눌렀을 때
  const handleMicPress = () => {
    if (isRecording) {
      setIsRecording(false);
      inputRef.current?.blur(); // 포커스 해제
    } else {
      setIsRecording(true);
      inputRef.current?.focus(); // 비밀번호 입력창 포커스
      startPulseAnimation();
    }
  };

  // 🔹 다음 버튼 동작
  const handleNext = () => {
    if (!password.trim()) {
      Alert.alert("비밀번호 오류", "비밀번호를 입력해주세요.");
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert("비밀번호 불일치", "비밀번호가 일치하지 않습니다. 다시 입력해주세요.");
      return;
    }

    updateSignupData("password", password);
    router.push("/SignUp/signup-privacy");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>

      {/* 안내 문구 */}
      <Text style={styles.QText}>Q. 당신의 첫 사랑은 누구인가요?</Text>
      <Text style={styles.infoText}>* 이 질문에 대한 답이 당신의 비밀번호가 될 것입니다.</Text>

      <View style={styles.inputContainer}>
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
          ref={confirmInputRef}
          style={styles.input}
          placeholder="비밀번호를 다시 입력하세요."
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholderTextColor="#5E6365"
        />
      </View>

      {/* 🔹 음성 버튼 */}
      <TouchableOpacity style={{ width: '100%' }} onPress={handleMicPress} activeOpacity={0.8}>
        <View style={styles.micContainer}>
          {isRecording && (
            <Animated.View
              style={[styles.pulseCircle, { transform: [{ scale: pulseAnimation }] }]}
            />
          )}
          <View style={styles.recordButton}>
            <Ionicons name="mic" size={25} color="white" />
            <Text style={styles.recordButtonText}>비밀번호를 말해보세요</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* 음성 안내 문구 */}
      <View style={{ minHeight: 25 }}>
        <Text style={[styles.recordingNotice, { opacity: isRecording ? 1 : 0 }]}>
          다시 누르면 음성이 멈춥니다.
        </Text>
      </View>

      {/* 다음 버튼 */}
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
  inputContainer: {
    width: "100%",
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
    marginBottom: 20,
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
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  pulseCircle: {
    position: 'absolute',
    width: '102%',
    height: 85,
    borderRadius: 100,
    backgroundColor: 'rgba(61, 178, 255, 0.3)',
  },
  recordButton: {
    width: '100%',
    height: 70,
    backgroundColor: '#3DB2FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10,
  },
  recordButtonText: {
    color: 'white',
    marginLeft: 10,
    fontFamily: 'Medium',
    fontSize: 21,
  },
  recordingNotice: {
    fontSize: 20,
    color: '#3DB2FF',
    fontFamily: 'Medium',
    marginBottom: 30,
  },
});
