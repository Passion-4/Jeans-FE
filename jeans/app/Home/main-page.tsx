import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import { Ionicons } from '@expo/vector-icons';
import useSelectedFriends from '../../hooks/useSelectedFriends';

// ✅ 친구/팀 데이터 타입 정의
type Friend = {
  memberId?: number;  // 개별 친구일 경우
  teamId?: number;    // 그룹일 경우
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
  const { addTeam } = useSelectedFriends(); // ✅ 훅 가져오기
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [photoLoading, setPhotoLoading] = useState(false);

  // 🔹 API 호출하여 친구 목록 가져오기
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
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`데이터 불러오기 실패 (${response.status})`);
        }

        const data: Friend[] = await response.json();
        console.log("✅ 친구 및 팀 목록 가져오기 성공:", data);

        setFriends(data);
        if (data.length > 0) {
          setSelectedFriend(data[0]); // ✅ 기본 선택 값 설정
          fetchPhotos(data[0]); // ✅ 기본값 사진 가져오기
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

  // 🔹 선택한 친구/팀에 따라 사진 목록 가져오기
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
      if (friend.nickname === '나') { // ✅ "나" 선택 시
        url = "https://api.passion4-jeans.store/feed";
      } else if (friend.memberId) {
        url = `https://api.passion4-jeans.store/friend-photos/${friend.memberId}`;
      } else if (friend.teamId) {
        url = `https://api.passion4-jeans.store/team-photos/${friend.teamId}`;
      }

      console.log(`🚀 API 요청 시작: ${url}`);

      let response = await fetch(url, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`사진 불러오기 실패 (${response.status})`);
      }

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

      {/* 🔹 타이틀 & 공유 버튼 */}
      <View style={styles.fixedHeader}>
        <View>
          <Text style={styles.title}>친구들 소식 확인</Text>
          <Text style={styles.description}>
            {selectedFriend && (
              selectedFriend.teamId ? (
                <>
                  <Text style={styles.defaultText}>[</Text>
                  <Text style={styles.highlightedText}>{selectedFriend.name}</Text>
                  <Text style={styles.defaultText}>] 그룹과 나눈 추억을 둘러보세요.</Text>
                </>
              ) : (
                <>
                  <Text style={styles.highlightedText}>{selectedFriend.name}</Text>
                  <Text style={styles.defaultText}>님의 추억을 둘러보세요.</Text>
                </>
              )
            )}
          </Text>
        </View>
      </View>

            {/* 🔹 공유 버튼 */}
            <TouchableOpacity style={styles.shareButton} onPress={() => router.push('/Share/share-select-img')}>
              <Image source={require('@/assets/images/share.png')} style={styles.shareIcon} />
              <Text style={styles.shareText}>공유</Text>
            </TouchableOpacity>

      {/* 🔹 친구 목록 */}
      <View style={styles.friendsContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#008DBF" />
        ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.friendsScrollWrapper}>
              {friends.map((friend, index) => (
                <TouchableOpacity
                  key={friend.memberId ? `member-${friend.memberId}` : `team-${friend.teamId}` || `friend-${index}`}
                  style={styles.friendItem}
                  onPress={() => {
                    setSelectedFriend(friend);
                    fetchPhotos(friend);
                  }}
                >
                  <Image source={{ uri: friend.imageUrl }} style={styles.profileImage} />
                  <Text style={styles.friendName}>{friend.nickname || friend.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
        )}
      </View>

      {/* 🔹 그룹 프로필 수정 버튼 (그룹 선택 시 표시) */}
      {selectedFriend?.teamId && (
        <TouchableOpacity 
          style={styles.groupEditButton} 
          onPress={() => {
            addTeam({
              teamId: selectedFriend.teamId ?? 0,
              name: selectedFriend.name,
              imageUrl: selectedFriend.imageUrl
            });
            router.push('/Home/group-img-edit');
          }}
        >
          <Text style={styles.groupEditText}>그룹 프로필 수정</Text>
        </TouchableOpacity>
      )}

      {/* 🔹 공유된 사진 */}
      <View style={styles.photosContainer}>
        {photoLoading ? (
          <ActivityIndicator size="large" color="#008DBF" />
        ) : (
          <ScrollView contentContainerStyle={styles.photoGrid}>
            {photos.map((photo) => (
              <Image key={photo.photoId} source={{ uri: photo.photoUrl }} style={styles.sharedPhoto} />
            ))}
          </ScrollView>
        )}
      </View>

      <BottomNavBar />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
  },
  fixedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 130,
    left: 15,
    right: 15,
    backgroundColor: '#FFFFFF',
    zIndex: 10,
  },
  title: {
    fontSize: 27,
    fontFamily: 'Bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 17,
    color: '#555',
    fontFamily: 'Medium',
  },
  shareButton: {
    position: 'absolute',
    top: 120,
    right: 15,
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  shareIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  shareText: {
    fontSize: 15,
    fontFamily: 'Medium',
    color: '#333',
    textAlign: 'center',
  },
  friendsContainer: {
    marginTop: 200,
    marginBottom: 20,
  },
  friendsScrollWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  friendItem: {
    alignItems: 'center',
    marginRight: 15,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  blurred: {
    opacity: 0.3,
  },
  friendName: {
    fontSize: 14,
    fontFamily: 'Medium',
    marginTop: 5,
  },
  rightArrow: {
    position: 'absolute',
    right: -20,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  highlightedText: {
    color: '#008DBF',
    fontWeight: 'bold',
    fontFamily: 'Medium',
  },
  defaultText: {
    color: '#555',
  },
  photosContainer: { flex: 1, marginTop: 10 },
  photoGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  sharedPhoto: { width: 160, height: 160, marginBottom: 5, borderRadius: 10 },
  groupEditButton: {
    backgroundColor: '#008DBF',
    paddingVertical: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    width: '80%',
    alignSelf: 'center',
  },
  groupEditText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Medium',
  },
});
