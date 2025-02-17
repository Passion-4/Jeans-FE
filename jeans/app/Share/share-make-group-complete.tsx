import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import FullButton from '@/components/FullButton';
export default function CompleteSignupScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TopNavBar />
      <View style={styles.content}>
        <Text style={styles.title}>그룹이 생성되었습니다!</Text>
        <View style={styles.lottieFixedContainer}>
          <LottieView 
            source={require('../../assets/animations/Animation - 1739343498719.json')} 
            autoPlay
            loop={false} 
            style={styles.lottie}
          />
        </View>

        <FullButton title='확 인' onPress={() => router.push('/Share/share-voice')}></FullButton>
      </View>
      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontFamily:'Bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  lottieFixedContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 30,
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
});
