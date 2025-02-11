import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeUILayout() {
  return (
    <View style={styles.container}>
      {/* 상단 배너 */}
      <View style={styles.banner}>
        <Ionicons name="arrow-back" size={40} color="black" />
        <View style={styles.headerIcons}>
          <Ionicons name="search" size={40} color="black" style={styles.icon} />
          <Ionicons name="settings-outline" size={40} color="black" style={styles.icon} />
        </View>
      </View>
      
      {/* 타이틀 및 공유 버튼 컨테이너 */}
      <View style={styles.titleContainer}>
        <View>
          <Text style={styles.title}>친구들 소식 확인</Text>
          <Text style={styles.description}>나의 최근 추억을 둘러보세요.</Text>
        </View>
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareText}>공유</Text>
        </TouchableOpacity>
      </View>
      
      {/* 친구 목록 빈 공간 */}
      <View style={styles.emptySpace1}>
        <Text style={styles.emptySpaceText}>친구 목록</Text>
      </View>
      
      {/* 공유된 사진 빈 공간 */}
      <View style={styles.emptySpace2}>
        <Text style={styles.emptySpaceText}>공유된 사진</Text>
      </View>
      
      {/* 하단 네비게이션 바 */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>홈</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.centerButton}>
          <Ionicons name="mic" size={60} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>보정</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 0,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 20,
    color: '#555',
    marginTop: 5,
  },
  shareButton: {
    backgroundColor: '#008DBF',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 5,
  },
  shareText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  emptySpace1: {
    flex: 0.2,
    backgroundColor: '#DDDDDD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  emptySpace2: {
    flex: 1,
    backgroundColor: '#DDDDDD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  emptySpaceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  navText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  centerButton: {
    width: 100,
    height: 80,
    backgroundColor: '#008DBF',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
