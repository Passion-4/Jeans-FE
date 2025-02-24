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
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import useSelectedFriends from '../../hooks/useSelectedFriends';

// ✅ Team 타입 추가
type Team = {
  teamId: number;
  name: string;
  imageUrl?: string;
};

export default function GroupEditScreen() {
  const router = useRouter();
  const { selectedFriends, clearSelectedFriends } = useSelectedFriends();

  // ✅ 현재 선택된 그룹 정보 가져오기
  const selectedTeam: Team | undefined = selectedFriends.find(
    (item): item is Team => 'teamId' in item
  );

  const [groupName, setGroupName] = useState<string>(selectedTeam?.name ?? "");
  const [groupImage, setGroupImage] = useState<{ uri?: string; source?: any }>(() => {
    if (selectedTeam?.imageUrl) {
      return { uri: selectedTeam.imageUrl };
    } else {
      return { source: require('../../assets/images/icon.png') };
    }
  });
  
  // ✅ useEffect를 활용해 imageUrl이 바뀌면 상태 업데이트
  useEffect(() => {
    if (selectedTeam?.imageUrl) {
      setGroupImage({ uri: selectedTeam.imageUrl });
    }
  }, [selectedTeam?.imageUrl]);

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
      if (!token) return;

      let response = await fetch("https://api.passion4-jeans.store/team/name", {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ teamId: selectedTeam?.teamId, name: groupName })
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
      console.log("🔑 인증 토큰 가져옴:", token);
  
      let formData = new FormData();
  
      // ✅ Correctly append JSON data as a Blob (Text)
      formData.append("dto", JSON.stringify({ teamId: selectedTeam?.teamId }));
  
      // ✅ Convert the image URI into a file format
      const fileType = imageUri.split(".").pop(); // Extract file extension
      const file = {
        uri: imageUri,
        name: `profile.${fileType}`, // Example: "profile.jpeg"
        type: `image/${fileType}` // Example: "image/jpeg"
      };
  
      // ✅ Append the image as a file
      formData.append("image", file as any);
  
      console.log("🚀 FormData 구성 완료");
  
      // 🔥 Debugging: Log FormData
      console.log("🔍 FormData 확인:");
      for (let [key, value] of formData.entries()) {
        console.log(`  🏷️ ${key}:`, value);
      }
  
      // ✅ Send FormData to server
      let uploadResponse = await fetch("https://api.passion4-jeans.store/team/profile", {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
        }, // ❌ DO NOT set "Content-Type": "multipart/form-data", it will be set automatically
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

  // ✅ 저장 버튼 클릭 시 useSelectedFriends 초기화 후 홈으로 이동
  const handleSave = async () => {
    await updateGroupName();
    clearSelectedFriends(); // ✅ 선택된 그룹 데이터 초기화
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
