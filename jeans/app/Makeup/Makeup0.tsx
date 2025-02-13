import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function PhotoSelectionScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
          {/* 상단 배너 */}
          <View style={styles.banner}>
            <View style={styles.headerIcons}>
              <Ionicons name="search" size={30} color="black" style={styles.icon} />
              {/* 마이 페이지 아이콘 */}
              <TouchableOpacity onPress={() => router.push('/MyPage/MyPage')}>
                <Ionicons name="settings-outline" size={30} color="black" style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>

      {/* 타이틀 */}
      <Text style={styles.title}>원하는 사진 편집 기능을 {'\n'}선택해주세요. </Text>

      {/* 버튼 컨테이너 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.buttonText}>베스트 컷</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.buttonText}>보 정</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.buttonText}>콜라주 만들기</Text>
        </TouchableOpacity>
      </View>

      {/* 빈 공간 추가 (하단 네비게이션을 아래로 밀기 위함) */}
      <View style={{ flex: 1 }} />

      {/* 하단 네비게이션 바 */}
            <View style={styles.bottomNav}>
              <TouchableOpacity style={styles.navButton}>
                <Text style={styles.navText}>친구 소식</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.centerButton}>
                <Ionicons name="mic" size={50} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.navButton} onPress={() => router.push('/Makeup/Makeup0')}>
                <Text style={styles.navText}>사진 편집</Text>
              </TouchableOpacity>
            </View>
          </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // 전체 화면을 채우도록 설정
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
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
  title: {
    fontSize: 30,
    fontFamily:'Bold',
    textAlign: 'left',
    marginBottom: 50,
    marginTop:100
  },
  buttonContainer: {
    alignItems: 'center',
  },
  optionButton: {
    width: '100%',
    paddingVertical: 20,
    backgroundColor: '#008DBF',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 20,
    fontFamily:'Medium',
    color: 'white',
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
    width: 80,
    height: 80,
    backgroundColor: '#008DBF',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 20,
  },
});
