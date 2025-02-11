import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function PhoneInputScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>

      <Text style={styles.label}>전화번호</Text>
      <TextInput 
        style={styles.input} 
        placeholder="010-0000-0000" 
        keyboardType="phone-pad"
      />

      {/* 다음 버튼 - ID 입력 화면으로 이동 */}
      <TouchableOpacity 
        style={styles.signupButton} 
        onPress={() => router.push('/Signup/need')}>
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
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 60,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 5,
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 7,
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
    fontWeight: 'bold',
  },
});
