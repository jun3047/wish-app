import { atom } from 'recoil';

interface UserRegisterState {
  token: string;
  name: string;
  age: number;
  phone: string;
  gender: 'boy' | 'girl';
  school?: string;
  schoolLocation?: string;
  requestFriendIds?: number[];
}

export const userState = atom<UserRegisterState>({
  key: 'userState',
  default: {
    token: '',
    name: '',
    age: 0,
    phone: '',
    gender: 'boy',
    school: undefined,
    schoolLocation: undefined,
    requestFriendIds: [],
  },
});