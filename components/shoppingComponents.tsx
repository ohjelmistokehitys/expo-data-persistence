import { StyledInput } from "@/utils/components";
import { Item } from "@/utils/shoppingListDatabase";
import { styles } from "@/utils/styles";
import { useState } from "react";
import { Button, FlatList, Pressable, StyleSheet, Text, View } from "react-native";

type FormProps = {
    addItem: (x: Item) => void
};

export function CreateItemForm({ addItem }: FormProps) {
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

export function ShoppingListRow({ item, remove }: RowProps) {
    return <View style={shoppingStyles.row}>
        <Text style={shoppingStyles.itemTitle}>{item.title}</Text>
        <Text style={shoppingStyles.itemAmount}>{item.amount}</Text>
        <Pressable style={shoppingStyles.removeButton} onPress={() => remove(item)}><Text>🗑️</Text></Pressable>
    </View>
}


type TableProps = { items: Item[], removeItem: (x: Item) => void };

export function ShoppingListTable({ items, removeItem }: TableProps) {
    return <FlatList
        data={items}
        style={styles.scrollView}
        renderItem={({ item }) => <ShoppingListRow key={item.id} item={item} remove={removeItem} />}
    />
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