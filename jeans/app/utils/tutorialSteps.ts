const tutorialSteps: Record<
  string,
  { x: number; y: number; width: number; height: number; text: string }[]
> = {
  "/Home/main-page": [
    { x: 203, y: 26, width: 50, height: 45, text: "검색 버튼을 누르면 키워드로 \n사진을 검색할 수 있어요." },
    { x: 251, y: 26, width: 50, height: 45, text: "친구 버튼을 누르면 친구와 관련된 설정을 변경할 수 있어요." },
    { x: 301, y: 26, width: 50, height: 45, text: "설정 버튼을 누르면 앱 설정을 변경할 수 있어요." },
    { x: 272, y: 85, width: 80, height: 55, text: "사진 공유 화면으로 넘어가요." },
    { x: 10, y: 175, width: 75, height: 63, text: "각 친구와 공유한 사진을 확인할 수 있어요." },
    { x: 10, y: 275, width: 170, height: 170, text: "사진을 누르면 사진에 대한 정보와 친구와의 대화를 볼 수 있어요." },
  ],
  "/MakeUp/select-function": [
    { x: 10, y: 290, width: 338, height: 65, text: "단체 사진에서 내가 최고로 잘 나온 사진을 찾을 수 있어요." },
    { x: 10, y: 365, width: 338, height: 65, text: "사진 기본보정과 추가 보정을 \n시작해요." },
    { x: 10, y: 441, width: 338, height: 65, text: "잘 나온 사진을 모아서 한번에 볼 수 있어요." },
  ],
  "/MakeUp/advanced-option": [
    { x: 10, y: 245, width: 340, height: 65, text: "나를 젊게 만들 수 있어요." },
    { x: 10, y: 321, width: 340, height: 65, text: "머리에 흰 머리를 지워요." },
    { x: 10, y: 397, width: 340, height: 65, text: "날씬한 모습으로 변신해요." },
    { x: 10, y: 472, width: 340, height: 65, text: "추가 보정을 끝내고 사진을 저장하거나 공유해요." },
  ],
};

export default tutorialSteps;