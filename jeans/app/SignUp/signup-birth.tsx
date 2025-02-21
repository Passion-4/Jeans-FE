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

export default function SignupBirth() {
  const router = useRouter();
  const { signupData, updateSignupData } = useSignup();
  const inputRef = useRef<TextInput>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [birthday, setBirthday] = useState(signupData.birthday || '');
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

  // 🔹 다음 버튼 동작
  const handleNext = () => {
    if (!birthday.trim() || birthday.length !== 6) {
      alert('올바른 생년월일을 입력해주세요. (예: 200101)');
      return;
    }
    updateSignupData('birthday', birthday);
    router.push('/SignUp/signup-phone');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>

      <Text style={styles.label}>생년월일</Text>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="예: 200101"
        keyboardType="numeric"
        maxLength={6}
        value={birthday}
        onChangeText={setBirthday}
      />

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
            <Text style={styles.recordButtonText}>생년월일을 말해보세요</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* 음성 안내 문구 */}
      <View style={{ minHeight: 25 }}>
        <Text style={[styles.recordingNotice, { opacity: isRecording ? 1 : 0 }]}>
          다시 누르면 음성이 멈춥니다.
        </Text>
      </View>

      <FullButton title="다 음" onPress={handleNext} />
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
    marginBottom: 20,
    fontFamily: 'Medium',
    fontSize: 18,
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
