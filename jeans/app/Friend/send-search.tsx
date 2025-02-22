import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import FullButton from '@/components/FullButton';

export default function FriendSearchScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  // 🔹 친구 검색 API 요청
  const searchFriend = async () => {
    if (!name.trim() || !phone.trim()) {
      Alert.alert('입력 오류', '이름과 전화번호를 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      // ✅ accessToken 가져오기
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) {
        Alert.alert('오류', '로그인이 필요합니다.');
        return;
      }

      // ✅ API 요청
      const response = await fetch(
        `https://api.passion4-jeans.store/members/search?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('🔹 API 응답 상태 코드:', response.status);
      const responseData = await response.json();
      console.log('🔹 API 응답 데이터:', responseData);

      if (!response.ok) {
        throw new Error(`검색 실패 (${response.status})`);
      }

      // ✅ 검색 결과 페이지로 이동
      router.push({
        pathname: '/Friend/send-search-result',
        params: { memberId: responseData.memberId, name: responseData.name, profileUrl: responseData.profileUrl },
      });
    } catch (error) {
      console.error('❌ API 요청 실패:', error);
      Alert.alert('오류', error instanceof Error ? error.message : '알 수 없는 오류 발생');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TopNavBar />
      <Text style={styles.title}>친구 검색</Text>

      <Text style={styles.label}>이름</Text>
      <TextInput
        style={styles.input}
        placeholder="이름을 입력하세요."
        placeholderTextColor="#5E6365"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>전화번호</Text>
      <TextInput
        style={styles.input}
        placeholder="전화번호를 입력하세요."
        placeholderTextColor="#5E6365"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#008DBF" />
      ) : (
        <FullButton title="검 색" onPress={searchFriend} />
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
    fontSize: 35,
    marginBottom: 30,
    fontFamily: 'Bold',
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 5,
    fontSize: 20,
    marginBottom: 8,
    fontFamily: 'Medium',
  },
  input: {
    width: '100%',
    height: 55,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#F8F8F8',
    marginBottom: 15,
    fontFamily: 'Medium',
    fontSize: 18,
  },
});
