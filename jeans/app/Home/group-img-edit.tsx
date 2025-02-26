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
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

export default function GroupEditScreen() {
  const router = useRouter();
  const { teamId, teamName, imageUrl } = useLocalSearchParams();
  const inputRef = useRef<TextInput | null>(null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [groupName, setGroupName] = useState<string>(
    Array.isArray(teamName) ? teamName[0] : teamName ?? ""
  );
  const [groupImage, setGroupImage] = useState<{ uri?: string; source?: any }>(() => {
    return imageUrl 
      ? { uri: Array.isArray(imageUrl) ? imageUrl[0] : imageUrl }
      : { source: require('@/assets/images/group-default.png') };
  });

  useEffect(() => {
    if (imageUrl) {
      setGroupImage({ uri: Array.isArray(imageUrl) ? imageUrl[0] : imageUrl });
    }
  }, [imageUrl]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

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
      console.log("📸 선택한 이미지 URI:", imageUri);

      const token = await getToken();
      if (!token) return;

      let formData = new FormData();
      formData.append("dto", JSON.stringify({ teamId }));
      
      const fileType = imageUri.split(".").pop(); 
      const file = {
        uri: imageUri,
        name: `profile.${fileType}`,
        type: `image/${fileType}`
      };
  
      formData.append("image", file as any);

      let uploadResponse = await fetch("https://api.passion4-jeans.store/team/profile", {
        method: "PATCH",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData,
      });

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

      {/* 프로필 사진 */}
      <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
        <Image
          key={groupImage.uri ?? "default"}
          source={groupImage.uri ? { uri: groupImage.uri } : groupImage.source}
          style={styles.image}
        />
      </TouchableOpacity>

      {/* 프로필 사진 수정 버튼 */}
      <TouchableOpacity style={styles.imageEditButton} onPress={pickImage}>
        <Text style={styles.imageEditText}>프로필 사진 수정</Text>
      </TouchableOpacity>

      {/* 이름 입력 필드 */}
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={() => inputRef.current?.focus()} style={styles.editIcon}>
          <Ionicons name="pencil-outline" size={24} color="#008DBF" />
        </TouchableOpacity>

        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="그룹 이름"
          placeholderTextColor="#999"
          value={groupName}
          onChangeText={setGroupName}
        />

        {keyboardVisible && (
          <TouchableOpacity style={styles.confirmButton} onPress={Keyboard.dismiss}>
            <Text style={styles.confirmButtonText}>확인</Text>
          </TouchableOpacity>
        )}
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
  imageContainer: { 
    width: 120, 
    height: 120, 
    borderRadius: 60, 
    overflow: 'hidden', 
    // 사진 border에 그림자 효과 추가
    backgroundColor: '#F5F5F5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // 안드로이드용 그림자
   },
  image: { width: '100%', height: '100%' },
  imageEditButton: { 
    marginTop:30,
    backgroundColor: '#E0E0E0', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 10, marginBottom: 10 },
  imageEditText: { fontSize: 16, fontFamily: 'Medium', color: '#333' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#CCCCCC', width: '100%', marginBottom: 20, paddingVertical: 5 },
  editIcon: { padding: 5, marginRight: 5 },
  input: { flex: 1, height: 60, fontSize: 20, textAlign: 'left', paddingHorizontal: 5, fontFamily: 'Medium' },
  confirmButton: { backgroundColor: '#FF616D', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 10, marginLeft: 10 },
  confirmButtonText: { color: 'white', fontFamily: 'Medium', fontSize: 16 },
  saveButton: { width: '100%', paddingVertical: 15, backgroundColor: '#008DBF', borderRadius: 10, alignItems: 'center' },
  saveText: { fontSize: 20, fontFamily: 'Medium', color: 'white' },
});
