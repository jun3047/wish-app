import * as Haptics from 'expo-haptics';

const useVibration = () => {
  const vibrate = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return vibrate;
};

export default useVibration;