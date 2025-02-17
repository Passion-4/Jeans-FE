import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
        <Text style={styles.title}>공유가 완료되었습니다!</Text>

        <View style={styles.fixedAnimationContainer}>
          <LottieView
            source={require('../../assets/animations/Animation - 1739343498719.json')}
            autoPlay
            loop={false}
            style={styles.lottie}
          />
        </View>

        <FullButton title="확 인" onPress={() => router.push('/Home/main-page')} />
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
    fontSize: 28,
    fontFamily: 'Bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  fixedAnimationContainer: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginVertical: 20,
    position: 'relative',
  },
  lottie: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
  },
});
