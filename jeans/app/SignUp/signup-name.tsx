import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import FullButton from '@/components/FullButton';
import { Ionicons } from '@expo/vector-icons';

export default function SignupScreen() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>

      <Text style={styles.label}>이름</Text>
      <TextInput 
              style={styles.input} 
              placeholder="이름을 입력하세요."
              placeholderTextColor="#5E6365"  
            />
        <TouchableOpacity style={styles.recordButton} >
          <Ionicons name="mic" size={25} color="white" />
          <Text style={styles.recordButtonText}>이름을 말해보세요</Text>
        </TouchableOpacity>
      <FullButton title='다 음' onPress={() => router.push('/SignUp/signup-birth')}></FullButton>
    
 
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
    marginBottom: 15,
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
    fontSize:18
  },
  recordButton: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: '#008DBF',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20
  },
  recordButtonText: {
    color: 'white',
    marginLeft: 10,
    fontFamily: 'Medium',
    fontSize: 20
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
