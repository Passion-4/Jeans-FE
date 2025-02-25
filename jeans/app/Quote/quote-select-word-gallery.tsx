import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons'; // ✅ 아이콘 추가
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';

const quotesDictionary = {
  건강: ['건강은 최고의 재산이다.', '몸이 건강해야 마음도 건강하다.', '오늘도 건강한 하루 되세요!'],
  응원: ['당신의 꿈을 응원합니다!', '포기하지 마세요, 당신은 해낼 수 있어요!', '앞으로 나아가는 당신이 멋져요.'],
  안부: ['잘 지내시죠? 항상 응원합니다.', '따뜻한 하루 보내세요!', '오늘도 행복하세요!'],
  위로: ['괜찮아요, 당신은 충분히 잘하고 있어요.', '힘든 날도 지나가요.', '여기서 잠시 쉬어가요.'],
  축하: ['축하합니다! 행복한 날 되세요.', '당신의 성취를 축하해요!', '오늘은 당신을 위한 날이에요!'],
  명언: ['"성공은 준비된 자에게 온다." - 파스퇴르', '"노력은 배신하지 않는다." - 손흥민', '"꿈을 꾸는 사람이 세상을 바꾼다." - 앨런 케이']
} as const;

// ✅ 키워드별 아이콘 매핑
const iconDictionary = {
  건강: 'favorite', // ❤️ 심장 (MaterialIcons)
  응원: 'thumb-up', // 👍 응원
  안부: 'message', // 💬 메시지
  위로: 'sentiment-satisfied', // 😊 위로
  축하: 'celebration', // 🎉 축하
  명언: 'lightbulb', // 💡 명언 (아이디어)
} as const;

// ✅ 키워드별 아이콘 색상 매핑
const iconColorDictionary = {
  건강: '#E74C3C', // 빨강
  응원: '#3498DB', // 파랑
  안부: '#2ECC71', // 초록
  위로: '#F39C12', // 주황
  축하: '#9B59B6', // 보라
  명언: '#E67E22', // 오렌지
} as const;

export default function QuoteSelectWordScreen() {
  const { imageUri } = useLocalSearchParams();
  const router = useRouter();
  const keywords = Object.keys(quotesDictionary) as (keyof typeof quotesDictionary)[];

  return (
    <View style={styles.container}>
      <TopNavBar />
      <Text style={styles.title}>원하는 글귀 키워드를 선택하세요.</Text>

      {/* 한 줄에 2개씩 배치 */}
      <FlatList
        data={keywords}
        keyExtractor={(item) => item}
        numColumns={2}
        contentContainerStyle={styles.quoteList}
        renderItem={({ item }) => {
          const randomQuote = quotesDictionary[item][
            Math.floor(Math.random() * quotesDictionary[item].length)
          ];

          return (
            <TouchableOpacity
              style={styles.quoteItem}
              onPress={() => router.push({ pathname: '/Quote/quote-complete-gallery', params: { imageUri, quote: randomQuote } })}
            >
              {/* ✅ 아이콘과 키워드를 가로 정렬 */}
              <View style={styles.quoteContent}>
                <MaterialIcons name={iconDictionary[item]} size={24} color={iconColorDictionary[item]} style={styles.icon} />
                <Text style={styles.quoteText}>{item}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center', paddingTop: 200 },
  title: { fontSize: 30, fontFamily: 'Bold', textAlign: 'center', marginBottom: 20 },
  quoteList: { width: '80%', alignSelf: 'center' },
  quoteItem: { 
    width: '40%', 
    paddingVertical: 15, 
    margin: 10, 
    backgroundColor: '#F0F0F0', 
    borderRadius: 10, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  quoteContent: { 
    flexDirection: 'row',  // ✅ 아이콘과 텍스트를 가로로 정렬
    alignItems: 'center',
  },
  icon: { 
    marginRight: 8, // ✅ 아이콘과 텍스트 사이 간격 추가
  },
  quoteText: { fontSize: 18, fontFamily: 'Medium', textAlign: 'center' },
});
