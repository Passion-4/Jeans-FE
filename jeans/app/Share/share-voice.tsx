import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import CustomButton from '@/components/FullButton';
import { useImageContext } from '../../app/Context/ImageContext';
import { Image as RNImage } from 'react-native';
import * as FileSystem from 'expo-file-system';

export default function PhotoDetailScreen() {
  const router = useRouter();
  const { selectedImages, setSelectedImages } = useImageContext();
  const { sharedImageUri, shareType, receiverList, teamId } = useLocalSearchParams();

  // ✅ 로컬 파일 변환 (보정된 이미지)
  const getLocalFileUri = async (imageUri: string) => {
    if (imageUri.startsWith("http")) {
      const fileUri = `${FileSystem.cacheDirectory}temp_image.jpg`;
      const { uri } = await FileSystem.downloadAsync(imageUri, fileUri);
      return uri;
    }
    return imageUri;
  };

  // ✅ 보정된 이미지 URI 변환
  const resolvedSharedImageUri = typeof sharedImageUri === "string"
    ? `file://${RNImage.resolveAssetSource({ uri: sharedImageUri }).uri}`
    : null;

  // ✅ 보정된 이미지가 있으면 그것만 사용, 없으면 갤러리에서 선택한 이미지 사용
  const allImages = resolvedSharedImageUri
    ? [resolvedSharedImageUri]
    : selectedImages.length > 0
    ? selectedImages
    : [];

  // ✅ JSON 데이터 파싱
  const parsedReceiverList = typeof receiverList === "string" ? JSON.parse(receiverList) : receiverList || [];
  const parsedTeamList = typeof teamId === "string" ? JSON.parse(teamId) : teamId ? [teamId] : [];

  const [isUploading, setIsUploading] = useState(false);

  // ✅ FormData 생성 함수 (보정된 이미지 & 갤러리 선택 이미지 포함)
  const createFormData = async () => {
    const formData = new FormData();
  
    for (const imageUri of allImages) {
      if (typeof imageUri === "string") {
        const localUri = await getLocalFileUri(imageUri); // ✅ 로컬 파일 변환

        const fileName = localUri.split("/").pop() || "photo.jpg";
        const fileType = "image/jpeg";

        formData.append("image", {
          uri: localUri,
          name: fileName,
          type: fileType,
        } as any);
      }
    }

    return formData;
  };

  // ✅ 사진 공유 API 호출
  const sendPhoto = async () => {
    if (allImages.length === 0) {
      Alert.alert("사진을 선택해주세요.");
      return;
    }

    setIsUploading(true);
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) {
        Alert.alert("로그인이 필요합니다.");
        setIsUploading(false);
        return;
      }

      const formData = await createFormData(); // ✅ FormData 생성

      const requests = [];

      if (parsedReceiverList.length > 0) {
        formData.append("dto", JSON.stringify({ receiverList: parsedReceiverList }));

        requests.push(
          fetch("https://api.passion4-jeans.store/photo/friend-share", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
          })
        );
      }

      if (parsedTeamList.length > 0) {
        for (const teamId of parsedTeamList) {
          const teamFormData = await createFormData();
          teamFormData.append("dto", JSON.stringify({ teamId }));

          requests.push(
            fetch("https://api.passion4-jeans.store/photo/team-share", {
              method: "POST",
              headers: { Authorization: `Bearer ${token}` },
              body: teamFormData,
            })
          );
        }
      }

      await Promise.all(requests);
      Alert.alert("사진 공유 완료", "사진이 성공적으로 공유되었습니다.");
      router.push("/Share/share-complete");
    } catch (error) {
      console.error("❌ 사진 공유 오류:", error);
      Alert.alert("오류 발생", "네트워크 오류가 발생했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TopNavBar />
      <Text style={styles.title}>공유할 사진을 확인하세요.</Text>

      <View style={styles.imageContainer}>
        {allImages.map((imageUri, index) => (
          typeof imageUri === "string" ? (
            <Image key={index} source={{ uri: imageUri }} style={styles.image} />
          ) : null
        ))}
      </View>

      <CustomButton title={isUploading ? "전송 중..." : "보내기"} onPress={sendPhoto} disabled={isUploading} />
      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 15,
    marginTop: 50,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontFamily: 'Bold',
    textAlign: 'center',
    marginBottom: 0,
    marginTop: 150,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  emptySpaceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingBottom: 20,
  },
});
