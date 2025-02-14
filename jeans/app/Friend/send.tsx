import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';

export default function FriendSearchScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* 타이틀 */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>친구 검색</Text>
      </View>

      {/* 입력 필드 */}
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

      {/* 검색 버튼 */}
      <TouchableOpacity 
        style={styles.searchButton} 
        onPress={() => router.push({ pathname: '/Friend/send_searchresult', params: { name, phone } })}
      >
        <Text style={styles.searchText}>검색</Text>
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
  titleContainer: {
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 30,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 5,
    fontSize: 17,
    marginTop: 10,
    marginBottom: 7,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#F8F8F8',
    fontSize: 17,
  },
  searchButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#008DBF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 30,
    marginBottom: 120,
  },
  searchText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
