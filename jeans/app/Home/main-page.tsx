import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import styles from './main-page-st';

type Friend = {
  memberId?: number;
  teamId?: number;
  name: string;
  imageUrl: string;
  nickname?: string;
};

type Photo = {
  photoId: number;
  photoUrl: string;
};

export default function HomeUILayout() {
  const router = useRouter();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [photoLoading, setPhotoLoading] = useState(false);

  useEffect(() => {
    const fetchFriends = async () => {
      setLoading(true);
      try {
        let token = await AsyncStorage.getItem("accessToken");
        if (!token) {
          Alert.alert("오류", "로그인이 필요합니다.");
          setLoading(false);
          return;
        }

        console.log("🚀 API 요청 시작: /home-list");
        let response = await fetch("https://api.passion4-jeans.store/home-list", {
          method: "GET",
          headers: { "Authorization": `Bearer ${token}` },
        });

        if (!response.ok) throw new Error(`데이터 불러오기 실패 (${response.status})`);

        const data: Friend[] = await response.json();
        console.log("✅ 친구 및 팀 목록 가져오기 성공:", data);

        setFriends(data);
        if (data.length > 0) {
          setSelectedFriend(data[0]);
          fetchPhotos(data[0]);
        }
      } catch (error) {
        console.error("❌ API 요청 실패:", error);
        Alert.alert("오류", error instanceof Error ? error.message : "알 수 없는 오류 발생");
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  const fetchPhotos = async (friend: Friend) => {
    setPhotoLoading(true);
    try {
      let token = await AsyncStorage.getItem("accessToken");
      if (!token) {
        Alert.alert("오류", "로그인이 필요합니다.");
        setPhotoLoading(false);
        return;
      }

      let url = "";
      if (friend.nickname === '나') {
        url = "https://api.passion4-jeans.store/feed";
      } else if (friend.memberId) {
        url = `https://api.passion4-jeans.store/friend-photos/${friend.memberId}`;
      } else if (friend.teamId) {
        url = `https://api.passion4-jeans.store/team-photos/${friend.teamId}`;
      }

      console.log(`🚀 API 요청 시작: ${url}`);
      let response = await fetch(url, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` },
      });

      if (!response.ok) throw new Error(`사진 불러오기 실패 (${response.status})`);

      const data: Photo[] = await response.json();
      console.log("✅ 사진 목록 가져오기 성공:", data);

      setPhotos(data);
    } catch (error) {
      console.error("❌ 사진 가져오기 실패:", error);
      Alert.alert("오류", error instanceof Error ? error.message : "알 수 없는 오류 발생");
    } finally {
      setPhotoLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TopNavBar />

      <View style={styles.fixedHeader}>
        <View>
          <Text style={styles.title}>친구들 소식 확인</Text>
          <Text style={styles.description}>
            {selectedFriend &&
              (selectedFriend.teamId ? (
                <>
                  <Text style={styles.defaultText}>[</Text>
                  <Text style={styles.highlightedText}>{selectedFriend.name}</Text>
                  <Text style={styles.defaultText}>]과 나눈 추억을 둘러보세요.</Text>
                </>
              ) : (
                <>
                  <Text style={styles.highlightedText}>{selectedFriend.name}</Text>
                  <Text style={styles.defaultText}>님의 추억을 둘러보세요.</Text>
                </>
              ))}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.shareButton} onPress={() => router.push('/Share/share-select-img')}>
        <Image source={require('@/assets/images/share.png')} style={styles.shareIcon} />
        <Text style={styles.shareText}>공유</Text>
      </TouchableOpacity>

      <View style={styles.friendsContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#008DBF" />
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.friendsScrollWrapper}>
            {friends.map((friend) => (
              <TouchableOpacity
                key={friend.memberId ? `member-${friend.memberId}` : `team-${friend.teamId}`}
                style={styles.friendItem}
                onPress={() => {
                  setSelectedFriend(friend);
                  fetchPhotos(friend);
                }}
              >
                <Image
                  source={
                    friend.imageUrl && friend.imageUrl.trim() !== "" 
                      ? { uri: friend.imageUrl }
                      : require('../../assets/images/group-default.png')  // ✅ 기본 이미지 적용
                  }
                 
                  style={[
                    styles.profileImage,
                    selectedFriend && selectedFriend !== friend ? styles.blurred : null,
                  ]}
                />
                <Text style={styles.friendName}>{friend.nickname || friend.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

      {selectedFriend?.teamId && (
        <TouchableOpacity
          style={styles.groupEditButton}
          onPress={() =>
            router.push({
              pathname: '/Home/group-img-edit',
              params: { teamId: selectedFriend.teamId, teamName: selectedFriend.name, imageUrl: selectedFriend.imageUrl },
            })
          }
        >
          <Text style={styles.groupEditText}>그룹 프로필 수정</Text>
        </TouchableOpacity>
      )}

      <View style={styles.photosContainer}>
        {photoLoading ? (
          <ActivityIndicator size="large" color="#008DBF" />
        ) : (
          <ScrollView contentContainerStyle={styles.photoGrid}>
            {photos.map((photo) => (
              <TouchableOpacity key={photo.photoId} onPress={() => router.push(`/Home/photo-detail?photoId=${photo.photoId}`)}>
                <Image source={{ uri: photo.photoUrl }} style={styles.sharedPhoto} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

      <BottomNavBar />
    </View>
  );
}
