import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

const useImagePicker = () => {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const {assets} = result

    if (!assets || assets.length === 0) return;
    
    if (!result.canceled) {
      setImage(assets[0].uri);
    }
  };

  return { image, pickImage };
};

export default useImagePicker;