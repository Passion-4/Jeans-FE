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
          <Text style={styles.title}>친구들에게 공유하기기</Text>
        </View>
      </View>
      
      {/* 친구 목록 빈 공간 */}
      <View style={styles.emptySpace}>
        <Text style={styles.emptySpaceText}>친구 목록</Text>
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
    fontSize: 50,
    fontWeight: 'bold',
  },
  emptySpace: {
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
