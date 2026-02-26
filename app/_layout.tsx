import { Stack } from "expo-router";
import { SQLiteDatabase, SQLiteProvider } from 'expo-sqlite';


export default function RootLayout() {

    const initialize = async (db: SQLiteDatabase) => {
        try {
            await db.execAsync('CREATE TABLE IF NOT EXISTS course (id INTEGER PRIMARY KEY NOT NULL, credits INT, title TEXT);');
        } catch (error) {
            console.error('Could not open database', error);
        }
    }

    return (
        <SQLiteProvider databaseName="coursedb" onInit={initialize}>
            <Stack />
        </SQLiteProvider>
    );
}
