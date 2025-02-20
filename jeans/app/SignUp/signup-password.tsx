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


export default function PasswordSignupScreen() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const inputRef = useRef<TextInput>(null);
  const [isRecording, setIsRecording] = useState(false);  
  const pulseAnimation = useRef(new Animated.Value(1)).current; // 원 크기 애니메이션 값

  useEffect(() => {
    if (isRecording) {
      startPulseAnimation();
    } else {
      pulseAnimation.setValue(1); // 원래 크기로 초기화
    }
  }, [isRecording]);

  // 🔹 원이 반복적으로 커졌다 작아지는 애니메이션
  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.1, // 커졌다가
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1, // 작아졌다가
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  // 🔹 마이크 버튼 눌렀을 때 동작
  const handleMicPress = () => {
    if (isRecording) {
      // 🔹 녹음 중이면 중지하고 입력창 포커스 해제
      setIsRecording(false);
      inputRef.current?.blur(); // 입력창 포커스 해제
    } else {
      // 🔹 녹음을 시작하고 입력창에 포커스를 줌
      setIsRecording(true);
      inputRef.current?.focus(); // 입력창 포커스
      startPulseAnimation();
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>

      {/* 안내 문구 추가 */}
      <Text style={styles.QText}>
        Q. 당신의 첫 사랑은 누구인가요?
      </Text>
      <Text style={styles.infoText}>
        * 이 질문에 대한 답이 당신의 비밀번호가 될 것입니다.
      </Text>

      <Text style={styles.label}>비밀번호</Text>
      <TextInput 
        style={styles.input} 
        placeholder="비밀번호를 입력하세요." 
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#5E6365"  
      />

      <Text style={styles.label}>비밀번호 확인</Text>
      <TextInput 
        style={styles.input} 
        placeholder="비밀번호를 다시 입력하세요." 
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholderTextColor="#5E6365"  
      />

      {/* 🔹 음성 버튼 */}
      <TouchableOpacity style={{ width: '100%' }} onPress={handleMicPress} activeOpacity={0.8}>
        <View style={styles.micContainer}>
          {/* 🔹 뒤에 반응하는 원 */}
          {isRecording && (
            <Animated.View
              style={[
                styles.pulseCircle,
                { transform: [{ scale: pulseAnimation }] },
              ]}
            />
          )}
          {/* 🔹 실제 마이크 버튼 */}
          <View style={styles.recordButton}>
            <Ionicons name="mic" size={25} color="white" />
            <Text style={styles.recordButtonText}>이름을 말해보세요</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/** 음성 안내 문구 */}
      <View style={{ minHeight: 25 }}>
        <Text style={[styles.recordingNotice, { opacity: isRecording ? 1 : 0 }]}>
          다시 누르면 음성이 멈춥니다.
        </Text>
      </View>      

      {/* 다음 버튼 - 개인정보 동의 화면으로 이동 */}
      <FullButton 
        title='다 음' 
        onPress={() => router.push('/SignUp/signup-privacy')}
      />
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
    fontFamily: 'Bold',
    marginBottom: 40,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 5,
    fontSize: 20,
    marginBottom: 15, // 동일한 간격 적용
    fontFamily: 'Medium',
  },
  input: {
    width: '100%',
    height: 55, // 동일한 높이
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#F8F8F8',
    marginBottom: 15, // 동일한 간격
    fontFamily: 'Medium',
    fontSize: 16,
  },
  QText: {
    fontSize: 20,
    fontFamily: 'Bold',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Medium',
    marginBottom: 30,
    alignSelf: 'flex-start',
  },
  micContainer: {
    width: '100%', 
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:5,
    marginBottom:15
  },
  pulseCircle: {
    position: 'absolute',
    width: '102%', // 마이크 버튼과 동일한 크기
    height: 85,
    borderRadius: 100,
    backgroundColor: 'rgba(61, 178, 255, 0.3)', // 반투명한 효과
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
    marginBottom: 15,
  },
});
