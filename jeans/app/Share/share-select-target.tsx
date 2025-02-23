import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import CustomButton from '../../components/FullButton';
import useSelectedFriends from '../../hooks/useSelectedFriends';
import { Friend } from '../../hooks/useSelectedFriends';


export default function Share2Screen() {
  const router = useRouter();
  const { selectedFriends } = useSelectedFriends();
  const [loading, setLoading] = useState(false);

  console.log("🔹 선택한 친구 리스트:", selectedFriends);

  // ✅ 각자 보내기 (receiverList를 전달)
  const handleIndividualShare = () => {
    const receiverList = selectedFriends
      .filter((friend): friend is Friend => 'memberId' in friend) // ✅ Friend 타입만 필터링
      .map(friend => friend.memberId);

    if (receiverList.length === 0) {
      Alert.alert("오류", "선택한 친구가 없습니다.");
      return;
    }

    console.log("🚀 개별 전송할 멤버 ID 목록:", receiverList);

    router.push({
      pathname: '/Share/share-voice',
      params: { shareType: 'friend', receiverList: JSON.stringify(receiverList) }
    });
  };
// ✅ 그룹 존재 여부 확인 후 없는 경우 팀 생성 화면으로 이동
const checkGroupExists = async () => {
  const memberIds = selectedFriends
    .filter((friend): friend is Friend => 'memberId' in friend) // ✅ Friend 타입만 필터링
    .map(friend => friend.memberId);

  if (memberIds.length === 0) {
    Alert.alert("오류", "선택한 친구가 없습니다.");
    return;
  }

  setLoading(true);
  try {
    const token = await AsyncStorage.getItem("accessToken");

    if (!token) {
      Alert.alert("로그인이 필요합니다.");
      setLoading(false);
      return;
    }

    // ✅ URL 쿼리 스트링 생성
    const queryParams = memberIds.map(id => `member-id=${id}`).join('&');
    const url = `https://api.passion4-jeans.store/team/check?${queryParams}`;
    console.log("🚀 그룹 존재 여부 체크 API 요청:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    console.log("🔹 그룹 체크 응답 상태 코드:", response.status);

    if (response.status === 403) {
      Alert.alert("오류", "로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
      await AsyncStorage.removeItem("accessToken");
      setLoading(false);
      return;
    }

    const responseText = await response.text();
    console.log("🔹 그룹 체크 응답 본문:", responseText);

    if (!responseText) {
      throw new Error("서버 응답이 없습니다. 다시 시도해 주세요.");
    }

    const responseData = JSON.parse(responseText);
    console.log("✅ 그룹 체크 응답 데이터:", responseData);

    if (responseData.check) {
      // ✅ 기존 그룹이 존재하는 경우 → 해당 그룹 공유 화면으로 이동
      router.push({
        pathname: '/Share/share-to-group',
        params: { shareType: 'team', teamId: responseData.teamId }
      });
    } else {
      // ✅ 기존 그룹이 없으면 팀 생성 화면으로 이동
      router.push({
        pathname: '/Share/share-make-group',
        params: { memberIds: JSON.stringify(memberIds) }
      });
    }
  } catch (error) {
    console.error("❌ 그룹 체크 오류:", error);
    Alert.alert("오류", error instanceof Error ? error.message : "그룹 정보를 불러오는 중 문제가 발생했습니다.");
  } finally {
    setLoading(false);
  }
};


  return (
    <View style={styles.container}>
      <TopNavBar />
      <Text style={styles.title}>공유 방법을{'\n'}선택해 주세요.</Text>

      <View style={styles.buttonContainer}>
        {/* 🔹 각자 보내기 (receiverList 전달) */}
        <CustomButton
          title="각자 보내실래요?"
          color="#FF616D"
          onPress={handleIndividualShare}
          disabled={loading}
        />

        {/* 🔹 그룹 확인 후 공유 (teamId 또는 그룹 생성) */}
        <CustomButton
          title="그룹에 보내실래요?"
          onPress={checkGroupExists}
          disabled={loading}
        />
      </View>

      {loading && <ActivityIndicator size="large" color="#008DBF" style={{ marginTop: 20 }} />}
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
    fontFamily: 'Bold',
    textAlign: 'center',
    marginBottom: 60,
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
  },
});
