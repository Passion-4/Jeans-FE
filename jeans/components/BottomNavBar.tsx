import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function BottomNavBar() {
  const router = useRouter();

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navButton} onPress={() => router.push('/Home/Mainpage')}>
        <Text style={styles.navText}>친구 소식</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.centerButton}>
        <Ionicons name="mic" size={50} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.navButton} onPress={() => router.push('/Makeup/Makeup0')}>
        <Text style={styles.navText}>사진 편집</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute', // 하단에 고정
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
    zIndex: 1000, // 다른 요소들보다 위로 배치
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 15
  },
  navText: {
    fontSize: 20,
    fontFamily: 'Bold',
  },
  centerButton: {
    width: 90,
    height: 90,
    backgroundColor: '#008DBF',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',

    /** 🔹 강한 그림자 효과 */
    elevation: 20, // Android에서 그림자 강도 높이기
    shadowColor: '#000', // iOS 그림자 색상
    shadowOffset: { width: 0, height: 6 }, // 그림자의 방향 및 크기
    shadowOpacity: 0.5, // 그림자의 투명도 증가 (기존 0.3 -> 0.5)
    shadowRadius: 20, // 그림자의 흐림 효과 증가 (기존 5 -> 8)

    marginBottom: 40,
  },
});
