import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function NavBar() {
  const router = useRouter();

  return (
    <>

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
    </>
  );
}

const styles = StyleSheet.create({
  banner: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    marginTop: 30,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 20,
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
    fontFamily: 'Bold',
  },
  centerButton: {
    width: 80,
    height: 80,
    backgroundColor: '#008DBF',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
