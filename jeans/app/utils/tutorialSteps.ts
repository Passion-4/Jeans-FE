const tutorialSteps: Record<
  string,
  { x: number; y: number; width: number; height: number; text: string }[]
> = {
  "/Home/main-page": [
    { x: 203, y: 26, width: 50, height: 45, text: "검색 버튼을 누르면 사진을 검색할 수 있습니다." },
    { x: 251, y: 26, width: 50, height: 45, text: "친구 버튼을 누르면 친구와 관련된 설정을 변경할 수 있습니다." },
    { x: 301, y: 26, width: 50, height: 45, text: "설정 버튼을 누르면 앱 설정을 변경할 수 있습니다." },
    { x: 272, y: 85, width: 80, height: 55, text: "사진 공유 화면으로 넘어갑니다." },
    { x: 10, y: 175, width: 75, height: 63, text: "각 친구와 공유한 사진을 확인할 수 있어요!" },
    { x: 10, y: 275, width: 180, height: 180, text: "사진을 누르면 사진에 대한 정보와 친구와의 대화를 볼 수 있어요!" },
  ],
  "/Makeup/Makeup0": [
    { x: 10, y: 298, width: 340, height: 70, text: "단체 사진에서 내가 최고로 잘 나온 사진을 찾을 수 있어요." },
    { x: 10, y: 377, width: 340, height: 70, text: "사진 보정을 시작해요." },
    { x: 10, y: 456, width: 340, height: 70, text: "잘 나온 사진을 모아서 한번에 볼 수 있어요." },
  ],
  "/Makeup/Edit1": [
    { x: 10, y: 257, width: 340, height: 70, text: "젊은 나의 모습을 볼 수 있어요." },
    { x: 10, y: 336, width: 340, height: 70, text: "머리에 흰 머리를 지워요." },
    { x: 10, y: 415, width: 340, height: 70, text: "날씬한 모습을 변신해요." },
    { x: 10, y: 494, width: 340, height: 70, text: "추가 보정을 끝내고 사진을 저장하거나 공유해요." },
  ],
};

export default tutorialSteps;