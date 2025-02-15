import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import FullButton from '../../components/FullButton';

export default function FindAccountScreen() {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [foundPassword, setFoundPassword] = useState('1234abcd'); // 예시 비밀번호

  // 찾기 버튼 클릭 시
  const handleFindPassword = () => {
    // 이 부분에서 실제 서버 요청 후 비밀번호 결과를 받아오는 로직 추가 가능
    setIsModalVisible(true); // 모달 표시
  };

  return (
    <View style={styles.container}>
      {/* 타이틀 */}
      <Text style={styles.title}>비밀번호 찾기</Text>

      {/* 생년월일 입력 */}
      <Text style={styles.label}>생년월일 입력</Text>
      <TextInput
        style={styles.input}
        placeholder="가입 시 입력한 생년월일"
        placeholderTextColor="#5E6365"
      />

      {/* 전화번호 입력 */}
      <Text style={styles.label}>전화번호 입력</Text>
      <TextInput
        style={styles.input}
        placeholder="가입 시 사용한 전화번호"
        placeholderTextColor="#5E6365"
        keyboardType="phone-pad"
      />

      {/* 찾기 버튼 */}
      <FullButton title="찾 기" onPress={handleFindPassword} />

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
            <Text style={styles.modalText}>김덕배님의 비밀번호는:</Text>
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
  },
  label: {
    alignSelf: 'flex-start',
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
    fontFamily: 'Light',
    fontSize: 15,
  },

  /** ✅ 모달 스타일 */
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
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
    fontSize: 22,
    fontFamily: 'Bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    fontFamily: 'Medium',
    color: '#555',
    marginBottom: 5,
  },
  passwordText: {
    fontSize: 24,
    fontFamily: 'Bold',
    color: '#008DBF',
    marginBottom: 20,
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
