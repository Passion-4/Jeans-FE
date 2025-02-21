import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import FullButton from "@/components/FullButton";
import { useSignup } from "@/hooks/SignupContext";

export default function VoiceSignupScreen() {
  const router = useRouter();
  const { updateSignupData } = useSignup();
  const [selectedVoice, setSelectedVoice] = useState<number | null>(null);

  const handleVoiceSelect = (voice: number) => {
    setSelectedVoice(voice);
  };

  const handleNext = () => {
    if (selectedVoice === null) {
      alert("보이스 타입을 선택해주세요.");
      return;
    }
    updateSignupData("voiceType", selectedVoice);
    router.push("/SignUp/signup-name");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <Text style={styles.label}>안내 음성 선택</Text>
      <View style={styles.voiceContainer}>
        {/* 🔹 보이스 타입 1 */}
        <TouchableOpacity
          style={[styles.iconWrapper, selectedVoice === 1 && styles.selectedOption]}
          onPress={() => handleVoiceSelect(1)}
        >
          <Image source={require("@/assets/images/boy.png")} style={styles.iconImage} />
        </TouchableOpacity>

        {/* 🔹 보이스 타입 2 */}
        <TouchableOpacity
          style={[styles.iconWrapper, selectedVoice === 2 && styles.selectedOption]}
          onPress={() => handleVoiceSelect(2)}
        >
          <Image source={require("@/assets/images/girl.png")} style={styles.iconImage} />
        </TouchableOpacity>
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
    alignSelf: "center",
    fontSize: 20,
    marginBottom: 30,
    fontFamily: "Medium",
  },
  voiceContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginBottom: 20,
  },
  iconWrapper: {
    width: 100,
    height: 100,
    borderRadius: 15,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom:30
  },
  selectedOption: {
    backgroundColor: "#FFE2E5",
  },
  iconImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  iconText: {
    marginTop: 5,
    fontSize: 15,
    color: "#333",
    textAlign: "center",
    fontFamily: "Medium",
  },
});
