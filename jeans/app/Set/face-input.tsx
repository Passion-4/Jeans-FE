import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View, Image, Alert, ActivityIndicator, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import FullButton from "../../components/FullButton"; // ✅ FullButton 유지

export default function PhotoSelectionScreen() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 갤러리에서 사진 선택
  const pickImage = useCallback(async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const imageUri = result.assets[0].uri;

      // ✅ 안드로이드에서 content:// 경로를 file://로 변환
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        imageUri,
        [],
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
      );

      setSelectedImage(manipulatedImage.uri);
      console.log("📌 변환된 이미지 URI:", manipulatedImage.uri);
    }
  }, []);

  // 🔹 프로필 사진 업로드
  const uploadProfileImage = async () => {
    if (!selectedImage) {
      Alert.alert("오류", "먼저 프로필 사진을 선택하세요.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(selectedImage);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append("image", {
        uri: selectedImage,
        name: "profile.jpg",
        type: "image/jpeg",
      } as any);

      console.log("📌 FormData 확인:", formData);

      const accessToken = await AsyncStorage.getItem("accessToken");
      if (!accessToken) {
        Alert.alert("오류", "로그인이 필요합니다.");
        return;
      }

      const uploadResponse = await fetch("https://api.passion4-jeans.store/my/profile", {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error(`업로드 실패 (${uploadResponse.status})`);
      }

      Alert.alert("성공", "프로필 사진이 변경되었습니다.");
      router.push("/Set/face-input-complete");
    } catch (error) {
      Alert.alert("오류", error instanceof Error ? error.message : "알 수 없는 오류 발생");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>본인의 얼굴 사진을{'\n'}한 장 첨부해주세요.</Text>

      {selectedImage ? (
        <Image source={{ uri: selectedImage }} style={styles.previewImage} />
      ) : (
        <Image source={require("../../assets/images/inputimg.png")} style={styles.image} />
      )}

      {/* 🔹 갤러리에서 사진 선택 버튼 (FullButton 유지) */}
      <FullButton title="갤러리에서 사진 선택" onPress={pickImage} />

      {/* 🔹 프로필 사진 업로드 버튼 (FullButton과 같은 크기, 배경색 변경) */}
      {selectedImage && (
        <TouchableOpacity style={styles.uploadButton} onPress={uploadProfileImage}>
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>업로드</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 35,
    fontFamily: "Bold",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 70,
  },
  image: {
    width: 200,
    height: 190,
    marginBottom: 30,
    marginTop: 20,
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  uploadButton: {
    width: "100%",
    height: 60, // ✅ FullButton과 같은 높이 설정
    backgroundColor: "#ED3241", // ✅ 업로드 버튼 색 (빨간색)
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "Medium",
    color: "#FFFFFF",
  },
});
