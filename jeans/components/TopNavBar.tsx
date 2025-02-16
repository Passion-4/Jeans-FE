import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import HelpOverlay from './HelpOverlay'; // HelpOverlay 가져오기

export default function TopNavBar() {
  const router = useRouter();
  const pathname = usePathname();

  // HelpButton을 표시할 페이지 목록
  const pagesWithHelpButton = [
    '/Home/Mainpage',
    '/Makeup/Makeup0',
    '/Makeup/Edit1',
  ];

  // 🔹 설명서 버튼 상태 관리 (HelpButton 기능 추가)
  const [showHelp, setShowHelp] = useState(false);

  return (
    <View style={styles.banner}>
      {/* 🔹 왼쪽 영역 (설명 버튼) */}
      <View style={styles.leftContainer}>
        {pagesWithHelpButton.includes(pathname) && (
          <TouchableOpacity onPress={() => setShowHelp(true)} style={styles.helpButton}>
            <Ionicons name="book-outline" size={35} color="black" />
          </TouchableOpacity>
        )}
      </View>

      {/* 🔹 오른쪽 영역 (검색 & 설정 아이콘) */}
      <View style={styles.rightContainer}>
        {/* 🔍 검색 아이콘 (메인 페이지에서만 표시) */}
        {pathname === '/Home/Mainpage' && (
          <TouchableOpacity onPress={() => router.push('/Home/Search')}>
            <Ionicons name="search" size={35} color="black" style={styles.icon} />
          </TouchableOpacity>
        )}

        {/* 👥 사람 여러 명 아이콘 */}
        <TouchableOpacity onPress={() => router.push('/MyPage/Connect')}>
          <Ionicons name="people-outline" size={35} color="black" style={styles.icon} />
        </TouchableOpacity>

        {/* ⚙️ 마이 페이지 아이콘 */}
        <TouchableOpacity onPress={() => router.push('/MyPage/MyPage')}>
          <Ionicons name="settings-outline" size={35} color="black" style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* 설명 버튼 클릭 시 도움말 오버레이 표시 */}
      {showHelp && <HelpOverlay onClose={() => setShowHelp(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    top: 23,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row', // 🔹 왼쪽 & 오른쪽 영역을 정렬
    alignItems: 'center',
    justifyContent: 'space-between', // 🔹 왼쪽(설명 버튼)과 오른쪽(아이콘) 분리
    paddingHorizontal: 15,
    zIndex: 1000,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 15,
    marginTop: 20,
  },
  helpButton: {
    paddingHorizontal: 5, // 🔹 클릭 영역 확장
    marginTop: 20,
  },
});
