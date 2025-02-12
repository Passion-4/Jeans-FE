import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


export default function HomeUILayout() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* 상단 배너 */}
      <View style={styles.banner}>
        <View style={styles.headerIcons}>
          <Ionicons name="search" size={30} color="black" style={styles.icon} />
          {/* ✅ 터치 가능한 설정 아이콘 추가 */}
          <TouchableOpacity onPress={() => router.push('/MyPage/MyPage')}>
            <Ionicons name="settings-outline" size={30} color="black" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* 타이틀 및 공유 버튼 컨테이너 */}
      <View style={styles.titleContainer}>
        <View>
          <Text style={styles.title}>친구들 소식 확인</Text>
          <Text style={styles.description}>나의 최근 추억을 둘러보세요.</Text>
        </View>
        <TouchableOpacity style={styles.shareButton} onPress={() => router.push('/Share/Share0')}>
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
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/Makeup/Makeup0')}>
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
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    marginTop:30
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
    fontFamily:'Bold'
  },
  description: {
    fontSize: 20,
    color: '#555',
    marginTop: 5,
  },
  shareButton: {
    backgroundColor: '#008DBF',
    paddingVertical: 13,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  shareText: {
    color: 'white',
    fontFamily:'Medium',
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
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  navText: {
    fontSize: 25,
    fontFamily:'Bold'
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
