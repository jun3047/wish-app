import { UserType } from '../@type/user';
import useSyncAppData from './useSyncAppData';

const USER_ATOM_KEY = 'userInfoLocalState';
const USER_INFO_KEY = 'userInfo';

export default function useUser() {
  const [user, setUser, loadUser] = useSyncAppData<UserType>(USER_ATOM_KEY, USER_INFO_KEY, null);
  return [user, setUser, loadUser] as const;
}