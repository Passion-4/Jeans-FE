import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';

export default function FriendNicknameScreen() {
  const router = useRouter();
  const { memberId } = useLocalSearchParams();
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);

  // 🔹 별명 저장 API 요청
  const handleCreateNickname = async () => {
    if (!nickname.trim()) return;

    setLoading(true);
    try {
      console.log("🚀 별명 수정 요청 시작");

      // ✅ accessToken 가져오기
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) {
        Alert.alert("오류", "로그인이 필요합니다.");
        return;
      }

      const response = await fetch("https://api.passion4-jeans.store/follow-list/nickname", {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          memberId: Number(memberId), // ✅ 숫자로 변환
          nickname: nickname,
        }),
      });

      console.log("🔹 API 응답 상태 코드:", response.status);
      let responseText = await response.text();
      console.log("🔹 API 응답 본문:", responseText);

      if (!response.ok) {
        throw new Error(`별명 수정에 실패했습니다. (${response.status})`);
      }

      Alert.alert("성공", "별명이 성공적으로 수정되었습니다.");
      router.push("/Friend/relation-complete");
    } catch (error) {
      console.error("❌ API 요청 실패:", error);
      Alert.alert("오류", error instanceof Error ? error.message : "알 수 없는 오류 발생");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* 🔹 타이틀 */}
      <Text style={styles.title}>별명을 입력해주세요</Text>

      {/* 🔹 별명 입력 필드 */}
      <TextInput
        style={styles.input}
        placeholder="예: 준용이형, 김과장님"
        placeholderTextColor="#999"
        value={nickname}
        onChangeText={setNickname}
      />

      {/* 🔹 만들기 버튼 */}
      <TouchableOpacity
        style={[styles.createButton, !nickname.trim() && styles.disabledButton]}
        onPress={handleCreateNickname}
        disabled={!nickname.trim() || loading}
      >
        <Text style={styles.createText}>{loading ? "저장 중..." : "만들기"}</Text>
      </TouchableOpacity>

      <BottomNavBar />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily:'Bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#008DBF',
    fontSize: 20,
    marginBottom: 40,
    paddingHorizontal: 5,
    textAlign: 'left',
    fontFamily:'Medium'
  },
  createButton: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#008DBF',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#B0BEC5',
  },
  createText: {
    fontSize: 20,
    fontFamily:'Medium',
    color: 'white',
  },
});
