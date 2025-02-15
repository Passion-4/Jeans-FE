import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import FullButton from '@/components/FullButton';

export default function PasswordSignupScreen() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>새로운 비밀번호 설정</Text>

      <Text style={styles.label}>비밀번호</Text>
      <TextInput 
        style={styles.input} 
        placeholder="비밀번호를 입력하세요." 
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Text style={styles.infoText}> * 비밀번호 생성 시 영어와 {'\n'} 숫자를 반드시 포함해주세요.</Text>
            
      

      <Text style={styles.label}>비밀번호 확인</Text>
      <TextInput 
        style={styles.input} 
        placeholder="비밀번호를 다시 입력하세요." 
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <FullButton title='다 음' onPress={() => router.push('/Profile/password_complete')}></FullButton>
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
  infoText: {
    fontSize: 17,
    color: '#F18308',
    fontFamily: 'Medium',
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 35,
    marginBottom: 20,
    fontFamily:'Bold',
    marginTop:50
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 5,
    fontSize: 20,
    marginTop: 10,
    marginBottom: 7,
    fontFamily:'Medium'
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
    fontFamily:'Light',
    fontSize:17,
    marginBottom:15
  },
});
