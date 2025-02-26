import { Paragraph, Screen, Title } from "@/utils/components";
import { styles } from "@/utils/styles";
import { openDatabaseSync } from 'expo-sqlite';
import { useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";

const db = openDatabaseSync('coursedb');

const initialize = async () => {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS course (id INTEGER PRIMARY KEY NOT NULL, credits INT, title TEXT);
    `);
  } catch (error) {
    console.error('Could not open database', error);
  }
}

type Course = {
  id: number,
  title: string,
  credits: string
}

export default function Index() {
  const [credit, setCredit] = useState('');
  const [title, setTitle] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    initialize();
    updateList();
  }, []);

  const saveItem = async () => {
    try {
      await db.runAsync('INSERT INTO course (title, credits) VALUES (?, ?)', title, credit);
    } catch (error) {
      console.error('Could not add item', error);
    }

    updateList();
  };

  const updateList = async () => {
    try {
      const list = await db.getAllAsync('SELECT * from course');
      setCourses(list as Course[]);
    } catch (error) {
      console.error('Could not get items', error);
    }
  }

  const deleteItem = async (id: number) => {
    try {
      await db.runAsync('DELETE FROM course WHERE id=?', id);
      await updateList();
    }
    catch (error) {
      console.error('Could not delete item', error);
    }
  }

  return (
    <Screen>
      <Title>SQLite</Title>
      <Paragraph>
        SQLite is light-weight SQL database and it is built into both Android and iOS devices.expo-sqlite is the library that gives an access to SQLite database on the device.
      </Paragraph>

      <TextInput
        placeholder='Title'
        style={styles.textInput}
        onChangeText={setTitle}
        value={title} />
      <TextInput
        placeholder='Credits'
        style={styles.textInput}
        keyboardType='numeric'
        onChangeText={setCredit}
        value={credit} />
      <Button onPress={saveItem} title="Save" />

      <FlatList
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) =>
          <View>
            <Text>{item.title}</Text>
            <Text>{item.credits} </Text>
            <Text style={{ color: '#ff0000' }} onPress={() => deleteItem(item.id)}>Delete</Text>
          </View>
        }
        data={courses}
      />
    </Screen>
  );
}
