import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import FullButton from '@/components/FullButton';

export default function AccountDeleteScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [customReason, setCustomReason] = useState('');

  // 탈퇴 이유 목록
  const reasons = [
    '서비스를 잘 이용하지 않아요',
    '디자인이 마음에 들지 않아요',
    '서비스 가격이 높아요',

    '이 서비스보다 더 좋은 서비스가 있어요',
    '기타', // 기타 옵션 추가
  ];

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* 제목 */}
      <Text style={styles.title}>회원 탈퇴</Text>

      {/* 설명 */}
      <Text style={styles.description}>
        서비스를 이용해 주셔서 감사합니다.{'\n'}
        불편한 점이 있었다면 알려주세요.
      </Text>

      {/* 탈퇴 이유 선택 */}
      <View style={styles.reasonContainer}>
        {reasons.map((reason, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.reasonButton,
              selectedReason === reason && styles.selectedReasonButton,
            ]}
            onPress={() => {
              setSelectedReason(reason);
              if (reason !== '기타') setCustomReason(''); // 기타가 아닌 경우 입력 초기화
            }}
          >
            <Text style={styles.reasonText}>{reason}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* '기타' 선택 시 텍스트 입력창 표시 */}
      {selectedReason === '기타' && (
        <TextInput
          style={styles.input}
          placeholder="탈퇴 이유를 입력하세요."
          value={customReason}
          onChangeText={setCustomReason}
        />
      )}

      {/* 탈퇴하기 버튼 */}
      <TouchableOpacity
        style={[
          styles.deleteButton,
          !selectedReason && styles.disabledButton, // 이유 선택 안 하면 비활성화
        ]}
        onPress={() => selectedReason && setModalVisible(true)}
        disabled={!selectedReason}
      >
        <Text style={styles.deleteText}>탈퇴하기</Text>
      </TouchableOpacity>

      <BottomNavBar />

      {/* 탈퇴 확인 모달 */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              탈퇴 시 친구들과 추억은 소멸되며,{'\n'}
              30일 이내 재가입이 불가능합니다.{'\n'}
              단, 같은 전화번호로 재가입이 가능합니다.{'\n\n'}
              탈퇴하시겠습니까?
            </Text>

            {/* 버튼 그룹 */}
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>취소</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => {
                  setModalVisible(false); // 모달 닫기
                  setTimeout(() => router.push('/explore'), 300); // 0.3초 후 이동
                }}
              >
                <Text style={styles.modalButtonText}>확인</Text>
              </TouchableOpacity>
            </View>
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
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 35,
    fontFamily:'Bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 80
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
    marginBottom: 30,
    fontFamily:'Medium',
  },
  reasonContainer: {
    marginBottom: 30,
  },
  reasonButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  selectedReasonButton: {
    backgroundColor: '#CCCCCC',
    borderRadius:10,
  },
  reasonText: {
    fontSize: 18,
    color: '#333',
    fontFamily:'Medium',
    marginLeft:5
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#F8F8F8',
    fontSize: 16,
    marginBottom: 20,
  },
  deleteButton: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#008DBF', // 파란색 유지
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#B0BEC5',
  },
  deleteText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#CCCCCC',
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 10,
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#008DBF', // 기존 스타일 유지
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
