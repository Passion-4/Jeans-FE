import { useState } from 'react';

export type Friend = {
  memberId: number;
  name: string;
  profileUrl?: string;
  nickname?: string;
};

export type Team = {
  teamId: number;
  name: string;
  imageUrl?: string;
};

type SelectedItem = Friend | Team;

type SelectedFriendsHook = {
  selectedFriends: SelectedItem[];
  setSelectedFriends: React.Dispatch<React.SetStateAction<SelectedItem[]>>;
  clearSelectedFriends: () => void;
  getSelectedMemberIds: () => number[];  // ✅ 추가
  getSelectedTeamIds: () => number[];    // ✅ 추가
  addFriend: (friend: Friend) => void;   // ✅ 추가
  addTeam: (team: Team) => void;         // ✅ 추가
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

  // ✅ 선택된 memberId 리스트 가져오기
  const getSelectedMemberIds = () => 
    selectedFriends.filter((item): item is Friend => 'memberId' in item).map(friend => friend.memberId);

  // ✅ 선택된 teamId 리스트 가져오기
  const getSelectedTeamIds = () => 
    selectedFriends.filter((item): item is Team => 'teamId' in item).map(team => team.teamId);

  // ✅ 새로운 친구 추가 함수
  const addFriend = (friend: Friend) => {
    updateSelectedFriends([...selectedFriends, friend]);
  };

  // ✅ 새로운 팀 추가 함수
  const addTeam = (team: Team) => {
    updateSelectedFriends([...selectedFriends, team]);
  };

  const clearSelectedFriends = () => {
    globalSelectedFriends = [];
    setSelectedFriends([]);
  };

  return { 
    selectedFriends, 
    setSelectedFriends: updateSelectedFriends, 
    clearSelectedFriends, 
    getSelectedMemberIds,  // ✅ 추가
    getSelectedTeamIds,    // ✅ 추가
    addFriend,             // ✅ 추가
    addTeam                // ✅ 추가
  };
};

export default useSelectedFriends;
