import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import FullButton from '@/components/FullButton';

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
        <Text style={styles.context}>갤러리(사진, 미디어 접근 권한)</Text>
        <Switch value={isAgreed1} onValueChange={setIsAgreed1} />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.context}>마이크(음성 녹음 권한)</Text>
        <Switch value={isAgreed2} onValueChange={setIsAgreed2} />
      </View>

      <View style={styles.switchContainer}>
      <Text style={styles.context}>위치 정보</Text>
        <Switch value={isAgreed3} onValueChange={setIsAgreed3} />
      </View>

      <FullButton title='다 음' onPress={() => router.push('/SignUp/signup-complete')}></FullButton>
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
    marginLeft: 0,
    fontSize: 20,
    marginTop: 10,
    marginBottom: 40,
    fontFamily:'Medium',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    marginBottom:20
  },
  context: {
    fontSize: 18,
    marginBottom: 0,
    fontFamily:'Medium',
    color:"#5E6365"
  },
});
