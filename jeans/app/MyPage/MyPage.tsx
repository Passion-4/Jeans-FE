import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import { Ionicons } from '@expo/vector-icons';

export default function MyPageScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* 프로필 섹션 */}
      <View style={styles.profileContainer}>
        <Image source={require('../../assets/images/icon.png')} style={styles.profileImage} />
        <TouchableOpacity style={styles.editIcon} onPress={() => router.push('/MyPage/Profile')}>
          <Ionicons name="pencil" size={18} color="white" />
        </TouchableOpacity>
        <Text style={styles.userName}>김덕배</Text>
        <Text style={styles.userHandle}>@김덕배</Text>
      </View>

      {/* 설정 목록 */}
      <View style={styles.settingContainer}>
        <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/MyPage/EditInfo')}>
          <Text style={styles.settingText}>내 정보 수정하기(마이페이지)</Text>
          <Ionicons name="chevron-forward" size={18} color="#777" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/MyPage/Connect')}>
          <Text style={styles.settingText}>친구 연결하기</Text>
          <Ionicons name="chevron-forward" size={18} color="#777" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/MyPage/Profile')}>
          <Text style={styles.settingText}>글씨 크기 조정</Text>
          <Ionicons name="chevron-forward" size={18} color="#777" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/MyPage/Manual')}>
          <Text style={styles.settingText}>자세한 사용 방법 보기</Text>
          <Ionicons name="chevron-forward" size={18} color="#777" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/explore')}>
          <Text style={styles.settingText}>로그아웃</Text>
          <Ionicons name="chevron-forward" size={18} color="#777" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/MyPage/Quit')}>
          <Text style={styles.settingText}>탈퇴하기</Text>
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
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginTop: 80
  },
  editIcon: {
    position: 'absolute',
    bottom: 5,
    right: 120,
    backgroundColor: '#008DBF',
    width: 25,
    height: 25,
    borderRadius: 12.5,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  userHandle: {
    fontSize: 16,
    color: '#777',
  },
  settingContainer: {
    marginTop: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  settingText: {
    fontSize: 18,
    color: '#333',
  },
});

