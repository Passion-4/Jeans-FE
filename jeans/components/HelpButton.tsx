import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HelpOverlay from './HelpOverlay';

export default function HelpButton() {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowHelp(true)} style={styles.button}>
        <Ionicons name="book-outline" size={35} color="black" />
      </TouchableOpacity>

      {showHelp && <HelpOverlay onClose={() => setShowHelp(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start', // 🔹 버튼을 기본적으로 왼쪽 정렬
    marginTop: 20,
    paddingLeft: 20, // 🔹 왼쪽에 여백 추가 (조정 가능)
  },
  button: {
    padding: 10, // 버튼 크기 조정 가능
  },
});

