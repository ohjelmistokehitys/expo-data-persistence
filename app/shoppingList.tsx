import { Screen, Title } from "@/utils/components";
import { createDatabase, useShoppingListDatabase } from "@/utils/shoppingListDatabase";
import { SQLiteProvider } from "expo-sqlite";
import { CreateItemForm, ShoppingListTable } from "@/components/shoppingComponents";

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
        <ShoppingListTable items={items} removeItem={removeItem} />
    </Screen>
}

