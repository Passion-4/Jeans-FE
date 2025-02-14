import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// 버튼 Props 타입 정의
interface CustomButtonProps {
  title: string;   // 버튼 텍스트
  onPress: () => void; // 클릭 이벤트
  color?: string;  // 배경색 (기본값 설정 가능)
  textColor?: string; // 텍스트 색상
}

// 재사용 가능한 버튼 컴포넌트
const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, color = '#008DBF', textColor = 'white' }) => {
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
    width: '100%',
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Medium',
  },
});

export default CustomButton;
