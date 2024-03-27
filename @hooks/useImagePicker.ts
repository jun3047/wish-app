import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';

const useImagePicker = () => {

  const [image, setImage] = useState<string | null>(null);
  const [isAutoSelect, setIsAutoSelect] = useState(true);

  const initImage = async () => {

    const { status } = await MediaLibrary.requestPermissionsAsync();

    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const assets = await MediaLibrary.getAssetsAsync({
      first: 1,
      mediaType: MediaLibrary.MediaType.photo,
    });

    if (assets.assets.length > 0) {
      setImage(assets.assets[0].uri);
    }
  };

  useEffect(() => {
    initImage()
  }, []);

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

    setIsAutoSelect(false);
  };

  return { image, pickImage, isAutoSelect };
};

export default useImagePicker;