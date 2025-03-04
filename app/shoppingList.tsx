import { Screen, StyledInput, Title } from "@/utils/components";
import { createDatabase, Item, useShoppingListDatabase } from "@/utils/shoppingListDatabase";
import { styles } from "@/utils/styles";
import { SQLiteProvider } from "expo-sqlite";
import { useState } from "react";
import { Button, FlatList, Pressable, StyleSheet, Text, View } from "react-native";

/**
 * In a more typical setup, the whole app could be wrapped in SQLiteProvider.
 */
export default function SqliteWrapper() {
    return <SQLiteProvider databaseName="shoppingList.sqlite" onInit={createDatabase}>
        <ShoppingList />
    </SQLiteProvider>;
}


function ShoppingList() {
    const { items, addItem, removeItem } = useShoppingListDatabase();

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
    const [inputs, setInputs] = useState<Item>({ title: "", amount: "" });

    const save = () => {
        addItem(inputs);
        setInputs({ title: "", amount: "" });
    }
    return <View>
        <StyledInput placeholder="Item title" value={inputs.title}
            onChangeText={title => setInputs({ ...inputs, title })} />
        <StyledInput placeholder="Amount" value={inputs.amount}
            onChangeText={amount => setInputs({ ...inputs, amount })} />
        <Button title="Save" onPress={() => save()} />
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
        flexGrow: 1,
        marginLeft: 10
    },
    removeButton: {
        width: 40,
        height: 40,
    }
});