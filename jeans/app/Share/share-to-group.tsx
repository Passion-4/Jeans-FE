import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';

type Group = {
  teamId: number;
  name: string;
  imageUrl: string | null;
};

export default function ShareCheckGroupScreen() {
  const router = useRouter();
  const { teamId } = useLocalSearchParams<{ teamId: string }>(); // ✅ 전달받은 팀 ID 가져오기
  const [group, setGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroupInfo = async () => {
      if (!teamId) {
        Alert.alert('오류', '팀 ID가 없습니다.');
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) {
          Alert.alert('로그인이 필요합니다.');
          setLoading(false);
          return;
        }

        // ✅ 올바른 API 엔드포인트 사용
        const url = `https://api.passion4-jeans.store/team/${teamId}`;
        console.log('🚀 그룹 정보 API 요청:', url);

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // ✅ 요청에 Authorization 추가
          },
        });

        console.log('🔹 그룹 정보 응답 상태 코드:', response.status);

        if (!response.ok) {
          throw new Error(`서버 응답 오류 (${response.status})`);
        }

        const responseData: Group = await response.json();
        console.log('✅ 그룹 정보 가져오기 성공:', responseData);

        setGroup(responseData);
      } catch (error) {
        console.error('❌ 그룹 정보 불러오기 실패:', error);
        Alert.alert('오류', error instanceof Error ? error.message : '그룹 정보를 불러오는 중 문제가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchGroupInfo();
  }, [teamId]);

  return (
    <View style={styles.container}>
      <TopNavBar />

      {loading ? (
        <ActivityIndicator size="large" color="#008DBF" />
      ) : group ? (
        <>
          {/* 타이틀 */}
          <Text style={styles.title}>그룹이 존재합니다</Text>

          {/* 그룹 정보 표시 */}
          <View style={styles.groupContainer}>
            <Image 
              source={group.imageUrl ? { uri: group.imageUrl } : require('../../assets/images/icon.png')} // ✅ 그룹 이미지
              style={styles.groupImage}
            />
            <Text style={styles.groupName}>{group.name}</Text>
            <Text style={styles.groupType}>그룹</Text>
          </View>

          {/* 버튼 컨테이너 */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.optionButton} 
              onPress={() => router.push('/Share/share-voice')}
            >
              <Text style={styles.buttonText}>그룹에 보내기</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => router.back()}
            >
              <Text style={styles.buttonText}>뒤로가기</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text style={styles.errorText}>그룹 정보를 불러오지 못했습니다.</Text>
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
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50,
  },
  groupContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  groupImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 30,
  },
  groupName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  groupType: {
    fontSize: 14,
    color: '#777',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionButton: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#87CEEB',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#008DBF',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginTop: 20,
  },
});