import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Keyboard, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import FullButton from '@/components/FullButton';
import HalfButton from '@/components/HalfButton';

export default function GroupEditScreen() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [profileImage, setProfileImage] = useState(require('../../assets/images/bg.png')); // 기본 이미지
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false); // 프로필 업로드 중 상태 추가
  const inputRef = useRef<TextInput | null>(null);

  // ✅ 프로필 정보 가져오기 (백엔드 연결)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (!accessToken) {
          Alert.alert('오류', '로그인이 필요합니다.');
          return;
        }

        const response = await fetch('https://api.passion4-jeans.store/my/profile', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${accessToken}` },
        });

        if (!response.ok) throw new Error('프로필 정보를 가져올 수 없습니다.');

        const data = await response.json();
        console.log('📌 프로필 데이터:', data);

        setUserName(data.name || '');
        if (data.profileUrl) {
          setProfileImage({ uri: data.profileUrl });
        }
      } catch (error) {
        console.error('❌ 프로필 불러오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ✅ 키보드 상태 감지
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleSaveProfile = async () => {
    if (!userName.trim()) {
      Alert.alert('오류', '이름을 입력해주세요.');
      return;
    }
  
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        Alert.alert('로그인이 필요합니다.');
        return;
      }
  
      const response = await fetch('https://api.passion4-jeans.store/my/name', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newName: userName }), // ✅ API 문서에 맞춰 수정
      });
  
      const responseText = await response.text();
      console.log('🔹 응답 상태 코드:', response.status);
      console.log('🔹 응답 본문:', responseText);
  
      if (responseText.includes('이름이 변경되었습니다.')) {
        Alert.alert('성공', '이름이 변경되었습니다.');
      } else {
        throw new Error('이름 변경에 실패했습니다.');
      }
    } catch (error) {
      console.error('❌ 이름 저장 실패:', error);
      Alert.alert('오류', '이름 저장 중 문제가 발생했습니다.');
    }
  };
  

  // ✅ 프로필 사진 변경 (갤러리에서 선택)
  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('권한 필요', '갤러리 접근 권한이 필요합니다.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage({ uri: result.assets[0].uri });
      handleUploadImage(result.assets[0].uri);
    }
  };

  // ✅ 프로필 사진 업로드
  const handleUploadImage = async (imageUri: string) => {
    setUploading(true);
    const formData = new FormData();

    try {
      const fileName = imageUri.split('/').pop() || 'profile.jpg';
      formData.append('image', {
        uri: imageUri,
        name: fileName,
        type: 'image/jpeg',
      } as any);

      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        Alert.alert('로그인이 필요합니다.');
        setUploading(false);
        return;
      }

      const response = await fetch('https://api.passion4-jeans.store/my/profile', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const responseText = await response.text();
      console.log('🔹 응답 상태 코드:', response.status);
      console.log('🔹 응답 본문:', responseText);

      if (!response.ok) {
        throw new Error('프로필 사진 변경에 실패했습니다.');
      }

      const data = JSON.parse(responseText);
      setProfileImage({ uri: data.profileUrl });
      Alert.alert('성공', '프로필 사진이 변경되었습니다.');
    } catch (error) {
      console.error('❌ 프로필 사진 업로드 실패:', error);
      Alert.alert('오류', '프로필 사진 변경 중 문제가 발생했습니다.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TopNavBar />

      <Text style={styles.title}>내 계정</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#3DB2FF" />
      ) : (
        <>
          {/* 프로필 사진 */}
          <TouchableOpacity style={styles.imageContainer} onPress={handlePickImage}>
            <Image source={profileImage} style={styles.image} />
          </TouchableOpacity>

          {/* 프로필 사진 수정 버튼 */}
          <TouchableOpacity style={styles.imageEditButton} onPress={handlePickImage}>
            <Text style={styles.imageEditText}>
              {uploading ? '업로드 중...' : '프로필 사진 변경'}
            </Text>
          </TouchableOpacity>

          {/* 이름 입력 필드 */}
          <View style={styles.inputContainer}>
            <TouchableOpacity onPress={() => inputRef.current?.focus()} style={styles.editIcon}>
              <Ionicons name="pencil-outline" size={24} color="#008DBF" />
            </TouchableOpacity>

            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder="이름"
              placeholderTextColor="#999"
              value={userName}
              onChangeText={setUserName}
            />

            {keyboardVisible && (
              <TouchableOpacity style={styles.confirmButton} onPress={Keyboard.dismiss}>
                <Text style={styles.confirmButtonText}>확인</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <HalfButton title="비밀번호 변경" onPress={() => router.push('/ChangePassword/origin-password')} color="#3DB2FF" />
            <HalfButton title="기본 보정값 변경" onPress={() => router.push('/Set/photo-selection0')} color="#3DB2FF" />
          </View>

          <FullButton title="정보 저장" onPress={handleSaveProfile} />
        </>
      )}

      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    fontFamily: 'Bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 15,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageEditButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 0,
  },
  imageEditText: {
    fontSize: 16,
    fontFamily: 'Medium',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    width: '100%',
    marginBottom: 20,
    paddingVertical: 5,
    marginTop:10
  },
  editIcon: {
    padding: 5,
    marginRight: 5,
    marginBottom:-10
  },
  input: {
    flex: 1,
    height: 60,
    fontSize: 20,
    textAlign: 'left',
    paddingHorizontal: 5,
    fontFamily: 'Medium',
    marginBottom:-10
  },
  confirmButton: {
    backgroundColor: '#008DBF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  confirmButtonText: {
    color: 'white',
    fontFamily: 'Medium',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '103%',
    marginBottom: 20,
  },
});
