import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import FullButton from '@/components/FullButton';

const quotes = [
  '새해 복 많이 받으세요!', '행복은 마음속에 있어요.', '오늘도 좋은 하루 보내세요!',
  '당신은 소중한 사람입니다.', '매일매일 감사하는 마음으로.', '성공은 준비된 자의 것이다.', '당신의 하루를 응원합니다.'
];

export default function QuoteSelectWordScreen() {
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null);
  const { friendImage } = useLocalSearchParams();
  const router = useRouter();

  const handleConfirm = () => {
    if (selectedQuote) {
      router.push({
        pathname: '/Quote/quote-complete-basic',
        params: { friendImage, quote: selectedQuote },
      });
    }
  };

  return (
    <View style={styles.container}>
      <TopNavBar />
      <Text style={styles.title}>원하는 글귀를 선택하세요.</Text>

      <ScrollView style={styles.quoteList}>
        {quotes.map((quote, index) => (
          <TouchableOpacity
            key={index}
            style={styles.quoteItem}
            onPress={() => setSelectedQuote(quote)}
          >
            <Text style={styles.quoteText}>{quote}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.button}>
        <FullButton title="다 음" onPress={handleConfirm} />
      </View>

      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center', paddingTop: 140 },
  title: { fontSize: 30, fontFamily: 'Bold', textAlign: 'center', marginBottom: 20 },
  quoteList: { height: 300, width: '90%', marginBottom: 50,borderWidth:5,borderRadius:10,borderColor:'#F0F0F0'},
  quoteItem: { paddingVertical: 15, paddingHorizontal: 20, marginBottom: 10, backgroundColor: '#F0F0F0', borderRadius: 10 },
  quoteText: { fontSize: 18, fontFamily: 'Medium', textAlign: 'center' },
  button: { marginBottom: 150, width:'90%' },
});

