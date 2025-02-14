import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useRouter } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import CustomButton from '../../components/HalfButton'; // ✅ 재사용 버튼 추가

export default function BestShotScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TopNavBar />

      {/* 텍스트 설명 */}
      <Text style={styles.title}>완성된 사진입니다.{'\n'}저장하거나 공유해볼까요?</Text>

      {/* 이미지 컨테이너 */}
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/images/people.png')} style={styles.image} />
      </View>

      {/* 버튼 컨테이너 */}
      <View style={styles.buttonContainer}>
        <CustomButton title="사진 받기" color="#3DB2FF" onPress={() => router.push('/Makeup/MakeUp_Finish')} />
        <CustomButton title="공유하기" onPress={() => router.push('/Share/Share1')} />
      </View>

      <BottomNavBar />
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
  title: {
    fontSize: 30,
    fontFamily: 'Bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: 330,
    height: 300,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 40,
  },
});

