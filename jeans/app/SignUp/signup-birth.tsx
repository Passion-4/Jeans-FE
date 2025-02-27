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
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import styles from './signup-st';
import * as Speech from "expo-speech"; 

export default function SignupBirth() {
  const router = useRouter();
  const { signupData, updateSignupData } = useSignup();
  const inputRef = useRef<TextInput>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [birthday, setBirthday] = useState(signupData.birthday || '');
  const pulseAnimation = useRef(new Animated.Value(1)).current;
  const recordingRef = useRef<Audio.Recording | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (isRecording) {
      startPulseAnimation();
    } else {
      pulseAnimation.setValue(1);
    }
  }, [isRecording]);

  useEffect(() => {
    // 🔹 WebSocket 연결
    connectWebSocket();

    return () => {
      disconnectWebSocket();
    };
  }, []);

  useEffect(() => {
      const voiceType = signupData.voiceType;
      if (voiceType === 1) {
        Speech.speak("생년월일을 숫자로 말해주세요.", {
          language: "ko-KR",
          pitch: 0.4, // 남성 목소리
          rate: 1.0,
        });
      } else if (voiceType === 2) {
        Speech.speak("생년월일을 숫자로 말해주세요.", {
          language: "ko-KR",
          pitch: 1.3, // 여성 목소리
          rate: 1.0,
        });
      }
    }, []);
    

  // 🔹 WebSocket 연결
  const connectWebSocket = () => {
    wsRef.current = new WebSocket('wss://api.passion4-jeans-ai.store/api/ws-text');

    wsRef.current.onopen = () => {
      console.log('✅ WebSocket 연결 완료');
    };

    wsRef.current.onmessage = (event) => {
      console.log('📩 WebSocket 메시지 수신:', event.data);
      setBirthday(convertKoreanNumbersToDigits(event.data)); // 생년월일 자동 변환
    };

    wsRef.current.onerror = (error) => {
      console.error('❌ WebSocket 오류:', error);
    };

    wsRef.current.onclose = () => {
      console.log('🔌 WebSocket 연결 종료됨');
    };
  };

  // 🔹 WebSocket 연결 해제
  const disconnectWebSocket = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  };

  // 🔹 한글 숫자를 숫자로 변환하는 함수
  const convertKoreanNumbersToDigits = (text: string) => {
    const numberMap: { [key: string]: string } = {
      '공': '0', '영': '0',
      '일': '1', '이': '2', '삼': '3',
      '사': '4', '오': '5', '육': '6',
      '칠': '7', '팔': '8', '구': '9'
    };

    return text.split('').map((char) => numberMap[char] || char).join('');
  };

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

  // 마이크 버튼 눌렀을 때 녹음 시작 & 중지
  const handleMicPress = async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  };

  // 음성 녹음 시작
  const startRecording = async () => {
    try {
      console.log('🔹 마이크 권한 요청 중...');
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        alert('마이크 권한이 필요합니다.');
        return;
      }

      console.log('🎙️ 녹음 시작');
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await recording.startAsync();
      recordingRef.current = recording;

      setIsRecording(true);
      inputRef.current?.focus();
    } catch (err) {
      console.error('녹음 시작 실패:', err);
    }
  };

  // 녹음 중지 및 WebSocket으로 전송
  const stopRecording = async () => {
    if (!recordingRef.current) return;

    console.log('🛑 녹음 중지');
    setIsRecording(false);
    await recordingRef.current.stopAndUnloadAsync();
    const uri = recordingRef.current.getURI();
    recordingRef.current = null;

    if (uri) {
      console.log('📤 WebSocket으로 오디오 전송 중...', uri);
      await sendAudioToWebSocket(uri);
    }
  };

  // 🔹 WebSocket을 통해 음성 파일 전송
  const sendAudioToWebSocket = async (audioUri: string) => {
    try {
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        console.error('❌ WebSocket이 열려있지 않음.');
        return;
      }

      // 🔹 바이너리 데이터로 파일 읽기
      const fileData = await FileSystem.readAsStringAsync(audioUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      if (!fileData) {
        console.error('❌ 오디오 파일을 읽을 수 없음.');
        return;
      }

      // 🔹 Base64를 Uint8Array로 변환 (바이너리로 복원)
      const binaryData = Uint8Array.from(atob(fileData), (c) => c.charCodeAt(0));

      // 🔹 WebSocket을 통해 바이너리 데이터 전송
      wsRef.current.send(binaryData);
      console.log('🚀 WebSocket으로 바이너리 오디오 데이터 전송 완료!');
    } catch (error) {
      console.error('❌ WebSocket 오디오 전송 오류:', error);
    }
  };

  // 🔹 다음 버튼 눌렀을 때 실행
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
        placeholder="예: 500101"
        keyboardType="numeric"
        maxLength={6}
        value={birthday}
        onChangeText={setBirthday}
      />

      {/* 🔹 음성 버튼 */}
      <TouchableOpacity style={{ width: '100%' }} onPress={handleMicPress} activeOpacity={0.8}>
        <View style={styles.micContainer}>
          {isRecording && (
            <Animated.View style={[styles.pulseCircle, { transform: [{ scale: pulseAnimation }] }]} />
          )}
          <View style={styles.recordButton}>
            <Ionicons name="mic" size={25} color="white" />
            <Text style={styles.recordButtonText}>
              {isRecording ? '듣는 중...' : '생년월일을 말해주세요'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <FullButton title="다 음" onPress={handleNext} />
    </View>
  );
}
