import { Paragraph, Screen, Title } from '@/utils/components';
import { Alert, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { styles } from '@/utils/styles';

async function readFromStorage(key: string) {
  try {
    let value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    Alert.alert('Error when reading data');
    throw error;
  }
}

async function saveToStorage(key: string, value: string) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    Alert.alert('Error when saving data');
    throw error;
  }
}


export default function Index() {
  const key = "storage-key";

  const [text, setText] = useState("");

  // on first load, we read the text from storage:
  useEffect(() => {
    readFromStorage(key).then(storedValue => {
      if (storedValue) {
        setText(storedValue)
      }
    });
  }, []);

  // every time the text changes, update it in store:
  useEffect(() => {
    saveToStorage(key, text);
  }, [text]);

  return <Screen>

    <Title>Async storage</Title>

    <Paragraph>AsyncStorage is asynchronous and persistent key-value pair storage system. AsyncStorage is suitable for storing small data sets like user profiles, settings, or app state.</Paragraph>

    <Paragraph>Try the following field. It will presist the value between app restarts using async storage.</Paragraph>

    <TextInput value={text} onChangeText={setText} style={styles.textInput} />
  </Screen>;
}
