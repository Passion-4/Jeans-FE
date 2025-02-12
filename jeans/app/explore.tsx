import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>환영합니다!</Text>

      <Text style={styles.label}>아이디</Text>
      <TextInput 
        style={styles.input} 
        placeholder="아이디를 입력하세요."
        placeholderTextColor="#5E6365"  
      />

      <Text style={styles.label}>비밀번호</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="비밀번호를 입력하세요."
          placeholderTextColor="#5E6365" 
          secureTextEntry={!passwordVisible}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eyeIcon}>
          <Text>{passwordVisible ? '👁️' : '🙈'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/Set/PhotoSelection0')}>
        <Text style={styles.loginText}>로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/FindAccount/Find_Account')}>
        <Text style={styles.forgotPassword}>아이디와 비밀번호를 잊으셨나요?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/Signup/Start_Signup')}>
        <Text style={styles.signup}>회원가입</Text>
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
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Bold',
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 5,
    fontSize: 17,
    marginTop: 10,
    marginBottom: 7,
    fontFamily: 'Medium'
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
