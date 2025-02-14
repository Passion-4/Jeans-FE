import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';

export default function FriendNicknameScreen() {
  const router = useRouter();
  const [nickname, setNickname] = useState('');

  // 별명 생성 버튼 클릭 핸들러
  const handleCreateNickname = () => {
    if (nickname.trim()) {
      // 별명 저장 로직 추가 가능
      router.push('/Friend/relation_complete'); 
    }
  };

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* 타이틀 */}
      <Text style={styles.title}>별명을 입력해주세요</Text>

      {/* 별명 입력 필드 */}
      <TextInput
        style={styles.input}
        placeholder="예: 준용이형, 김과장님"
        placeholderTextColor="#999"
        value={nickname}
        onChangeText={setNickname}
      />

      {/* 만들기 버튼 */}
      <TouchableOpacity
        style={[styles.createButton, !nickname.trim() && styles.disabledButton]}
        onPress={handleCreateNickname}
        disabled={!nickname.trim()}
      >
        <Text style={styles.createText}>만들기</Text>
      </TouchableOpacity>

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
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#008DBF',
    fontSize: 20,
    marginBottom: 40,
    paddingHorizontal: 5,
    textAlign: 'left',
  },
  createButton: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#008DBF',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#B0BEC5',
  },
  createText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
