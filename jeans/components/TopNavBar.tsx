import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function TopNavBar() {
  const router = useRouter();

  return (
    <View style={styles.banner}>
      <View style={styles.headerIcons}>
        {/* 사용법 아이콘 */}
        <Ionicons name="reader" size={35} color="black" style={styles.icon} />
        {/* 마이 페이지 아이콘 */}
        <TouchableOpacity onPress={() => router.push('/MyPage/MyPage')}>
          <Ionicons name="settings-outline" size={35} color="black" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    position: 'absolute', // 화면 상단에 고정
    top: 30, 
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    zIndex: 1000, // 다른 요소들 위에 배치
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 20,
    marginTop: 20,
  },
});
