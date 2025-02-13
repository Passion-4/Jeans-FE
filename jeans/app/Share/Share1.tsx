import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function PhotoSelectionScreen() {
  const [selectedTab, setSelectedTab] = useState<'photo' | 'album'>('photo');
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 상단 배너 */}
      <View style={styles.banner}>
        <Ionicons name="arrow-back" size={40} color="black" />
      </View>

      {/* 타이틀 */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>보정할 사진을 하나 골라주세요</Text>
      </View>

      {/* 사진/앨범 선택 버튼 */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'photo' && styles.selectedTab]}
          onPress={() => setSelectedTab('photo')}
        >
          <Text style={[styles.tabText, selectedTab === 'photo' && styles.selectedTabText]}>
            사진
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'album' && styles.selectedTab]}
          onPress={() => setSelectedTab('album')}
        >
          <Text style={[styles.tabText, selectedTab === 'album' && styles.selectedTabText]}>
            앨범
          </Text>
        </TouchableOpacity>
      </View>

      {/* 사진 목록 공간 (클릭 시 페이지 이동) */}
      <TouchableOpacity style={styles.photoList} onPress={() => router.push('/Share/Share2')}>
        <Text style={styles.photoListText}>사진 목록</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
  },
  banner: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 20,
  },
  titleContainer: {
    marginVertical: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 15,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 5,
  },
  selectedTab: {
    backgroundColor: '#008DBF',
  },
  tabText: {
    fontSize: 18,
    color: '#555',
    fontWeight: 'bold',
  },
  selectedTabText: {
    color: 'white',
  },
  photoList: {
    flex: 1,
    backgroundColor: '#DDDDDD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoListText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
