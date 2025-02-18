import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import FullButton from '@/components/FullButton';

const quotes = [
  '새해 복 많이 받으세요!', '행복은 마음속에 있어요.', '오늘도 좋은 하루 보내세요!',
  '당신은 소중한 사람입니다.', '매일매일 감사하는 마음으로.', '성공은 준비된 자의 것이다.', '당신의 하루를 응원합니다.'
];

export default function QuoteSelectWordScreen() {
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null);
  const [customQuote, setCustomQuote] = useState('');
  const [isCustomInputVisible, setIsCustomInputVisible] = useState(false);
  const { imageUri } = useLocalSearchParams();

  const handleSelectQuote = (quote: string) => setSelectedQuote(quote);

  return (
    <View style={styles.container}>
      <TopNavBar />
      <Text style={styles.title}>원하는 글귀를 선택하세요.</Text>
      
      {/* 직접 입력 버튼 */}
      <TouchableOpacity
        style={[styles.quoteItem, isCustomInputVisible && styles.selectedQuote]}
        onPress={() => setIsCustomInputVisible(!isCustomInputVisible)}
      >
        <Text style={styles.quoteText}>직접 입력</Text>
      </TouchableOpacity>
      
      {/* 직접 입력창 */}
      {isCustomInputVisible && (
        <TextInput
          style={styles.input}
          placeholder="직접 입력하세요"
          value={customQuote}
          onChangeText={setCustomQuote}
        />
      )}
      
      {/* 글귀 목록 (스크롤 가능, 처음부터 스크롤바 표시) */}
      <ScrollView
  style={styles.quoteList}
  persistentScrollbar={true}
  showsVerticalScrollIndicator={true}
  contentContainerStyle={styles.scrollContent}
>
  {quotes.map((quote, index) => (
    <TouchableOpacity
      key={index}
      style={[styles.quoteItem, selectedQuote === quote && styles.selectedQuote]}
      onPress={() => handleSelectQuote(quote)}
    >
      <Text style={styles.quoteText}>{quote}</Text>
    </TouchableOpacity>
  ))}
</ScrollView>

<View style={styles.button}>

      <FullButton title='다 음' onPress={() => {}} /></View>
      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingTop: 30,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 120,
  },
  input: {
    width: '90%',
    height: 120,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 15,
    fontSize: 16,
    fontFamily:'Medium'
  },
  quoteItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
  },
  selectedQuote: {
    borderWidth: 3,
    borderColor: '#008DBF',
  },
  quoteText: {
    fontSize: 18,
    fontFamily: 'Medium',
    textAlign: 'center',
  },
  scrollContent: {
    paddingVertical: 10,
  },
  quoteList: {
    height: 300,
    width: '90%',
    marginBottom: 80,
    borderWidth: 4,
    borderColor: '#E0E0E0',
    borderRadius:10
  },
  button : {
    marginBottom:100,
    width:'90%'
  }
  
});
