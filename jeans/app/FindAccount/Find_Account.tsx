import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import FullButton from '../../components/FullButton';

export default function FindAccountScreen() {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [receivedOtp, setReceivedOtp] = useState('123456'); // 예시 인증번호
  const [foundPassword, setFoundPassword] = useState('1234abcd'); // 예시 비밀번호

  // 📲 인증번호 요청
  const handleSendOtp = () => {
    if (!/^010\d{8}$/.test(phone)) {
      Alert.alert('오류', '유효한 전화번호를 입력하세요.');
      return;
    }
    setIsOtpVisible(true);
    Alert.alert('인증번호 전송', `${phone} 번호로 인증번호가 전송되었습니다.`);
  };

  // 인증번호 확인
  const handleVerifyOtp = () => {
    if (otp === receivedOtp) {
      Alert.alert('인증 성공', '인증번호가 확인되었습니다.');
      setIsModalVisible(true); // 비밀번호 확인 모달 표시
    } else {
      Alert.alert('인증 실패', '인증번호가 일치하지 않습니다.');
    }
  };

  return (
    <View style={styles.container}>
      {/* 타이틀 */}
      <Text style={styles.title}>비밀번호 찾기</Text>

      {/* 생년월일 입력 */}
      <Text style={styles.label}>생년월일 입력</Text>
      <TextInput
        style={styles.input}
        placeholder="주민번호 앞자리"
        placeholderTextColor="#5E6365"
        keyboardType="number-pad"
        maxLength={8}
      />

      {/* 전화번호 입력 */}
      <Text style={styles.label}>전화번호 입력</Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="01012345678"
          placeholderTextColor="#5E6365"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendOtp}>
          <Text style={styles.sendButtonText}>전송</Text>
        </TouchableOpacity>
      </View>

      {/* 인증번호 입력칸 */}
      {isOtpVisible && (
        <>
          <Text style={styles.label}>인증번호 입력</Text>
          <TextInput
            style={styles.input}
            placeholder="6자리 인증번호"
            placeholderTextColor="#5E6365"
            keyboardType="number-pad"
            maxLength={6}
            value={otp}
            onChangeText={setOtp}
          />
          <FullButton title="인증 확인" onPress={handleVerifyOtp} />
        </>
      )}

      {/* 비밀번호 표시 모달 */}
      <Modal
        transparent
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>🔑 비밀번호 확인</Text>
            <Text style={styles.modalText}>회원님의 비밀번호는:</Text>
            <Text style={styles.passwordText}>{foundPassword}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>확 인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    marginTop:-150
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 20,
    marginBottom: 10,
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
    marginBottom: 15,
    fontFamily: 'Medium',
    fontSize: 17,
  },
  /** 전화번호 & 전송 버튼 */
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sendButton: {
    height: 55,
    width: 100,
    backgroundColor: '#008DBF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 10,
    marginBottom:16
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Medium',
  },

  /** ✅ 모달 스타일 */
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 280,
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 25,
    fontFamily: 'Bold',
    marginBottom: 5,
  },
  modalText: {
    fontSize: 20,
    fontFamily: 'Medium',
    color: '#555',
    marginBottom: 20,
  },
  passwordText: {
    fontSize: 24,
    fontFamily: 'Bold',
    color: '#008DBF',
    marginBottom: 25,
  },
  closeButton: {
    backgroundColor: '#008DBF',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: 'Medium',
  },
});
