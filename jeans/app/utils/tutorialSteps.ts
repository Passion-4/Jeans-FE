const tutorialSteps: Record<
  string,
  { x: number; y: number; width: number; height: number; text: string }[]
> = {
  "/Home/main-page": [
    { x: 104, y: 31, width: 75, height: 75, text: "검색 버튼을 누르면 키워드로 \n사진을 검색할 수 있어요." },
    { x: 182, y: 31, width: 75, height: 75, text: "친구 버튼을 누르면 친구와 관련된 설정을 변경할 수 있어요." },
    { x: 260, y: 31, width: 75, height: 75, text: "설정 버튼을 누르면 앱 설정을 변경할 수 있어요." },
    { x: 278, y: 116, width: 75, height: 75, text: "사진 공유 화면으로 넘어가요." },
    { x: 12, y: 189, width: 70, height: 70, text: "각 친구와 공유한 사진을 확인할 수 있어요." },
    { x: 10, y: 295, width: 170, height: 170, text: "사진을 누르면 사진에 대한 정보와 친구와의 대화를 볼 수 있어요." },
    { x: 25, y: 660, width: 105, height: 47, text: "어느 페이지에 있어도 현재 페이지로 돌아와요." },
    { x: 125, y: 623, width: 110, height: 96, text: "원하는 기능을 목소리로 물어보면 해당하는 페이지로 이동해요." },
    { x: 230, y: 660, width: 105, height: 47, text: "사진 편집을 하는 페이지로 이동해요." },
  ],
  "/Home/photo-detail": [
    { x: 11, y: 114, width: 98, height: 98, text: "사진을 크게볼 수 있고 사진 삭제와\n친구들의 반응을 볼 수 있어요." },
    { x: 110, y: 110, width: 240, height: 105, text: "사진에 대한 정보를 볼 수 있어요." },
    { x: 14, y: 221, width: 332, height: 45, text: "사진에 대한 반응을 할 수 있어요." },
    { x: 10, y: 553, width: 225, height: 63, text: "각 친구와 공유한 사진을 확인할 수 있어요." },
    { x: 232, y: 553, width: 121, height: 63, text: "사진을 누르면 사진에 대한 정보와 친구와의 대화를 볼 수 있어요." },
  ],
  "/MakeUp/select-function": [
    { x: 15, y: 312, width: 330, height: 70, text: "단체 사진에서 내가 가장 잘 나온 \n사진을 찾을 수 있어요." },
    { x: 15, y: 393, width: 330, height: 70, text: "사진 기본보정과 추가 보정을 \n시작해요." },
    { x: 15, y: 472, width: 330, height: 70, text: "새해 인사, 명언과 같이 좋은 글귀를 \n예쁜 사진에 담을 수 있어요." },
  ],
  "/MakeUp/advanced-option": [
    { x: 15, y: 268, width: 330, height: 70, text: "나를 젊게 만들 수 있어요." },
    { x: 15, y: 348, width: 330, height: 70, text: "머리에 흰 머리를 지워요." },
    { x: 15, y: 428, width: 330, height: 70, text: "날씬한 모습으로 변신해요." },
    { x: 15, y: 508, width: 330, height: 70, text: "추가 보정을 끝내고 사진을 저장하거나 공유해요." },
  ],
};

export default tutorialSteps;