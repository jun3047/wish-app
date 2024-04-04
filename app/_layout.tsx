import { RecoilRoot } from "recoil";
import StackLayout from "./stackLayout";
import * as amplitude from '@amplitude/analytics-react-native';
import { useEffect } from "react";

  export default () => {

    useEffect(() => {
      amplitude.init('e66caa8537e664f131e86994b19cae12');
      amplitude.track('test: 시작');
    }, []);

    return (
        <RecoilRoot>
          <StackLayout />
        </RecoilRoot>
    );
}