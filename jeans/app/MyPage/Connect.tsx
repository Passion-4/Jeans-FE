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
        <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/Friend/list')}>
          <Text style={styles.settingText}>친구 목록</Text>
          <Ionicons name="chevron-forward" size={18} color="#777" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/Friend/send')}>
          <Text style={styles.settingText}>친구 요청 보내기</Text>
          <Ionicons name="chevron-forward" size={18} color="#777" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/Friend/receive')}>
          <Text style={styles.settingText}>친구 요청 받기</Text>
          <Ionicons name="chevron-forward" size={18} color="#777" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/Friend/delete')}>
          <Text style={styles.settingText}>친구 삭제</Text>
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
    fontSize: 18,
    color: '#333',
  },
});
