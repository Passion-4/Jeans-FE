import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import FullButton from '@/components/FullButton';

export default function FriendSearchScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

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

      <FullButton 
        title='검 색' 
        onPress={() => router.push({ pathname: '/Friend/send-search-result', params: { name, phone } })}
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
