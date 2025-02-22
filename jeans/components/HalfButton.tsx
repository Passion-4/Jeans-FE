import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// 버튼 Props 타입 정의
interface HalfButtonProps {
  title: string;
  onPress: () => void;
  color?: string;
  textColor?: string;
}

const HalfButton: React.FC<HalfButtonProps> = ({ title, onPress, color = '#008DBF', textColor = 'white' }) => {
  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1, // 버튼 너비 균등 배분
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5, // 버튼 간격
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Medium',
  },
});

export default HalfButton;
