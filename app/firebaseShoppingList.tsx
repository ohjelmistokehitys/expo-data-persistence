import { CreateItemForm, ShoppingListTable } from "@/components/shoppingComponents";
import { database } from "@/firebaseConfig";
import { Screen, Title } from "@/utils/components";
import { Item } from "@/utils/shoppingListDatabase";
import { onValue, push, ref, remove } from "firebase/database";
import { useEffect, useState } from "react";


export default function FirebaseShoppingList() {
    const { items, handleSave, removeItem } = useFirebaseShoppingList();

    return (
        <Screen>
            <Title>Firebase shopping list</Title>

            <CreateItemForm addItem={handleSave} />
            <ShoppingListTable items={items} removeItem={removeItem} />
        </Screen>
    );
}

function useFirebaseShoppingList() {
    const [items, setItems] = useState<Item[]>([]);

    const handleSave = (item: Item) => {
        push(ref(database, "items/"), item);
    }

    const removeItem = (item: Item) => {
        remove(ref(database, "items/" + item.id));
    }

    useEffect(() => {
        return onValue(ref(database, "items/"), (snapshot) => {
            const data = snapshot.val() as Record<string, Item>;

            if (data) {
                // put the id in each object:
                const itemsWithId = Object.entries(data).map(([id, item]) => ({ ...item, id }));
                setItems(itemsWithId);
            } else {
                setItems([]);
            }

        });
    }, []);

    return {
        items, handleSave, removeItem
    }
}