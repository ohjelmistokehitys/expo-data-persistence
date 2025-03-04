import { Paragraph, Screen, StyledInput, Title } from "@/utils/components";
import { createDatabase, Item } from "@/utils/shoppingListDatabase";
import { styles } from "@/utils/styles";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Button, FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

/**
 * In a more typical setup, the whole app could be wrapped in SQLiteProvider.
 */
export default function SqliteWrapper() {
    return <SQLiteProvider databaseName="shoppingList.sqlite" onInit={createDatabase}>
        <ShoppingList />
    </SQLiteProvider>;
}


function ShoppingList() {
    const [items, setItems] = useState<Item[]>([]);
    const db = useSQLiteContext();

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
        console.log(rows);
    }

    useEffect(() => {
        getItems();
    }, []);

    return <Screen>
        <Title>Shopping list</Title>

        <CreateItemForm addItem={addItem} />

        <FlatList
            data={items}
            style={styles.scrollView}
            renderItem={({ item }) => <ShoppingListRow key={item.id} item={item} remove={removeItem} />}
        />
    </Screen>
}

type FormProps = {
    addItem: (x: Item) => void
};

function CreateItemForm({ addItem }: FormProps) {
    const [item, setItem] = useState<Item>({ title: "", amount: "" });

    return <View>
        <StyledInput placeholder="Item title" value={item.title} onChangeText={title => setItem({ ...item, title })} />
        <StyledInput placeholder="Amount" value={item.amount} onChangeText={amount => setItem({ ...item, amount })} />
        <Button title="Save" onPress={() => addItem(item)} />
    </View>

}

type RowProps = {
    item: Item,
    remove: (x: Item) => void
}
function ShoppingListRow({ item, remove }: RowProps) {
    return <View style={shoppingStyles.row}>
        <Text style={shoppingStyles.itemTitle}>{item.title}</Text>
        <Text style={shoppingStyles.itemAmount}>{item.amount}</Text>
        <Pressable style={shoppingStyles.removeButton} onPress={() => remove(item)}><Text>🗑️</Text></Pressable>
    </View>
}


const shoppingStyles = StyleSheet.create({
    row: {
        flexDirection: "row",
        paddingVertical: 10
    },
    itemTitle: {
        fontWeight: "bold",
    },
    itemAmount: {
        flexGrow: 1
    },
    removeButton: {
        width: 40,
        height: 40,
    }
});