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

      {/* 📌 프로필 섹션 */}
      <View style={styles.profileContainer}>
        {/* 🔹 프로필 이미지 (왼쪽 정렬) */}
        <Image source={require('../../assets/images/icon.png')} style={styles.profileImage} />

        {/* 🔹 프로필 정보 (이름, 생년월일, 전화번호) */}
        <View style={styles.profileInfo}>
          <Text style={styles.userName}>김덕배</Text>
          <Text style={styles.userDetail}>생년월일: 1990.01.01</Text>
          <Text style={styles.userDetail}>전화번호: 010-1234-5678</Text>
        </View>
      </View>

      {/* 📌 설정 목록 */}
      <View style={styles.settingContainer}>
        <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/MyPage/edit-info')}>
          <Text style={styles.settingText}>내 정보 수정하기</Text>
          <Ionicons name="chevron-forward" size={18} color="#777" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/MyPage/connect')}>
          <Text style={styles.settingText}>친구</Text>
          <Ionicons name="chevron-forward" size={18} color="#777" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/MyPage/word-size')}>
          <Text style={styles.settingText}>글씨 크기 조정</Text>
          <Ionicons name="chevron-forward" size={18} color="#777" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/MyPage/manual')}>
          <Text style={styles.settingText}>자세한 사용 방법 보기</Text>
          <Ionicons name="chevron-forward" size={18} color="#777" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/explore')}>
          <Text style={styles.settingText}>로그아웃</Text>
          <Ionicons name="chevron-forward" size={18} color="#777" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/MyPage/quit')}>
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
  /** 📌 프로필 섹션 */
  profileContainer: {
    flexDirection: 'row', // 🔹 가로 정렬
    alignItems: 'center', // 🔹 세로 중앙 정렬
    marginTop: 140,
    marginBottom: 25,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginRight: 15, // 🔹 오른쪽 여백 추가
  },
  profileInfo: {
    justifyContent: 'center',
  },
  userName: {
    fontSize: 25,
    fontFamily: 'Bold',
  },
  userDetail: {
    fontSize: 16,
    color: '#555',
    fontFamily: 'Medium',
    marginTop: 3, // 🔹 간격 조정
  },

  /** 📌 설정 목록 */
  settingContainer: {
    marginTop: -10,
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
    fontFamily: 'Medium',
  },
});
