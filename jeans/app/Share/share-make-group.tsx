import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';

export default function ShareMakeGroupScreen() {
  const router = useRouter();
  const [groupName, setGroupName] = useState('');

  // 그룹 생성 버튼 클릭 핸들러
  const handleCreateGroup = () => {
    if (groupName.trim()) {
      // 이후 그룹 데이터를 저장하는 로직 추가 가능
      router.push('/Share/share-make-group-complete'); 
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
      <TouchableOpacity
        style={[styles.createButton, !groupName.trim() && styles.disabledButton]}
        onPress={handleCreateGroup}
        disabled={!groupName.trim()}
      >
        <Text style={styles.createText} >만들기</Text>
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
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 60,
    fontFamily:'Bold'
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
