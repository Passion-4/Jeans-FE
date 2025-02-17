import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import FullButton from '@/components/FullButton';

export default function LoginScreen() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>비밀번호 바꾸기</Text>

      <Text style={styles.label}>기존 비밀번호</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="기존 비밀번호를 입력하세요."
          placeholderTextColor="#5E6365" 
          secureTextEntry={!passwordVisible}
        />
      </View>

      <FullButton title='확 인' onPress={() => router.push('/ChangePassword/new-password')}></FullButton>

      <TouchableOpacity onPress={() => router.push('/FindAccount/find-account')}>
        <Text style={styles.forgotPassword}>아이디와 비밀번호를 잊으셨나요?</Text>
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
    marginBottom: 30,
    fontFamily: 'Bold',
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 5,
    fontSize: 20,
    marginTop: 10,
    marginBottom: 15,
    fontFamily: 'Medium'
  },
  input: {
    width: '100%', // FullButton과 크기 맞추기
    height: 55, // FullButton과 동일한 높이로 설정
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 10, // FullButton의 borderRadius와 동일하게 설정
    paddingHorizontal: 15,
    backgroundColor: '#F8F8F8',
    marginBottom: 15, // 간격 동일하게 설정
    fontFamily: 'Light',
    fontSize:15
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#008DBF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: 'Medium',
  },
  forgotPassword: {
    color: '#888888',
    fontSize: 17,
    marginTop: 17,
    marginBottom: 10,
    fontFamily: 'Medium',
    textDecorationLine: 'underline', // 밑줄 추가
  },
  signup: {
    color: '#008DBF',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 5,
    fontFamily: 'Bold'
  },
});
