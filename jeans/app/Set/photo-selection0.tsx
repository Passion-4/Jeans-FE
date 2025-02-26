import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import FullButton from '../../components/FullButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PhotoSelectionScreen() {
  const router = useRouter();
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  const [step, setStep] = useState(1); // 현재 진행 단계 (1, 2, 3)
  const [photos, setPhotos] = useState([
    "https://jeans-file-bucket.s3.ap-northeast-2.amazonaws.com/basic-edit-selection-image/1.png",
    "https://jeans-file-bucket.s3.ap-northeast-2.amazonaws.com/basic-edit-selection-image/2.png"
  ]);
  const [loading, setLoading] = useState(false);

  // API 엔드포인트 매핑
  const apiEndpoints: Record<number, string> = {
    1: "https://api.passion4-jeans.store/my/basic/first",
    2: "https://api.passion4-jeans.store/my/basic/second",
    3: "https://api.passion4-jeans.store/my/basic/third",
  };

  // 사진 선택 처리
  const handlePhotoSelect = (boxNumber: number) => {
    setSelectedBox(boxNumber);
  };

  // API 호출 및 사진 변경
  const fetchNextPhotos = async () => {
    if (selectedBox === null) {
      console.log("⚠️ No selection made. Exiting function.");
      return;
    }
  
    setLoading(true);
    try {
      let token = await AsyncStorage.getItem("accessToken");
      
      // ✅ 디버깅: 현재 단계(step) 확인
      console.log("🔢 Current Step Before Fetch:", step);
      console.log("🛠 Sending request to API:", apiEndpoints[step]);
      console.log("🔑 Authorization Header:", `Bearer ${token}`);
  
      const response = await fetch(apiEndpoints[step], {
        method: step === 1 ? "POST" : "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ edit: selectedBox === 1 }),
      });
  
      // ✅ 디버깅: API 응답 상태 확인
      console.log("📡 Response Status:", response.status);
      console.log("📡 Response Headers:", response.headers);
  
      if (!response.ok) {
        throw new Error(`❌ HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("📄 Response Data:", data);
  
      if (step < 3) {
        setPhotos([data.imageUrl1, data.imageUrl2]);
        setStep((prevStep) => {
          console.log("✅ Next Step Set:", prevStep + 1);
          return prevStep + 1;
        });
        setSelectedBox(null);
      } else {
        console.log("🎉 All steps completed. Navigating to photo-selection2.");
        router.push("/Set/photo-selection2");
      }
    } catch (error) {
      console.error("⚠️ Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>선호하는 사진 선택 ({step}/3)</Text>
      <Text style={styles.description}>더 예뻐 보이는 사진을 골라주세요.</Text>

      {/* 사진 선택 영역 */}
      {photos.map((source, index) => (
        <TouchableOpacity key={index} onPress={() => handlePhotoSelect(index)}>
          <Image source={{ uri: source }} style={[styles.photo, selectedBox === index && styles.selected]} />
        </TouchableOpacity>
      ))}

      {/* 로딩 표시 */}
      {loading && <ActivityIndicator size="large" color="#FF616D" style={{ margin: 20 }} />}

      {/* 확인 버튼 - 사진 선택 시만 활성화 */}
      {selectedBox !== null && (
        <FullButton title={step < 3 ? "다음" : "완료"} onPress={fetchNextPhotos} />
      )}
    </View>
  );
}

// 스타일
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 25,
    marginBottom: 20,
    fontFamily: "Bold",
    marginTop: 60
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Medium",
  },
  photo: {
    width: 200,
    height: 220,
    borderRadius: 10,
    marginBottom: 20,
  },
  selected: {
    borderWidth: 5,
    borderColor: "#FF616D",
  },
});

