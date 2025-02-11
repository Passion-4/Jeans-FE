import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function PhotoSelectionIntroScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>사진 선택 안내</Text>
      <Text style={styles.description}>
        지금부터 화면에 보이는 두 개의 사진 중
        마음에 드는 사진을 클릭하세요.
      </Text>

      {/* 다음 버튼 - 첫 번째 사진 선택 화면으로 이동 */}
      <TouchableOpacity 
        style={styles.nextButton} 
        onPress={() => router.push('/Firsttime/PhotoSelection1')}>
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
    marginBottom: 40,
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
