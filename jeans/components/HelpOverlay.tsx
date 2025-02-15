import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { usePathname } from 'expo-router';
import Svg, { Rect, Mask, Defs } from 'react-native-svg';
import tutorialSteps from '../app/utils/tutorialSteps'; // 🔹 tutorialSteps 데이터 가져오기

export default function HelpOverlay({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  const [step, setStep] = useState(0);
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  // 현재 페이지의 튜토리얼 데이터 가져오기
  const steps = tutorialSteps[pathname] || [];
  const currentStep = steps[step];

  if (!currentStep) {
    onClose();
    return null;
  }

  return (
    <View style={styles.overlay}>
      <Svg height={screenHeight} width={screenWidth} style={styles.svgContainer}>
        <Defs>
          <Mask id="mask" x="0" y="0" width={screenWidth} height={screenHeight}>
            {/* 전체 화면을 검은색(어둡게) 처리 */}
            <Rect x="0" y="0" width={screenWidth} height={screenHeight} fill="white" />
            {/* 설명할 부분만 하얀색으로 처리하여 강조 */}
            <Rect
              x={currentStep.x}
              y={currentStep.y}
              width={currentStep.width}
              height={currentStep.height}
              fill="black"
              rx={15} ry={15} // 모서리 둥글게
            />
          </Mask>
        </Defs>

        {/* 전체 화면을 검은색으로 덮되, 마스크 영역만 투명하게 처리 */}
        <Rect
          x="0"
          y="0"
          width={screenWidth}
          height={screenHeight}
          fill="black"
          mask="url(#mask)"
          opacity="0.7"
        />
        {/* 하이라이트된 영역에 테두리 추가 */}
        <Rect
          x={currentStep.x}
          y={currentStep.y}
          width={currentStep.width}
          height={currentStep.height}
          fill="transparent"
          stroke="#008DBF"
          strokeWidth={2}
          rx={15} ry={15} // 모서리 둥글게
        />
      </Svg>

      {/* 설명 박스 */}
      <View
        style={[
          styles.tooltip,
          {
            top:
              currentStep.y + currentStep.height + 50 > screenHeight
                ? currentStep.y - 80
                : currentStep.y + currentStep.height + 10,
            left: currentStep.x > screenWidth - 250 ? screenWidth - 270 : currentStep.x,
          },
        ]}
      >
        <Text style={styles.tooltipText}>{currentStep.text}</Text>
        <TouchableOpacity style={styles.nextButton} onPress={() => setStep(step + 1)}>
          <Text style={styles.nextText}>{step < steps.length - 1 ? '다음' : '닫기'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    width: 250,
  },
  tooltipText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
  },
  nextButton: {
    backgroundColor: '#008DBF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  nextText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
