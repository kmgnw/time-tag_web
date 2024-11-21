import { atom } from 'recoil';

export const membersState = atom({
  key: 'membersState', // 고유 키 (필수)
  default: [],        // 초기값
});

export const roomIdState = atom({
    key: 'roomIdState', // 고유 키 (필수)
    default: 0,        // 초기값
  });