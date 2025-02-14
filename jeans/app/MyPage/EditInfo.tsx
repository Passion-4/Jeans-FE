import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import { Ionicons } from '@expo/vector-icons';

export default function MyPageScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* 설정 목록 */}
      <View style={styles.settingContainer}>
        <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/Profile/name')}>
          <Text style={styles.settingText}>이 름</Text>
          <Ionicons name="chevron-forward" size={18} color="#777" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/Profile/phonenum')}>
          <Text style={styles.settingText}>전화번호 바꾸기</Text>
          <Ionicons name="chevron-forward" size={18} color="#777" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/Profile/image')}>
          <Text style={styles.settingText}>프로필 사진 바꾸기</Text>
          <Ionicons name="chevron-forward" size={18} color="#777" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/Profile/password')}>
          <Text style={styles.settingText}>비밀 번호 바꾸기</Text>
          <Ionicons name="chevron-forward" size={18} color="#777" />
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
    paddingBottom: 20,
    paddingTop: 220, // 전체적으로 내림
  },
  settingContainer: {
    marginTop: 50, // 목록을 내리기 위해 marginTop 조정
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 50
  },
  settingText: {
    fontSize: 22,
    color: '#333',
  },
});
