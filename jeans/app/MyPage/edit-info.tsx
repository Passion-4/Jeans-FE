import React, { useState, useEffect, useRef } from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Keyboard} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import FullButton from '@/components/FullButton';
import HalfButton from '@/components/HalfButton';

export default function GroupEditScreen() {
  const router = useRouter();
  const [userName, setGroupName] = useState('김덕배'); // 기존 사용자 이름
  const [groupImage, setGroupImage] = useState(require('../../assets/images/friend1.jpg')); // 기본 이미지
  const [keyboardVisible, setKeyboardVisible] = useState(false); // 키보드 상태 감지
  const inputRef = useRef<TextInput | null>(null); // 입력 필드 참조

  // 키보드 상태 감지 
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });

    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  // 갤러리에서 이미지 선택
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // 정방형 크롭 가능
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setGroupImage({ uri: result.assets[0].uri });
    }
  };

  // 저장 버튼 클릭 -> 홈 화면 이동
  const handleSave = () => {
    Keyboard.dismiss(); // 키보드 내리기
    router.push('/Home/main-page'); // 홈 화면으로 이동
  };

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* 타이틀 */}
      <Text style={styles.title}>내 계정</Text>

      {/* 프로필 이미지 */}
      <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
        <Image source={groupImage} style={styles.image} />
      </TouchableOpacity>

      {/* 프로필 사진 수정 버튼 */}
      <TouchableOpacity style={styles.imageEditButton} onPress={pickImage}>
        <Text style={styles.imageEditText}>프로필 사진 수정</Text>
      </TouchableOpacity>

      {/* 그룹 이름 입력 필드 */}
      <View style={styles.inputContainer}>
        {/* 수정 아이콘 */}
        <TouchableOpacity onPress={() => inputRef.current?.focus()} style={styles.editIcon}>
          <Ionicons name="pencil-outline" size={24} color="#008DBF" />
        </TouchableOpacity>

        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="그룹 이름"
          placeholderTextColor="#999"
          value={userName}
          onChangeText={setGroupName}
        />
        

        {/* ✅ 키보드가 올라와 있을 때만 확인 버튼 표시 */}
        {keyboardVisible && (
          <TouchableOpacity style={styles.confirmButton} onPress={Keyboard.dismiss}>
            <Text style={styles.confirmButtonText}>확인</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.buttonContainer}>
      <HalfButton
        title="비밀번호 바꾸기"
        onPress={() => router.push('/ChangePassword/origin-password')}
        color="#3DB2FF"
      />
      <HalfButton
        title="기본 보정값 바꾸기"
        onPress={() => router.push('/Set/photo-selection0')}
        color="#3DB2FF"
      />
    </View>
    <FullButton title="저장하기" onPress={handleSave} />


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
    marginTop:15
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
    marginBottom: 5,
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
  },
  editIcon: {
    padding: 5,
    marginRight: 5,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 18,
    textAlign: 'left',
    paddingHorizontal: 5,
    fontFamily:'Medium'
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
    justifyContent: 'space-between', // 버튼을 양쪽 끝으로 배치
    width: '100%', // 부모 컨테이너의 전체 너비 사용
    marginBottom: 20, // 아래쪽 간격 추가
  }
});

