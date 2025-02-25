import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'; // ✅ 토큰 사용
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import FullButton from '@/components/FullButton';

export default function FriendSearchScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!name.trim() || !phone.trim()) {
      Alert.alert('입력 오류', '이름과 전화번호를 입력하세요.');
      return;
    }

    setLoading(true);
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        Alert.alert('오류', '로그인이 필요합니다.');
        return;
      }

      const response = await fetch(`https://api.passion4-jeans.store/members/search?name=${name}&phone=${phone}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      

      const data = await response.json();
      console.log('검색 결과:', data);

      if (!response.ok || !data.memberId) {
        Alert.alert('검색 실패', '일치하는 사용자가 없습니다.');
        return;
      }

      // ✅ 검색된 사용자 정보를 결과 페이지로 전달
      router.push({ pathname: '/Friend/send-search-result', params: { memberId: data.memberId, name: data.name } });
    } catch (error) {
      Alert.alert('오류', '검색 중 문제가 발생했습니다.');
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
        placeholder="친구의 이름을 입력하세요."
        placeholderTextColor="#5E6365"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>전화번호</Text>
      <TextInput
        style={styles.input}
        placeholder="친구의 전화번호를 입력하세요."
        placeholderTextColor="#5E6365"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

<FullButton 
  title="검 색" 
  onPress={handleSearch} 
  loading={loading} 
/>

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
  }
});
