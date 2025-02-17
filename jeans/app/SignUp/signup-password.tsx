import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import FullButton from '@/components/FullButton';

export default function PasswordSignupScreen() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>

      <Text style={styles.label}>비밀번호</Text>
      <TextInput 
        style={styles.input} 
        placeholder="비밀번호를 입력하세요." 
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#5E6365"  
      />

      {/* 안내 문구 추가 */}
      <Text style={styles.infoText}>
        * 영어와 숫자를 반드시 포함해서 만들어주세요.
      </Text>

      <Text style={styles.label}>비밀번호 확인</Text>
      <TextInput 
        style={styles.input} 
        placeholder="비밀번호를 다시 입력하세요." 
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholderTextColor="#5E6365"  
      />

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
  infoText: {
    fontSize: 15,
    color: '#3DB2FF',
    fontFamily: 'Medium',
    marginBottom: 15,
    alignSelf: 'flex-start',
  },
});
