import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import FullButton from '@/components/FullButton';


export default function FriendRequestCompleteScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TopNavBar />

      <View style={styles.content}>
        <Text style={styles.title}>비밀번호가 {'\n'}변경 되었습니다!</Text>

        <LottieView 
          source={require('../../assets/animations/Animation - 1739343498719.json')} 
          autoPlay
          loop={false} 
          style={styles.lottie}
        />

        <FullButton title='확 인' onPress={() => router.push('/MyPage/MyPage')}></FullButton>
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
    fontSize: 35,
    textAlign: 'center',
    marginBottom: 40,
    fontFamily:'Bold'
  },
  lottie: {
    width: 150,  
    height: 150, 
    marginBottom: 40,
  },
});
