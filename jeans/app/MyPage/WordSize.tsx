import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';

export default function FontSizeAdjustmentScreen() {
  const [fontSize, setFontSize] = useState(16); // 기본 글씨 크기
  const router = useRouter();

  const increaseFontSize = () => setFontSize((prev) => Math.min(prev + 2, 30)); // 최대 30까지 증가
  const decreaseFontSize = () => setFontSize((prev) => Math.max(prev - 2, 10)); // 최소 10까지 감소

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* 타이틀 */}
      <Text style={styles.title}>글씨 크기 조정</Text>

      {/* 미리보기 텍스트 */}
      <View style={styles.previewContainer}>
        <Text style={[styles.previewText, { fontSize }]}>이것은 미리보기 글씨입니다.</Text>
      </View>

      {/* 버튼 컨테이너 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={decreaseFontSize}>
          <Text style={styles.buttonText}>- 작게</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={increaseFontSize}>
          <Text style={styles.buttonText}>+ 크게</Text>
        </TouchableOpacity>
      </View>

      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  previewContainer: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 10,
  },
  previewText: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    backgroundColor: '#008DBF',
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

