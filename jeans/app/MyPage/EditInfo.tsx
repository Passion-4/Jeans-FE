import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';

export default function EditProfileScreen() {
  const router = useRouter();

  // 백엔드에서 불러온 사용자 데이터 (예제)
  const [userInfo, setUserInfo] = useState({
    name: '이준용',
    birthdate: '1999-09-27',
    phoneNumber: '+82 10-1234-5678',
  });

  useEffect(() => {
    // 실제 백엔드 API 호출 시 이곳에서 데이터를 불러오면 됨
    // 예: axios.get('/api/userinfo').then(response => setUserInfo(response.data))
  }, []);

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* 내 계정 섹션 */}
      <Text style={styles.sectionTitle}>내 계정</Text>

      {/* 프로필 이미지 섹션 */}
      <View style={styles.profileContainer}>
        <Image 
          source={require('../../assets/images/icon.png')} 
          style={styles.profileImage} 
        />
        <TouchableOpacity style={styles.changeImageButton} onPress={() => router.push('/Profile/image')}>
          <Text style={styles.buttonText}>사진 바꾸기</Text>
        </TouchableOpacity>
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
    marginBottom:30,
    marginTop: 30
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 60,
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
