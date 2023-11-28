import { atom } from 'recoil';

export const quotesState = atom({
  key: 'Quotes',
  default: [],
});