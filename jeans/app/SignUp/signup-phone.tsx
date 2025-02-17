import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import FullButton from '@/components/FullButton';

export default function SignupScreen() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
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
        placeholder="01012345678 형태로 입력해주세요."
        keyboardType="numeric"
        value={phone}
        onChangeText={(text) => setPhone(formatPhoneNumber(text))}
        maxLength={13} // 13자리 (하이픈 포함)
        placeholderTextColor="#5E6365"  
      />

      {/* 안내 문구 추가 */}
      <Text style={styles.infoText}> * 입력하신 전화번호는 아이디로 사용됩니다.</Text>

      <FullButton title='다 음' onPress={() => router.push('/SignUp/signup-password')}></FullButton>


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
    fontFamily :'Bold'
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 5,
    fontSize: 20,
    marginTop: 10,
    marginBottom: 20,
    fontFamily:'Medium'
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
    fontSize:16,
  },
  backToLogin: {
    color: '#888888',
    fontSize: 17,
    marginTop: 17,
  },
  infoText: {
    fontSize: 15,
    color: '#3DB2FF',
    fontFamily: 'Medium',
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
});

