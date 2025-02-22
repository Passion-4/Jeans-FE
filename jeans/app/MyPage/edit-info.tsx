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
  const [groupImage, setGroupImage] = useState(require('../../assets/images/bg.png'));
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef<TextInput | null>(null);

  // ✅ 백엔드에서 프로필 정보 가져오기
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
          setGroupImage({ uri: data.profileUrl });
        }
      } catch (error) {
        console.error('프로필 불러오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // 키보드 상태 감지
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  // ✅ 이름 변경 요청
  const handleChangeName = async () => {
    if (!userName.trim()) {
      Alert.alert('입력 오류', '변경할 이름을 입력하세요.');
      return;
    }

    setLoading(true);
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        Alert.alert('오류', '로그인이 필요합니다.');
        return;
      }

      const response = await fetch('https://api.passion4-jeans.store/my/name', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newName: userName }),
      });

      if (!response.ok) throw new Error('이름 변경에 실패했습니다.');

      Alert.alert('성공', '이름이 변경되었습니다.');

      // ✅ 변경된 정보를 다시 불러오기
      const profileResponse = await fetch('https://api.passion4-jeans.store/my/profile', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });

      if (!profileResponse.ok) throw new Error('프로필 정보를 다시 가져올 수 없습니다.');

      const updatedData = await profileResponse.json();
      setUserName(updatedData.name || '');
    } catch (error) {
      Alert.alert('오류', error instanceof Error ? error.message : '이름 변경 중 문제가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* 타이틀 */}
      <Text style={styles.title}>내 계정</Text>

      {/* 로딩 중이면 인디케이터 표시 */}
      {loading ? (
        <ActivityIndicator size="large" color="#3DB2FF" />
      ) : (
        <>
          {/* 프로필 이미지 */}
          <TouchableOpacity style={styles.imageContainer} onPress={handleChangeName}>
            <Image source={groupImage} style={styles.image} />
          </TouchableOpacity>

          {/* 프로필 사진 수정 버튼 */}
          <TouchableOpacity style={styles.imageEditButton} onPress={handleChangeName}>
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
            <HalfButton title="비밀번호 바꾸기" onPress={() => router.push('/ChangePassword/origin-password')} color="#3DB2FF" />
            <HalfButton title="기본 보정값 바꾸기" onPress={() => router.push('/Set/photo-selection0')} color="#3DB2FF" />
          </View>

          <FullButton title="이름 변경" onPress={handleChangeName} />
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
    marginTop:30
  },
  editIcon: {
    padding: 5,
    marginRight: 5,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 20,
    textAlign: 'left',
    paddingHorizontal: 5,
    fontFamily: 'Medium',
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
    width: '100%',
    marginBottom: 20,
  },
});
