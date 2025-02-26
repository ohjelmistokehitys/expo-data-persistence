import { Paragraph, Screen, Title } from '@/utils/components';
import { Alert, Button, TextInput, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { styles } from '@/utils/styles';

async function readFromStorage(key: string) {
  try {
    return await AsyncStorage.getItem(key);
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

  function saveDraft() {
    saveToStorage(key, text);
  }

  async function loadDraft() {
    const storedValue = await readFromStorage(key);
    if (storedValue) {
      setText(storedValue);
    }
  }

  return <Screen>

    <Title>Async storage</Title>

    <Paragraph>AsyncStorage is asynchronous and persistent key-value pair storage system. AsyncStorage is suitable for storing small data sets like user profiles, settings, or app state.</Paragraph>

    <Paragraph>Try the following field. It will presist the value between app restarts using async storage.</Paragraph>

    <View style={{ gap: 20 }}>
      <TextInput value={text} onChangeText={setText} style={styles.textInput} />
      <Button title="Save draft 💾" onPress={saveDraft} />
      <Button title="Restore draft ↖️" onPress={loadDraft} />
    </View>
  </Screen>;
}
