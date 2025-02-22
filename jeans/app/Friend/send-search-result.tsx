import React from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import FullButton from '@/components/FullButton';

export default function ShareCheckGroupScreen() {
  const router = useRouter();
  const { memberId, name, profileUrl } = useLocalSearchParams(); // 이전 페이지에서 전달된 데이터 활용

  const sendFriendRequest = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) {
        Alert.alert("로그인이 필요합니다.");
        return;
      }

      const response = await fetch(`https://api.passion4-jeans.store/follow/${memberId}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const responseText = await response.text();
      console.log("🔹 API 응답 상태 코드:", response.status);
      console.log("🔹 API 응답 본문:", responseText);

      if (response.status === 201) {
        Alert.alert("친구 요청이 전송되었습니다.");
        router.push('/Friend/send-complete');
      } else if (response.status === 400 && responseText.includes("이미 보낸 팔로우 요청이 존재합니다.")) {
        Alert.alert("이미 친구 요청을 보냈습니다.");
      } else {
        throw new Error(`친구 요청 실패 (${response.status})`);
      }
    } catch (error) {
      Alert.alert("오류", error instanceof Error ? error.message : "알 수 없는 오류 발생");
    }
  };

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* 타이틀 */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>검색된 친구</Text>
      </View>

      {/* 친구 정보 표시 */}
      <View style={styles.friendContainer}>
        <Image 
          source={profileUrl ? { uri: profileUrl } : require('../../assets/images/icon.png')} 
          style={styles.friendImage}
        />
        <Text style={styles.friendName}>{name || '이름 없음'}</Text> 
      </View>

      <View style={styles.buttonContainer}>
        <FullButton title="친구 요청 보내기" onPress={sendFriendRequest} />
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
    marginTop: 160,
    marginBottom: 30,
  },
  title: {
    fontSize: 35,
    fontFamily: 'Bold',
    textAlign: 'center',
  },
  friendContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  friendImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  friendName: {
    fontSize: 20,
    fontFamily: 'Medium',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 180,
  },
});
