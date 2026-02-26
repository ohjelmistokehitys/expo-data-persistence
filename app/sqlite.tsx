import { Paragraph, Screen, Title } from "@/utils/components";
import { useStoredState } from "@/utils/hooks";
import { styles } from "@/utils/styles";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";


type Course = {
    id: number,
    title: string,
    credits: string
}

export default function CourseList() {
    const [title, setTitle] = useStoredState('course-title');
    const [credit, setCredit] = useStoredState('course-credits');

    const [courses, setCourses] = useState<Course[]>([]);

    const db = useSQLiteContext();

    useEffect(() => {
        updateList();
    }, []);

    const saveCourse = async () => {
        try {
            await db.runAsync('INSERT INTO course (title, credits) VALUES (?, ?)', title, credit);
        } catch (error) {
            console.error('Could not add item', error);
        }

        updateList();
    };

    const updateList = async () => {
        try {
            const list = await db.getAllAsync<Course>('SELECT * from course');
            setCourses(list);
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
                SQLite is light-weight SQL database and it is built into both Android and iOS devices. expo-sqlite is the library that gives an access to SQLite database on the device.
            </Paragraph>

            <TextInput
                placeholder='Course title'
                style={styles.textInput}
                onChangeText={setTitle}
                value={title} />

            <TextInput
                placeholder='Credits'
                style={styles.textInput}
                keyboardType='numeric'
                onChangeText={setCredit}
                value={credit} />

            <Button onPress={saveCourse} title="Save" />

            <FlatList
                renderItem={({ item }) =>
                    <View style={styles.listItem}>
                        <Text>{item.title}, {item.credits}</Text>
                        <Text style={{ color: '#ff0000' }} onPress={() => deleteItem(item.id)}>Delete</Text>
                    </View>
                }
                data={courses}
                style={styles.list}
            />
        </Screen>
    );
}

