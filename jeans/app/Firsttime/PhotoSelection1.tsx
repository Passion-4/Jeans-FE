import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function PhotoSelection2Screen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>선호하는 사진 선택</Text>
      <Text style={styles.description}>선호하는 사진을 클릭하세요.</Text>

      {/* 빈 사각형 영역 */}
      <View style={styles.emptyBox}></View>

      {/* 다음 버튼 - 사진 선택 완료 화면으로 이동 */}
      <TouchableOpacity 
        style={styles.nextButton} 
        onPress={() => router.push('/Firsttime/PhotoSelection2')}>
        <Text style={styles.nextText}>다음</Text>
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
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyBox: {
    width: 200,
    height: 200,
    backgroundColor: '#DDDDDD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  nextButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#008DBF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  nextText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
