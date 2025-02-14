import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';

export default function EditProfileScreen() {
  const router = useRouter();

  // 사용자 정보
  const [userInfo, setUserInfo] = useState({
    name: '이준용',
    birthdate: '1999-09-27',
    phoneNumber: '+82 10-1234-5678',
  });

  // 이미지 상태 관리
  const [profileImage, setProfileImage] = useState(require('../../assets/images/icon.png')); // 기본 이미지
  const [tempImage, setTempImage] = useState<string | null>(null); // 임시 저장된 이미지
  const [isEditing, setIsEditing] = useState(false); // "확인" & "취소" 버튼 표시 여부

  // 갤러리에서 이미지 선택
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setTempImage(result.assets[0].uri); // 임시 이미지 저장
      setIsEditing(true); // 확인/취소 버튼 보이기
    }
  };

  // 이미지 변경 확정
  const confirmImageChange = () => {
    if (tempImage) {
      setProfileImage({ uri: tempImage }); // 프로필 이미지 변경
      setIsEditing(false); // 버튼 숨김
      setTempImage(null); // 임시 이미지 초기화
    }
  };

  // 이미지 변경 취소
  const cancelImageChange = () => {
    setTempImage(null); // 임시 이미지 초기화
    setIsEditing(false); // 버튼 숨김
  };

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* 내 계정 섹션 */}
      <Text style={styles.sectionTitle}>내 계정</Text>

      {/* 프로필 이미지 */}
      <View style={styles.profileContainer}>
        <Image 
          source={tempImage ? { uri: tempImage } : profileImage} 
          style={styles.profileImage} 
        />

        {/* 이미지 변경 버튼 */}
        {!isEditing ? (
          <TouchableOpacity style={styles.changeImageButton} onPress={pickImage}>
            <Text style={styles.buttonText}>사진 바꾸기</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.editButtons}>
            <TouchableOpacity style={styles.confirmButton} onPress={confirmImageChange}>
              <Text style={styles.buttonText}>확인</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={cancelImageChange}>
              <Text style={styles.buttonText}>취소</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* 사용자 정보 표시 */}
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>이름:</Text>
          <Text style={styles.value}>{userInfo.name}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>생년월일:</Text>
          <Text style={styles.value}>{userInfo.birthdate}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>전화번호:</Text>
          <Text style={styles.value}>{userInfo.phoneNumber}</Text>
        </View>
      </View>

      {/* 비밀번호 변경 버튼 */}
      <TouchableOpacity style={styles.passwordButton} onPress={() => router.push('/Profile/password')}>
        <Text style={styles.passwordText}>비밀번호 바꾸기</Text>
        <Ionicons name="chevron-forward" size={24} color="#777" />
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
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 150,
    marginBottom: 10,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 30
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  changeImageButton: {
    backgroundColor: '#008DBF',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editButtons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  confirmButton: {
    backgroundColor: '#008DBF',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#FF4C4C',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 18,
    color: '#333',
  },
  passwordButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginTop: 20,
    marginBottom: 20,
  },
  passwordText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
