import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import HelpOverlay from './HelpOverlay'; // HelpOverlay 가져오기

export default function TopNavBar() {
  const router = useRouter();
  const pathname = usePathname();

  // HelpButton을 표시할 페이지 목록
  const pagesWithHelpButton = [
    '/Home/main-page',
    '/MakeUp/select-function',
    '/MakeUp/advanced-option',
  ];

  // 설명서 버튼 상태 관리
  const [showHelp, setShowHelp] = useState(false);

  return (
    <View style={styles.banner}>
      {/* 🔹 아이콘 컨테이너 (전체 정렬) */}
      <View style={styles.iconContainer}>

        {/* 📖 설명서 아이콘 */}
        {pagesWithHelpButton.includes(pathname) && (
          <TouchableOpacity onPress={() => setShowHelp(true)} style={styles.iconWrapper}>
            <Image source={require('@/assets/images/explain.png')} style={styles.iconImage} />
            <Text style={styles.iconText}>설명서</Text>
          </TouchableOpacity>
        )}

        {/* 🔍 검색 아이콘 */}
        {pathname === '/Home/main-page' && (
          <TouchableOpacity onPress={() => router.push('/Home/Search')} style={styles.iconWrapper}>
            <Image source={require('@/assets/images/search.png')} style={styles.iconImage} />
            <Text style={styles.iconText}>검색</Text>
          </TouchableOpacity>
        )}

        {/* 👥 친구 아이콘 */}
        <TouchableOpacity onPress={() => router.push('/MyPage/connect')} style={styles.iconWrapper}>
          <Image source={require('@/assets/images/friend.png')} style={styles.iconImage} />
          <Text style={styles.iconText}>친구</Text>
        </TouchableOpacity>

        {/* ⚙️ 설정 아이콘 */}
        <TouchableOpacity onPress={() => router.push('/MyPage/my-page')} style={styles.iconWrapper}>
          <Image source={require('@/assets/images/settings.png')} style={styles.iconImage} />
          <Text style={styles.iconText}>설정</Text>
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
    height: 80, // ✅ 높이 증가하여 텍스트 공간 확보
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    zIndex: 1000,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,

    // ✅ 그림자 추가
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 }, // 아래쪽 그림자 강조
    shadowOpacity: 0.15, // 그림자 투명도
    shadowRadius: 8, // 그림자 번짐 정도
    elevation: 6, // 안드로이드용 그림자 효과
  },

  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', // ✅ 동일한 간격 정렬
    width: '100%',
    alignItems: 'center',
    paddingBottom:15
  },
  iconWrapper: {
    width: 60, // ✅ 크기 조정
    height: 60,
    borderRadius: 10, // ✅ 네모 모서리 둥글게
    backgroundColor: '#F5F5F5', // ✅ 아이콘 배경 색상
    alignItems: 'center',
    justifyContent: 'center',

    // ✅ 그림자 효과 추가
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // ✅ 안드로이드 그림자 지원
  },
  iconImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain', // ✅ 이미지 비율 유지
  },
  iconText: {
    marginTop: 5, // ✅ 아이콘과 텍스트 간격 조정
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
    fontFamily: 'Medium',
  },
});
