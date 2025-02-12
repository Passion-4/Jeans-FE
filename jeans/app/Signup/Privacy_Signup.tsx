import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function PrivacySignupScreen() {
  const router = useRouter();
  const [isAgreed1, setIsAgreed1] = useState(false);
  const [isAgreed2, setIsAgreed2] = useState(false);
  const [isAgreed3, setIsAgreed3] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <Text style={styles.label}>개인정보 수집·이용 동의</Text>

      <View style={styles.switchContainer}>
        <Text>동의항목 1</Text>
        <Switch value={isAgreed1} onValueChange={setIsAgreed1} />
      </View>

      <View style={styles.switchContainer}>
        <Text>동의항목 2</Text>
        <Switch value={isAgreed2} onValueChange={setIsAgreed2} />
      </View>

      <View style={styles.switchContainer}>
        <Text>동의항목 3</Text>
        <Switch value={isAgreed3} onValueChange={setIsAgreed3} />
      </View>

      {/* 다음 버튼 - 회원가입 완료 화면으로 이동 */}
      <TouchableOpacity 
        style={styles.signupButton} 
        onPress={() => router.push('/Signup/Complete')}>
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
    marginBottom: 40,
    fontFamily:'Bold'
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 5,
    fontSize: 20,
    marginBottom: 15,
    fontFamily:'Medium'
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  signupButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#008DBF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 40,
  },
  signupText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily:'Medium'
  },
});
