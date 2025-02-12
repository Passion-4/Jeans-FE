import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function FindAccountScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>비밀번호 찾기</Text>

      <Text style={styles.label}>생년월일 입력</Text>
      <TextInput 
      style={styles.input} 
      placeholder="가입시 입력한 생년월일을 입력하세요." 
      placeholderTextColor="#5E6365" />


      <Text style={styles.label}>전화번호 입력</Text>
      <TextInput style={styles.input} placeholder="가입시 사용한 전화번호를 입력하세요." placeholderTextColor="#5E6365" />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>찾기</Text>
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
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Bold',
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 5,
    fontSize: 17,
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
    marginBottom: 15,

  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#008DBF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: 'Medium',
  },
});
