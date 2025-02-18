import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import FullButton from '../components/FullButton';

export default function LoginScreen() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>환영합니다!</Text>

      <Text style={styles.label}>전화번호</Text>
      <TextInput 
        style={styles.input} 
        placeholder="전화번호를 입력하세요."
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
      </View>

      <FullButton title="로그인" onPress={() => router.push('/Set/photo-selection0')} />

      <TouchableOpacity onPress={() => router.push('/FindAccount/find-account')}>
        <Text style={styles.forgotPassword}>아이디와 비밀번호를 잊으셨나요?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/SignUp/signup-name')}>
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
    fontSize: 35,
    marginBottom: 30, 
    fontFamily: 'Bold',
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 5,
    fontSize: 20,
    marginBottom: 8, 
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
    fontSize:18
  },
  passwordContainer: {
    width: '100%', // FullButton과 동일한 너비 설정
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20, 
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
  },
  forgotPassword: {
    color: '#888888',
    fontSize: 20,
    marginTop: 5,
    marginBottom: 20, 
    fontFamily: 'Medium',
    textDecorationLine: 'underline',
  },
  signup: {
    color: '#008DBF',
    fontSize: 20,
    marginTop: 5,
    fontFamily: 'Bold',
  },
});
