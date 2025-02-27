import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { useRouter } from 'expo-router';
import FullButton from '@/components/FullButton';
import { Ionicons } from '@expo/vector-icons';
import { useSignup } from '@/hooks/SignupContext';
import * as Speech from "expo-speech"; 

export default function SignupPhone() {
  const router = useRouter();
  const { signupData, updateSignupData } = useSignup();
  const inputRef = useRef<TextInput>(null);
  const [phone, setPhone] = useState(signupData.phone || '');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        const voiceType = signupData.voiceType;
        if (voiceType === 1) {
          Speech.speak("전화번호를 입력하고 문자로 전송된 인증번호를 입력해주세요.", {
            language: "ko-KR",
            pitch: 0.4, // 남성 목소리
            rate: 1.0,
          });
        } else if (voiceType === 2) {
          Speech.speak("전화번호를 입력하고 문자로 전송된 인증번호를 입력해주세요.", {
            language: "ko-KR",
            pitch: 1.3, // 여성 목소리
            rate: 1.0,
          });
        }
      }, []);
      
  
  // 🔹 전화번호 확인 버튼 눌렀을 때 실행되는 함수
  const handleConfirmPhone = async () => {
    if (!phone.trim() || phone.length !== 11 || !/^\d{11}$/.test(phone)) {
      alert('올바른 전화번호를 입력해주세요. (예: 01012345678)');
      return;
    }

    try {
      const response = await fetch('https://api.passion4-jeans.store/code/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });

      const text = await response.text();
      console.log('서버 응답:', text);

      if (response.ok || response.status === 201) {
        setIsCodeSent(true);
        alert('인증번호가 전송되었습니다.');
      } else {
        alert(`오류 발생: ${text}`);
      }
    } catch (error) {
      console.error('네트워크 오류:', error);
      alert('네트워크 오류가 발생했습니다.');
    }
  };

  // 🔹 인증번호 확인 버튼 눌렀을 때 실행되는 함수
  const handleVerifyCode = async () => {
    try {
      const response = await fetch('https://api.passion4-jeans.store/code/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, randomNumber: verificationCode }),
      });

      const data = await response.json();
      if (data.success) {
        setIsVerified(true);
        alert('인증이 완료되었습니다.');
      } else {
        alert('인증번호가 일치하지 않습니다.');
      }
    } catch (error) {
      alert('인증번호 확인 중 오류가 발생했습니다.');
    }
  };

  // 🔹 다음 버튼 동작
  const handleNext = () => {
    if (!isVerified) {
      alert('먼저 인증을 완료해주세요.');
      return;
    }
    updateSignupData('phone', phone);
    router.push('/SignUp/signup-password');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>

      <Text style={styles.label}>전화번호</Text>
      <Text style={styles.infoText}>* 입력하신 전화번호는 아이디로 사용됩니다.</Text>

      {/* 🔹 전화번호 입력창 + 확인 버튼 */}
      <View style={styles.inputWrapper}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="01012345678"
          keyboardType="numeric"
          maxLength={11}
          value={phone}
          onChangeText={setPhone}
        />
        <TouchableOpacity style={styles.smallButton} onPress={handleConfirmPhone}>
          <Text style={styles.smallButtonText}>인증</Text>
        </TouchableOpacity>
      </View>

      {isCodeSent && (
        <>
          <Text style={styles.label}>인증번호 입력</Text>

          {/* 🔹 인증번호 입력창 + 인증확인 버튼 */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="4자리 인증번호 입력"
              keyboardType="numeric"
              maxLength={4}
              value={verificationCode}
              onChangeText={setVerificationCode}
            />
            <TouchableOpacity style={styles.smallButton} onPress={handleVerifyCode}>
              <Text style={styles.smallButtonText}>확인</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      <View style={{ height: 20 }} />

      <FullButton title="다 음" onPress={handleNext} disabled={!isVerified} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 35,
    marginBottom: 30,
    fontFamily: 'Bold',
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 5,
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'Bold',
    marginTop:15
  },
  infoText: {
    fontSize: 16,
    color: '#FF616D',
    fontFamily: 'Medium',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  inputWrapper: {
    flexDirection: 'row', // 🔹 가로 정렬
    alignItems: 'center',
    width: '100%',
  },
  input: {
    flex: 1, // 🔹 입력창이 남은 공간을 모두 차지하도록 설정
    height: 55,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#F8F8F8',
    fontFamily: 'Medium',
    fontSize: 18,
  },
  smallButton: {
    width: 80, // 🔹 버튼 크기 조절
    height: 55,
    backgroundColor: '#ED3241',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginLeft: 10, // 🔹 버튼과 입력창 사이 간격 추가
  },
  smallButtonText: {
    color: 'white',
    fontSize: 18, // 🔹 버튼 텍스트 크기 조절
    fontFamily: 'Medium',
  },
});
