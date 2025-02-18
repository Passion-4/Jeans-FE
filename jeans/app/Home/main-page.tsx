import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import { Ionicons } from '@expo/vector-icons';

export default function HomeUILayout() {
  const router = useRouter();

  // 프로필 사진 데이터
  const friends = [
    { id: 1, name: '김덕배(나)', profileImage: require('../../assets/images/friend1.jpg'), isGroup: false },
    { id: 2, name: '박영남', profileImage: require('../../assets/images/friend2.jpg'), isGroup: false },
    { id: 3, name: '이순복', profileImage: require('../../assets/images/friend3.jpg'), isGroup: false },
    { id: 4, name: '박보석(아들)', profileImage: require('../../assets/images/son.jpg'), isGroup: false },
    { id: 5, name: '가족', profileImage: require('../../assets/images/family.jpg'), isGroup: true }, // 그룹
  ];

  // 공유된 사진 
  const sharedPhotos: Record<string, { id: number; imageUrl: any }[]> = {
    '김덕배(나)': [
      { id: 1, imageUrl: require('../../assets/images/photo2.png') },
      { id: 2, imageUrl: require('../../assets/images/photo2.png') },
    ],
    '이순복': [
      { id: 3, imageUrl: require('../../assets/images/photo2.png') },
      { id: 4, imageUrl: require('../../assets/images/photo2.png') },
    ],
    '박영남': [
      { id: 5, imageUrl: require('../../assets/images/photo2.png') },
      { id: 6, imageUrl: require('../../assets/images/photo2.png') },
    ],
    '박보석(아들)': [
      { id: 7, imageUrl: require('../../assets/images/photo2.png') },
      { id: 8, imageUrl: require('../../assets/images/photo2.png') },
    ],
    '가족 그룹': [
      { id: 9, imageUrl: require('../../assets/images/photo2.png') },
      { id: 10, imageUrl: require('../../assets/images/photo2.png') },
    ],
  };

  const [selectedFriend, setSelectedFriend] = useState(friends[0]); // 기본값: 김춘자(나)

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* 고정된 타이틀 & 버튼 */}
      <View style={styles.fixedHeader}>
      <View>
        <Text style={styles.title}>친구들 소식 확인</Text>
        <Text style={styles.description}>
          {selectedFriend.isGroup ? (
            <>
              <Text style={styles.defaultText}>[</Text>
              <Text style={styles.highlightedText}>{selectedFriend.name}</Text>
              <Text style={styles.defaultText}>] 그룹과 나눈 추억을 둘러보세요.</Text>
            </>
          ) : (
            <>
              <Text style={styles.highlightedText}>{selectedFriend.name}</Text>
              <Text style={styles.defaultText}>님과 나눈 추억을 둘러보세요.</Text>
            </>
          )}
        </Text>
      </View>
    </View>

      {/* 고정된 사진 공유 버튼 */}
      <TouchableOpacity style={styles.shareButton} onPress={() => router.push('/Share/share-select-img')}>
        <Text style={styles.shareText}>공유</Text>
      </TouchableOpacity>

      {/* 친구 목록 */}
      <View style={styles.friendsContainer}>
        <View style={styles.friendsScrollWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {friends.map((friend) => (
              <TouchableOpacity
                key={friend.id}
                style={styles.friendItem}
                onPress={() => setSelectedFriend(friend)}
              >
                <Image
                  source={friend.profileImage}
                  style={[
                    styles.profileImage,
                    selectedFriend.id !== friend.id && styles.blurred, // 선택된 친구가 아니면 블러 처리
                  ]}
                />
                <Text style={styles.friendName}>{friend.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Ionicons name="chevron-forward-outline" size={24} color="#008DBF" style={styles.rightArrow} />
        </View>
      </View>

      {/* 그룹 선택 시 프로필 수정 버튼 */}
      {selectedFriend.isGroup && (
        <TouchableOpacity style={styles.editProfileButton} onPress={() => router.push('/Home/group-img-edit')}>
          <Text style={styles.editProfileText}>그룹 프로필 수정</Text>
        </TouchableOpacity>
      )}

      {/* 공유된 사진 */}
      <View style={styles.photosContainer}>
  <View style={styles.photosScrollWrapper}>
    <ScrollView contentContainerStyle={styles.photoGrid} showsVerticalScrollIndicator={false}>
      {sharedPhotos[selectedFriend.name]?.map((photo) => (
        <TouchableOpacity key={photo.id} onPress={() => router.push({ pathname: '/Home/photo-detail', params: { photoId: photo.id } })}>
          <Image source={photo.imageUrl} style={styles.sharedPhoto} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
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
    top: 125, // 고정 위치 (TopNavBar 아래)
    left: 15,
    right: 15,
    backgroundColor: '#FFFFFF',
    zIndex: 10,
  },
  title: {
    fontSize: 25,
    fontFamily: 'Bold',
    marginBottom:5
  },
  description: {
    fontSize: 17,
    color: '#555',
    fontFamily: 'Medium',
  },

  /** 📌 고정된 사진 공유 버튼 */
  shareButton: {
    position: 'absolute', // 고정 위치
    top: 113, // TopNavBar 아래 + 약간의 여백
    right: 15, // 오른쪽 끝에 배치
    backgroundColor: '#008DBF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    zIndex: 20, // 최상위 레이어 유지
  },
  shareText: {
    color: 'white',
    fontFamily: 'Medium',
    fontSize: 18,
  },

  /** 📌 친구 목록 */
  friendsContainer: {
    marginTop: 200, // 고정된 타이틀 아래 배치
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
    opacity: 0.3, // 블러 효과 (투명도 적용)
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

  /** 프로필 수정 버튼 */
  editProfileButton: {
    backgroundColor: '#008DBF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 20,
  },
  editProfileText: {
    color: 'white',
    fontFamily: 'Medium',
    fontSize: 18,
  },

  /** 공유된 사진 */
  photosContainer: {
    flex: 1,
  },
  photosScrollWrapper: {
    flex: 1,
    position: 'relative',
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sharedPhoto: {
    width: 160,
    height:160,
    aspectRatio: 1,
    marginBottom: 5,
    borderRadius: 10,
  },
  highlightedText: {
    color: '#008DBF', // 🔹 지정된 색상 적용
    fontWeight: 'bold', // 🔹 굵게 (선택 사항)
  },
  defaultText: {
    color: '#555', // 🔹 기본 텍스트 색상 (회색 계열)
  },
});
