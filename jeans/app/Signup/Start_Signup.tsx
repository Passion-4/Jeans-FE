import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function SignupScreen() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>

      <Text style={styles.label}>이름</Text>
      <TextInput style={styles.input} placeholder="이름을 입력하세요." />

      {/* 다음 버튼 - BirthInput.tsx로 이동 */}
      <TouchableOpacity style={styles.signupButton} onPress={() => router.push('/Signup/Birth_Signup')}>
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
    fontFamily :'Bold'
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
    fontSize:17
  },
  signupButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#008DBF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    marginBottom:170
  },
  signupText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily:'Medium'
  },
  backToLogin: {
    color: '#888888',
    fontSize: 17,
    marginTop: 17,
  },
});
