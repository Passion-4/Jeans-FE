import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  Alert
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function GroupEditScreen() {
  const router = useRouter();
  const { teamId, teamName, imageUrl } = useLocalSearchParams();
  const [groupName, setGroupName] = useState<string>(
    Array.isArray(teamName) ? teamName[0] : teamName ?? ""
  );
  const [groupImage, setGroupImage] = useState<{ uri: string }>(() => {
    if (imageUrl) {
      return { uri: Array.isArray(imageUrl) ? imageUrl[0] : imageUrl };
    } else {
      return { uri: require('../../assets/images/icon.png') };
    }
  });
  const [keyboardVisible, setKeyboardVisible] = useState(false); 
  const inputRef = useRef<TextInput | null>(null);

  // ✅ 키보드 상태 감지
  useEffect(() => {
    if (imageUrl) {
      setGroupImage({ uri: Array.isArray(imageUrl) ? imageUrl[0] : imageUrl });
    }
  }, [imageUrl]);

    // ✅ 공통 함수: 토큰 가져오기
    const getToken = async () => {
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) {
        Alert.alert("오류", "로그인이 필요합니다.");
        return null;
      }
      return token;
    };

  // ✅ 그룹명 수정 API 호출
  const updateGroupName = async () => {
    try {
      const token = await getToken();
      if (!token) {
        Alert.alert("오류", "로그인이 필요합니다.");
        return;
      }

      let response = await fetch("https://api.passion4-jeans.store/team/name", {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ teamId, name: groupName })
      });

      if (!response.ok) {
        throw new Error(`팀명 변경 실패 (${response.status})`);
      }

      Alert.alert("성공", "그룹명이 수정되었습니다.");
    } catch (error) {
      console.error("❌ 그룹명 수정 실패:", error);
      Alert.alert("오류", "그룹명 수정에 실패했습니다.");
    }
  };

  // ✅ 프로필 사진 변경 API 호출
  const updateGroupImage = async (imageUri: string) => {
    try {
      console.log("📸 선택한 이미지 URI:", imageUri); // ✅ 이미지 경로 확인
  
      const token = await getToken();
      if (!token) {
        Alert.alert("오류", "로그인이 필요합니다.");
        return;
      }
      console.log("🔑 인증 토큰 가져옴:", token);
  
      let formData = new FormData();
      const teamIdString = Array.isArray(teamId) ? teamId[0] : teamId;
      formData.append("teamId", teamIdString);
  
      console.log("📂 팀 ID 추가됨:", teamIdString);
  
      // ✅ fetch(imageUri) 호출 전 로그 추가
      console.log("🌐 이미지 파일 가져오는 중:", imageUri);
  
      const response = await fetch(imageUri);
      console.log("🔄 fetch(imageUri) 응답 상태:", response.status);
  
      const blob = await response.blob();
      console.log("✅ Blob 변환 완료. Blob 크기:", blob.size);
  
      formData.append("image", blob, "profile.jpg");
  
      console.log("🚀 FormData 구성 완료:", formData);
  
      // ✅ 서버 요청 전 로그 추가
      console.log("🌍 서버에 이미지 업로드 중...");
  
      let uploadResponse = await fetch("https://api.passion4-jeans.store/team/profile", {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData
      });
  
      console.log("🔄 서버 응답 상태 코드:", uploadResponse.status);
  
      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        console.error("❌ 서버 응답 오류 내용:", errorText);
        throw new Error(`프로필 사진 변경 실패 (${uploadResponse.status})`);
      }
  
      const responseData = await uploadResponse.json();
      console.log("✅ 프로필 사진 변경 성공:", responseData);
  
      setGroupImage({ uri: responseData.imageUrl });
  
      Alert.alert("성공", "프로필 사진이 변경되었습니다.");
    } catch (error) {
      console.error("❌ 프로필 사진 변경 실패:", error);
      Alert.alert("오류", "프로필 사진 변경에 실패했습니다.");
    }
  };
  
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!result.canceled && result.assets.length > 0) {
      const newImageUri = result.assets[0].uri;
      setGroupImage({ uri: newImageUri });
      await updateGroupImage(newImageUri);
    }
  };

  // ✅ 저장 버튼 클릭 시 수정 실행 후 홈으로 이동
  const handleSave = async () => {
    await updateGroupName();
    router.push('/Home/main-page'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>그룹 프로필 수정</Text>

      <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
        <Image
          key={groupImage.uri}  // ✅ 상태 변경 시 새로운 이미지로 강제 렌더링
          source={groupImage}
          style={styles.image}
        />
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <TextInput
          value={groupName ?? ""}
          onChangeText={setGroupName}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>저장하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 35, fontFamily: 'Bold', marginBottom: 30 },
  imageContainer: { width: 120, height: 120, borderRadius: 60, overflow: 'hidden', borderWidth: 2, borderColor: '#008DBF', marginBottom: 10 },
  image: { width: '100%', height: '100%' },
  inputContainer: { borderBottomWidth: 1, borderBottomColor: '#CCCCCC', width: '100%', marginBottom: 30, paddingVertical: 5 },
  input: { height: 50, fontSize: 20, textAlign: 'left', paddingHorizontal: 5 },
  saveButton: { width: '100%', paddingVertical: 15, backgroundColor: '#008DBF', borderRadius: 10, alignItems: 'center' },
  saveText: { fontSize: 20, fontFamily: 'Medium', color: 'white' },
});
