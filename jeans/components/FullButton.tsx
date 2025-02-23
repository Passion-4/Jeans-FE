import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

// 버튼 Props 타입 정의
interface CustomButtonProps {
  title: string;   // 버튼 텍스트
  onPress: () => void; // 클릭 이벤트
  color?: string;  // 배경색 (기본값 설정 가능)
  textColor?: string; // 텍스트 색상
  loading?: boolean; // ✅ 로딩 상태 추가
  disabled?: boolean; // ✅ disabled 속성 추가
}

// 재사용 가능한 버튼 컴포넌트
const CustomButton: React.FC<CustomButtonProps> = ({ 
  title, 
  onPress, 
  color = '#008DBF', 
  textColor = 'white', 
  loading = false // ✅ 기본값 false
}) => {
  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor: color }, loading && styles.disabledButton]} 
      onPress={!loading ? onPress : undefined} // ✅ 로딩 중이면 클릭 방지
      disabled={loading} // ✅ 로딩 중 비활성화
    >
      {loading ? (
        <ActivityIndicator size="small" color="white" /> // ✅ 로딩 중일 때 인디케이터 표시
      ) : (
        <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#A0CFFF', // ✅ 로딩 중일 때 버튼 색 변경
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Medium',
  },
});

export default CustomButton;
