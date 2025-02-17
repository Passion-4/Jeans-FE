import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import FullButton from '../../components/FullButton';

export default function PhotoSelectionIntroScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        <Text style={styles.strongText}>지금부터 화면에 보이는{'\n'}두 개의 사진 중 마음에 드는 {'\n'} 사진을 골라주세요.</Text>
      </Text>

    <FullButton title='다 음' onPress={() => router.push('/Set/photo-selection1')}></FullButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 50,
  },
  strongText: {
    fontSize: 25,
    fontFamily:'Bold' 
  },
});
