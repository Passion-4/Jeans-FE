import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import useSelectedFriends from '../../hooks/useSelectedFriends';

export default function ShareMakeGroupScreen() {
  const router = useRouter();
  const { selectedFriends } = useSelectedFriends(); // ✅ 선택된 친구 목록 가져오기
  const [groupName, setGroupName] = useState('');
  const [loading, setLoading] = useState(false);

  // 🔹 그룹 생성 API 호출
  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      Alert.alert('오류', '그룹 이름을 입력해주세요.');
      return;
    }

    if (selectedFriends.length === 0) {
      Alert.alert('오류', '그룹 멤버를 선택해주세요.');
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) {
        Alert.alert('로그인이 필요합니다.');
        setLoading(false);
        return;
      }

      // ✅ 선택된 친구들의 `memberId` 리스트 추출
      const memberList = selectedFriends
        .filter((friend) => 'memberId' in friend)
        .map((friend) => friend.memberId);

      const requestBody = JSON.stringify({
        name: groupName,
        memberList: memberList,
      });

      console.log('🚀 그룹 생성 API 요청:', requestBody);

      const response = await fetch('https://api.passion4-jeans.store/team', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });

      console.log('🔹 그룹 생성 응답 상태 코드:', response.status);

      if (response.status === 201) {
        console.log('✅ 그룹 생성 성공!');
        Alert.alert('성공', '그룹이 성공적으로 생성되었습니다.');

        // ✅ 그룹 생성 완료 후 완료 페이지로 이동
        router.push('/Share/share-make-group-complete');
      } else {
        throw new Error(`그룹 생성 실패 (${response.status})`);
      }
    } catch (error) {
      console.error('❌ 그룹 생성 실패:', error);
      Alert.alert('오류', error instanceof Error ? error.message : '그룹 생성 중 문제가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* 타이틀 */}
      <Text style={styles.title}>그룹 이름을 {'\n'}설정해주세요.</Text>

      {/* 그룹 이름 입력 필드 */}
      <TextInput
        style={styles.input}
        placeholder="그룹 이름"
        placeholderTextColor="#999"
        value={groupName}
        onChangeText={setGroupName}
      />

      {/* 만들기 버튼 */}
      {loading ? (
        <ActivityIndicator size="large" color="#008DBF" style={{ marginTop: 20 }} />
      ) : (
        <TouchableOpacity
          style={[styles.createButton, !groupName.trim() && styles.disabledButton]}
          onPress={handleCreateGroup}
          disabled={!groupName.trim()}
        >
          <Text style={styles.createText}>만들기</Text>
        </TouchableOpacity>
      )}

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
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 60,
    fontFamily: 'Bold',
  },
  input: {
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    fontSize: 20,
    marginBottom: 40,
    textAlign: 'left',
    paddingHorizontal: 5,
  },
  createButton: {
    width: '100%',
    paddingVertical: 20,
    backgroundColor: '#008DBF',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
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
