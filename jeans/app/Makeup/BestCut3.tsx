import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import HalfButton from '../../components/HalfButton'; // ✅ 재사용 버튼 적용

export default function BestShotScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
        <TopNavBar/>
      {/* 텍스트 설명 */}
      <Text style={styles.title}>베스트샷이 완성되었습니다.{'\n'}기본 보정을 해보시겠어요?</Text>

      {/* 이미지 컨테이너 */}
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/images/people.png')} style={styles.image} />
      </View>

      {/* 버튼 컨테이너 */}
      {/* ✅ 버튼 컨테이너 */}
      <View style={styles.buttonContainer}>
        <HalfButton title="아니오" color="#3DB2FF"onPress={() => router.push('/Makeup/MakeUp_Finish')} />
        <HalfButton title="예" onPress={() => router.push('/Makeup/Edit0')} />
      </View>
    
      <BottomNavBar/>
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
    marginBottom: 20, // 이미지와 간격 추가
    marginTop: 30,
  },
  imageContainer: {
    position: 'relative', // 아이콘을 이미지 위에 배치하기 위해 사용
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: 330,
    height: 300,
    borderRadius: 10,
  },
  icon: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 40,
  },
  noButton: {
    flex: 1,
    backgroundColor: '#008DBF',
    paddingVertical: 15,
    marginRight: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  yesButton: {
    flex: 1,
    backgroundColor: '#008DBF',
    paddingVertical: 15,
    marginLeft: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
