import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

export default function GroupEditScreen() {
  const router = useRouter();
  const { teamId, teamName, imageUrl } = useLocalSearchParams();  // ✅ params에서 데이터 직접 가져오기

  const [groupName, setGroupName] = useState<string>(
    Array.isArray(teamName) ? teamName[0] : teamName ?? ""
  );
  
  const [groupImage, setGroupImage] = useState<{ uri?: string; source?: any }>(() => {
    return imageUrl 
      ? { uri: Array.isArray(imageUrl) ? imageUrl[0] : imageUrl }
      : { source: require('../../assets/images/icon.png') };
  });

  useEffect(() => {
    if (imageUrl) {
      setGroupImage({ uri: Array.isArray(imageUrl) ? imageUrl[0] : imageUrl });
    }
  }, [imageUrl]);

  // ✅ 토큰 가져오는 함수
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
      if (!token) return;

      let response = await fetch("https://api.passion4-jeans.store/team/name", {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ teamId, name: groupName })  // ✅ params에서 받은 teamId 사용
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
      console.log("📸 선택한 이미지 URI:", imageUri);

      const token = await getToken();
      if (!token) {
        Alert.alert("오류", "로그인이 필요합니다.");
        return;
      }

      let formData = new FormData();
  
      // ✅ 팀 ID를 JSON 데이터로 추가 (Text 형태)
      formData.append("dto", JSON.stringify({ teamId }));
      
      const fileType = imageUri.split(".").pop(); // Extract file extension
      const file = {
        uri: imageUri,
        name: `profile.${fileType}`, // Example: "profile.jpeg"
        type: `image/${fileType}` // Example: "image/jpeg"
      };
  
      // ✅ Append the image as a file
      formData.append("image", file as any);

      console.log("🚀 FormData 구성 완료");

      // ✅ 서버에 요청 보내기
      let uploadResponse = await fetch("https://api.passion4-jeans.store/team/profile", {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
        }, // ❌ "Content-Type": "multipart/form-data" 자동 설정됨
        body: formData,
      });

      console.log("🔄 서버 응답 상태 코드:", uploadResponse.status);

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        console.error("❌ 서버 응답 오류 내용:", errorText);
        throw new Error(`프로필 사진 변경 실패 (${uploadResponse.status})`);
      }

      const responseData = await uploadResponse.json();
      console.log("✅ 프로필 사진 변경 성공:", responseData);

      // ✅ UI 업데이트
      setGroupImage({ uri: responseData.imageUrl });

      Alert.alert("성공", "프로필 사진이 변경되었습니다.");
    } catch (error) {
      console.error("❌ 프로필 사진 변경 실패:", error);
      Alert.alert("오류", "프로필 사진 변경에 실패했습니다.");
    }
  };

  // ✅ 이미지 선택 후 업데이트
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

  // ✅ 저장 버튼 클릭 시 API 호출 후 홈으로 이동
  const handleSave = async () => {
    await updateGroupName();
    router.push('/Home/main-page');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>그룹 프로필 수정</Text>

      <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
        <Image
          key={groupImage.uri ?? "default"}
          source={groupImage.uri ? { uri: groupImage.uri } : groupImage.source}
          style={styles.image}
        />
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <TextInput
          value={groupName}
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
