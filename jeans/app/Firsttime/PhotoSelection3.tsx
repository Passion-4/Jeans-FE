import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function PhotoSelectionCompleteScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>사진 선택이 완료되었습니다!</Text>
      <Text style={styles.checkmark}>✅</Text>

      {/* 완료 버튼 - 홈 화면 또는 다음 단계로 이동 */}
      <TouchableOpacity 
        style={styles.completeButton} 
        onPress={() => router.push('/(tabs)/explore')}>
        <Text style={styles.completeText}>완료</Text>
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
  completeButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#008DBF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  completeText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
