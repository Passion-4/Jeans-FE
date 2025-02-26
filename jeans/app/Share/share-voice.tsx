import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import { useImageContext } from '../../app/Context/ImageContext';
import CustomButton from '@/components/FullButton';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PhotoDetailScreen() {
  const router = useRouter();
  const { selectedImages } = useImageContext();
  const { shareType, receiverList, teamId } = useLocalSearchParams();

  // ✅ teamId를 항상 배열로 변환
  const parsedReceiverList = typeof receiverList === "string" ? JSON.parse(receiverList) : receiverList || [];
  const parsedTeamList = typeof teamId === "string" ? JSON.parse(teamId) : teamId ? [teamId] : [];

  const [isUploading, setIsUploading] = useState(false);

  const sendPhoto = async () => {
    if (selectedImages.length === 0) {
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

      const createFormData = () => {
        const formData = new FormData();
        selectedImages.forEach((imageUri, index) => {
          const fileName = imageUri.split('/').pop() || `photo_${index}.jpg`;
          formData.append("image", { uri: imageUri, name: fileName, type: "image/jpeg" } as any);
        });
        return formData;
      };

      const requests = [];
      if (parsedReceiverList.length > 0) {
        const formData = createFormData();
        formData.append("dto", JSON.stringify({ receiverList: parsedReceiverList }));
        requests.push(
          fetch("https://api.passion4-jeans.store/photo/friend-share", {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}`, "Content-Type": "multipart/form-data" },
            body: formData,
          })
        );
      }

      if (parsedTeamList.length > 0) {
        for (const teamId of parsedTeamList) {
          const formData = createFormData();
          formData.append("dto", JSON.stringify({ teamId }));
          requests.push(
            fetch("https://api.passion4-jeans.store/photo/team-share", {
              method: "POST",
              headers: { "Authorization": `Bearer ${token}`, "Content-Type": "multipart/form-data" },
              body: formData,
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

      <View style={styles.titleContainer}>
        <Text style={styles.title}>사진과 함께 첨부할 {'\n'}메시지를 녹음하세요.</Text>
      </View>

      {/* ✅ 선택한 이미지 리스트 표시 */}
      <View style={styles.imageContainer}>
        {selectedImages.length > 0 ? (
          selectedImages.map((imageUri, index) => (
            <Image key={index} source={{ uri: imageUri }} style={styles.image} />
          ))
        ) : (
          <Text style={styles.emptySpaceText}>사진 없음</Text>
        )}
      </View>

      {/* 공유 버튼 */}
      <View style={styles.buttonWrapper}>
        <CustomButton title={isUploading ? "전송 중..." : "보내기"} onPress={sendPhoto} disabled={isUploading} />
      </View>

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
    marginTop: 30,
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
