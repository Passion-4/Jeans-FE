import { useState } from 'react';

type Friend = {
  memberId: number;
  name: string;
  profileUrl?: string;
  nickname?: string;
};

type Team = {
  teamId: number;
  name: string;
  imageUrl?: string;
};

type SelectedItem = Friend | Team;

type SelectedFriendsHook = {
  selectedFriends: SelectedItem[];
  setSelectedFriends: React.Dispatch<React.SetStateAction<SelectedItem[]>>;
  clearSelectedFriends: () => void;
};

// ✅ 글로벌 변수를 사용해 상태 유지 (선택적)
let globalSelectedFriends: SelectedItem[] = [];

const useSelectedFriends = (): SelectedFriendsHook => {
  const [selectedFriends, setSelectedFriends] = useState<SelectedItem[]>(globalSelectedFriends);

  // ✅ 상태 업데이트 시 글로벌 변수도 업데이트
  const updateSelectedFriends: React.Dispatch<React.SetStateAction<SelectedItem[]>> = (newFriends) => {
    globalSelectedFriends = typeof newFriends === 'function' ? newFriends(globalSelectedFriends) : newFriends;
    setSelectedFriends(globalSelectedFriends);
    console.log("🔹 글로벌 상태 업데이트됨:", globalSelectedFriends);
  };

  const clearSelectedFriends = () => {
    globalSelectedFriends = [];
    setSelectedFriends([]);
  };

  return { selectedFriends, setSelectedFriends: updateSelectedFriends, clearSelectedFriends };
};

export default useSelectedFriends;
