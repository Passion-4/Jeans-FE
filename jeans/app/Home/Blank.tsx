import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();

  const friends = [
    { id: '1', image: 'https://via.placeholder.com/60' },
    { id: '2', image: 'https://via.placeholder.com/60' },
    { id: '3', image: 'https://via.placeholder.com/60' },
    { id: '4', image: 'https://via.placeholder.com/60' },
    { id: '5', image: 'https://via.placeholder.com/60' },
  ];

  return (
    <View style={styles.container}>
      {/* 상단 바 */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.title}>친구들 소식 확인</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.shareButton}>
            <Text style={styles.shareText}>공유</Text>
          </TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="black" />
        </View>
      </View>

      {/* 서브 텍스트 */}
      <Text style={styles.subtitle}>나의 최근 추억을 둘러보세요.</Text>

      {/* 친구들 프로필 스크롤 */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.friendsList}>
        {friends.map(friend => (
          <Image key={friend.id} source={{ uri: friend.image }} style={styles.friendImage} />
        ))}
      </ScrollView>

      {/* 이미지 격자 레이아웃 */}
      <View style={styles.imageGrid}>
        <Image source={{ uri: 'https://via.placeholder.com/200' }} style={styles.mainImage} />
        <View style={styles.sideImages}>
          <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.sideImage} />
          <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.sideImage} />
        </View>
        <Image source={{ uri: 'https://via.placeholder.com/200' }} style={styles.largeImage} />
      </View>

      {/* 하단 네비게이션 바 */}
      <View style={styles.bottomNav}>
        <Text style={styles.navText}>홈</Text>
        <TouchableOpacity style={styles.centerButton}>
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.navText}>보정</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareButton: {
    backgroundColor: '#008DBF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  shareText: {
    color: 'white',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  friendsList: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  friendImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  mainImage: {
    width: '65%',
    height: 150,
    borderRadius: 10,
  },
  sideImages: {
    width: '30%',
    justifyContent: 'space-between',
  },
  sideImage: {
    width: '100%',
    height: 70,
    borderRadius: 10,
  },
  largeImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginTop: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
  },
  navText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  centerButton: {
    width: 50,
    height: 50,
    backgroundColor: '#008DBF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
