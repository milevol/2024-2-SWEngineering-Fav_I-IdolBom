// src/atoms/userAtom.ts
import { atom } from 'recoil';

export const kakaoUserIDState = atom<number | null>({
  key: 'kakaoUserIDState',
  default: null,
});