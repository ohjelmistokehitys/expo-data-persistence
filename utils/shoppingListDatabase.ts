import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite"
import { useEffect, useState } from "react";

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

/**
 * A custom hook to make it easier to write components that utilize SQL operations.
 */
export function useShoppingListDatabase() {
    const db = useSQLiteContext();

    const [items, setItems] = useState<Item[]>([]);

    const addItem = async (newItem: Item) => {
        db.runAsync("INSERT INTO ShoppingList (title, amount) VALUES (?, ?)", newItem.title, newItem.amount);
        getItems();
    }

    const removeItem = async (remove: Item) => {
        db.runAsync("DELETE FROM ShoppingList WHERE id = ?", remove.id!);
        getItems();
    }

    const getItems = async () => {
        const rows = await db.getAllAsync("SELECT * FROM ShoppingList") as Item[];
        setItems(rows);
    }

    useEffect(() => {
        getItems();
    }, []);

    return {
        items,
        addItem,
        removeItem
    }
}
