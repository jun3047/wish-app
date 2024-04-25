import { atom } from 'recoil';
import { UserType } from '../@type/user';
import { PollType } from '../@type/poll';

interface UserRegisterState {
  token: string;
  name: string;
  age: number;
  phone: string;
  gender: '남자' | '여자';
  school?: string;
  schoolLocation?: string;
}

export const userState = atom<UserRegisterState>({
  key: 'userState',
  default: {
    token: '',
    name: '',
    age: 0,
    phone: '',
    gender: '남자',
    school: undefined,
    schoolLocation: undefined,
  },
});