import { PollType } from '../@type/poll';
import useSyncAppData from './useSyncAppData';


const POLL_ATOM_KEY = 'pollInfoLocalState';
const POLL_INFO_KEY = 'pollInfo';

export default function usePoll() {
  const [poll, setPoll] = useSyncAppData<PollType>(POLL_ATOM_KEY, POLL_INFO_KEY, null);
  return [poll, setPoll] as const
}