import { atom } from 'recoil';
import { UserType } from '../type/user';
import { PollType } from '../type/poll';

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

export const loaclUserInfoState = atom<UserType>({
  key: 'userInfoState',
  default: null,
});

export const loaclPollInfoState = atom<PollType>({
  key: 'pollInfoState',
  default: null,
});