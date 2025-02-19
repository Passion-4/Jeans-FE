import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function QuoteSelectImg1() {
  const { friendName, friendRelation, friendImage } = useLocalSearchParams();

  // friendImage가 string | string[] 타입일 수 있으므로 처리
  const parsedFriendImage = typeof friendImage === "string" ? JSON.parse(friendImage) : friendImage[0];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>선택한 친구</Text>
      <Image source={parsedFriendImage} style={styles.profileImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Bold',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  friendName: {
    fontSize: 22,
    fontFamily: 'Medium',
  },
  friendRelation: {
    fontSize: 18,
    color: '#777',
    fontFamily: 'Medium',
  },
});
