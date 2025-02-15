const tutorialSteps: Record<
  string,
  { x: number; y: number; width: number; height: number; text: string }[]
> = {
  "/Home/Mainpage": [
    { x: 40, y: 15, width: 50, height: 45, text: "검색 버튼을 누르면 친구를 검색할 수 있습니다." },
    { x: 90, y: 15, width: 50, height: 45, text: "친구 버튼을 누르면 친구 설정을 변경할 수 있습니다." },
    { x: 140, y: 15, width: 50, height: 45, text: "설정 버튼을 누르면 앱 설정을 변경할 수 있습니다." },
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
