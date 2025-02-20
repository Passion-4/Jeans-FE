import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import FullButton from '../../components/FullButton';
import CheckAnimation from '@/components/CheckAnimation';

export default function PhotoSelectionCompleteScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 타이틀 */}
      <Text style={styles.title}>사진 선택이 {'\n'}완료되었습니다!</Text>
      <CheckAnimation />
      {/* 완료 버튼 */}
      <FullButton title="완 료" onPress={() => router.push('/Home/main-page')} />
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
    fontFamily: 'Bold',
    textAlign: 'center',
    marginBottom: 10,
  },
});
