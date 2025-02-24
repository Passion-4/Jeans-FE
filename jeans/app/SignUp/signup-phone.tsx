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

export default function SignupPhone() {
  const router = useRouter();
  const { signupData, updateSignupData } = useSignup();
  const inputRef = useRef<TextInput>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [phone, setPhone] = useState(signupData.phone || '');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const pulseAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isRecording) {
      startPulseAnimation();
    } else {
      pulseAnimation.setValue(1);
    }
  }, [isRecording]);

  // 🔹 원이 반복적으로 커졌다 작아지는 애니메이션
  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.1,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  // 🔹 전화번호 확인 버튼 눌렀을 때 실행되는 함수
  const handleConfirmPhone = async () => {
    if (!phone.trim() || phone.length !== 11 || !/^\d{11}$/.test(phone)) {
      alert('올바른 전화번호를 입력해주세요. (예: 01012345678)');
      return;
    }
    
  
    try {
      const response = await fetch('https://api.passion4-jeans.store/code/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      });
  
      const text = await response.text(); // 🔹 서버 응답을 먼저 문자열로 받음
      console.log('서버 응답:', text);
  
      let message = text; // 기본적으로 응답을 문자열로 처리
  
      // 🔹 응답이 JSON인지 확인한 후, JSON으로 변환
      if (text.startsWith('{') && text.endsWith('}')) {
        try {
          const data = JSON.parse(text); // JSON 변환 시도
          message = data.message || text; // JSON에서 message 필드가 있으면 사용
        } catch (error) {
          console.warn('JSON 변환 실패, 응답을 문자열로 처리:', error);
        }
      }
  
      console.log('응답 상태 코드:', response.status);
  
      if (response.ok || response.status === 201) {
        setIsCodeSent(true);
        alert(message || '인증번호가 전송되었습니다.');
      } else {
        alert(`오류 발생: ${message}`);
      }
    } catch (error) {
      console.error('네트워크 오류:', error);
      alert('네트워크 오류가 발생했습니다.');
    }
  };
  
    // 🔹 마이크 버튼 동작
    const handleMicPress = () => {
      if (isRecording) {
        setIsRecording(false);
        inputRef.current?.blur();
      } else {
        setIsRecording(true);
        inputRef.current?.focus();
        startPulseAnimation();
      }
    };
  
  
  // 🔹 인증번호 확인 버튼 눌렀을 때 실행되는 함수
  const handleVerifyCode = async () => {
    try {
      const response = await fetch('https://api.passion4-jeans.store/code/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="01012345678 형태로 입력해주세요."
        keyboardType="numeric"
        maxLength={11}
        value={phone}
        onChangeText={setPhone}
      />
      <Text style={styles.infoText}>* 입력하신 전화번호는 아이디로 사용됩니다.</Text>
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmPhone}>
        <Text style={styles.confirmButtonText}>확인</Text>
      </TouchableOpacity>

      {isCodeSent && (
        <>
          <Text style={styles.label}>인증번호 입력</Text>
          <TextInput
            style={styles.input}
            placeholder="4자리 인증번호 입력"
            keyboardType="numeric"
            maxLength={4}
            value={verificationCode}
            onChangeText={setVerificationCode}
          />
          <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyCode}>
            <Text style={styles.verifyButtonText}>인증번호 확인</Text>
          </TouchableOpacity>
        </>
      )}

      {/* 🔹 음성 버튼 */}
      <TouchableOpacity style={styles.micWrapper} onPress={handleMicPress} activeOpacity={0.8}>
        <View style={styles.micContainer}>
          {isRecording && (
            <Animated.View
              style={[styles.pulseCircle, { transform: [{ scale: pulseAnimation }] }]}
            />
          )}
          <View style={styles.recordButton}>
            <Ionicons name="mic" size={25} color="white" />
            <Text style={styles.recordButtonText}>전화번호를 말해보세요</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* 음성 안내 문구 */}
      <View style={{ minHeight: 25 }}>
        <Text style={[styles.recordingNotice, { opacity: isRecording ? 1 : 0 }]}>
          다시 누르면 음성이 멈춥니다.
        </Text>
      </View>

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
    marginBottom: 40,
    fontFamily: 'Bold',
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 5,
    fontSize: 20,
    marginBottom: 15,
    fontFamily: 'Medium',
  },
  input: {
    width: '100%',
    height: 55,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#F8F8F8',
    marginBottom: 5,
    fontFamily: 'Medium',
    fontSize: 18,
  },
  confirmButton: {
    width: '100%',
    height: 55,
    backgroundColor: '#3DB2FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Medium',
  },
  verifyButton: {
    width: '100%',
    height: 55,
    backgroundColor: '#3DB2FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Medium',
  },
  infoText: {
    fontSize: 15,
    color: '#3DB2FF',
    fontFamily: 'Medium',
    alignSelf: 'flex-start',
    marginBottom: 15, // 🔹 간격 추가
  },
  micWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  micContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseCircle: {
    position: 'absolute',
    width: '102%',
    height: 85,
    borderRadius: 100,
    backgroundColor: 'rgba(61, 178, 255, 0.3)',
  },
  recordButton: {
    width: '100%',
    height: 70,
    backgroundColor: '#3DB2FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10,
  },
  recordButtonText: {
    color: 'white',
    marginLeft: 10,
    fontFamily: 'Medium',
    fontSize: 21,
  },
  recordingNotice: {
    fontSize: 20,
    color: '#3DB2FF',
    fontFamily: 'Medium',
    marginBottom: 30,
  },
});
