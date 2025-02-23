import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import { Ionicons } from '@expo/vector-icons';

export default function MyPageScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState({
    name: '',
    birthday: '',
    phone: '',
    profileUrl: null,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (!accessToken) {
          Alert.alert('오류', '로그인이 필요합니다.');
          return;
        }

        const response = await fetch('https://api.passion4-jeans.store/my/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('프로필 정보를 불러오는 데 실패했습니다.');
        }

        const data = await response.json();
        console.log('📌 내 정보:', data);

        setProfile({
          name: data.name || '',
          birthday: data.birthday || '',
          phone: data.phone || '',
          profileUrl: data.profileUrl || null,
        });

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "알 수 없는 오류 발생";
        Alert.alert("오류", errorMessage);
      }
      
    };

    fetchProfile();
  }, []);

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* 📌 프로필 섹션 */}
      <View style={styles.profileContainer}>
        {/* 🔹 프로필 이미지 */}
        <Image
          source={profile.profileUrl ? { uri: profile.profileUrl } : require('../../assets/images/icon.png')}
          style={styles.profileImage}
        />

        {/* 🔹 프로필 정보 (이름, 생년월일, 전화번호) */}
        <View style={styles.profileInfo}>
          <Text style={styles.userName}>{profile.name || '이름 없음'}</Text>
          <Text style={styles.userDetail}>생년월일: {profile.birthday || '미등록'}</Text>
          <Text style={styles.userDetail}>전화번호: {profile.phone || '미등록'}</Text>
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

        <TouchableOpacity
          style={styles.settingItem}
          onPress={async () => {
            await AsyncStorage.removeItem("accessToken"); // 🔥 토큰 삭제
            Alert.alert("로그아웃", "성공적으로 로그아웃되었습니다.");
            router.push("/explore"); // 🔥 로그인 페이지로 이동
          }}
        >
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
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 140,
    marginBottom: 25,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 30,
    marginLeft:10
  },
  profileInfo: {
    justifyContent: 'center',
  },
  userName: {
    fontSize: 25,
    fontFamily: 'Bold',
  },
  userDetail: {
    fontSize: 18,
    color: '#555',
    fontFamily: 'Medium',
    marginTop: 3,
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

