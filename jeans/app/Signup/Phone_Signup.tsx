import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function PhoneInputScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState('');

  // 전화번호 자동 하이픈 추가 함수
  const formatPhoneNumber = (text: string) => {
    // 숫자만 남기기
    let cleaned = text.replace(/[^0-9]/g, '');

    // 최대 11자리까지만 입력 가능
    if (cleaned.length > 11) {
      cleaned = cleaned.slice(0, 11);
    }

    // 전화번호 형식 적용 (010-1234-5678)
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 7) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    } else {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>

      <Text style={styles.label}>전화번호</Text>
      <TextInput
        style={styles.input}
        placeholder="010-1234-5678 형태로 입력해주세요."
        keyboardType="numeric"
        value={phone}
        onChangeText={(text) => setPhone(formatPhoneNumber(text))}
        maxLength={13} // 13자리 (하이픈 포함)
      />

      {/* 안내 문구 추가 */}
      <Text style={styles.infoText}> * 입력하신 전화번호는 아이디로 사용됩니다.</Text>

      {/* 다음 버튼 - ID 입력 화면으로 이동 */}
      <TouchableOpacity style={styles.signupButton} onPress={() => router.push('/Signup/Pass_Signup')}>
        <Text style={styles.signupText}>다음</Text>
      </TouchableOpacity>
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
    fontWeight: 'bold',
    marginBottom: 60,
    fontFamily: 'Bold',
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 5,
    fontSize: 20,
    marginTop: 10,
    marginBottom: 7,
    fontFamily: 'Medium',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#F8F8F8',
    marginTop: 5,
    fontFamily: 'Light',
    fontSize: 17,
  },
  infoText: {
    fontSize: 17,
    color: '#F18308',
    fontFamily: 'Medium',
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  signupButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#008DBF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 170,
  },
  signupText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: 'Medium',
  },
});
