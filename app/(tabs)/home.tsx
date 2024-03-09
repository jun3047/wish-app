import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { shareInsta } from '../hooks/instaShare';
import useVibration from '../hooks/useVibration';
import useImagePicker from '../hooks/useImagePicker';
import useContacts from '../hooks/useContacts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Update from "expo-updates";

export default () => {

    const {image, pickImage} = useImagePicker()
    const vibrate = useVibration()
    const { contacts, loading, getContacts } = useContacts()

    const delUserInfo = async () => {
        await AsyncStorage.removeItem('userInfo')
        await Update.reloadAsync()
    }
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Tab One</Text>
        <TouchableOpacity 
          onPress={delUserInfo}
          style={styles.container}
        >
          <Text>del userInfo</Text>
          <Text>{image}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={pickImage}
          style={styles.container}
        >
          <Text>Open Camera Roll</Text>
          <Text>{image}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={vibrate}
          style={styles.container}
        >
          <Text>vibrate</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={()=>shareInsta(image)}
          style={styles.container}
        >
          <Text>shareInsta</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={getContacts}
          style={styles.container}
        >
          <Text>getContacts</Text>
          <Text>{contacts.length}</Text>
          <Text>{contacts[0]?.phone}</Text>
          <Text>{contacts[0]?.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});