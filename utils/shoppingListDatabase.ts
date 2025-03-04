import { SQLiteDatabase } from "expo-sqlite"

export type Item = {
  id?: number,
  title: string,
  amount: string
}


export async function createDatabase(db: SQLiteDatabase) {
  db.execSync(`CREATE TABLE IF NOT EXISTS ShoppingList (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    amount TEXT NOT NULL
  );`)
}