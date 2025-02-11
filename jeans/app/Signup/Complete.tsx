import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function CompleteSignupScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입이 완료되었습니다!</Text>
      <Text style={styles.checkmark}>✅</Text>

      {/* 홈 화면 또는 로그인 화면으로 이동 */}
      <TouchableOpacity 
        style={styles.signupButton} 
        onPress={() => console.log('다음 버튼 클릭됨')}> {/* 홈 화면으로 이동 */}
        <Text style={styles.signupText}>홈으로</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  checkmark: {
    fontSize: 50,
    marginBottom: 40,
  },
  signupButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#008DBF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  signupText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
