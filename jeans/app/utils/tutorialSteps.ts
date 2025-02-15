const tutorialSteps: Record<
  string,
  { x: number; y: number; width: number; height: number; text: string }[]
> = {
  "/Home/Mainpage": [
    { x: 233, y: 15, width: 50, height: 45, text: "검색 버튼을 누르면 친구를 검색할 수 있습니다." },
    { x: 285, y: 15, width: 50, height: 45, text: "친구 버튼을 누르면 친구 설정을 변경할 수 있습니다." },
    { x: 335, y: 15, width: 50, height: 45, text: "설정 버튼을 누르면 앱 설정을 변경할 수 있습니다." },
    { x: 307, y: 82, width: 80, height: 55, text: "공유 화면으로 넘어갑니다." },
    { x: 10, y: 175, width: 70, height: 65, text: "친구와 공유한 사진을 확인할 수 있어요!" },
    { x: 10, y: 275, width: 180, height: 180, text: "사진을 누르면 사진에 대한 정보와 친구와의 대화를 볼 수 있어요!" },
  ],
  "/Friend/list": [
    { x: 20, y: 200, width: 300, height: 60, text: "여기에서 친구 목록을 확인할 수 있습니다." },
    { x: 150, y: 500, width: 200, height: 50, text: "별명 만들기를 눌러 친구에게 별명을 설정하세요." },
  ],
  "/Share/Share1": [
    { x: 50, y: 300, width: 200, height: 50, text: "여기서 사진을 선택할 수 있습니다." },
  ],
};

export default tutorialSteps;
