import { CreateItemForm, ShoppingListTable } from "@/components/shoppingComponents";
import { database } from "@/firebaseConfig";
import { Paragraph, Screen, Title } from "@/utils/components";
import { Item } from "@/utils/shoppingListDatabase";
import { onValue, push, ref, remove } from "firebase/database";
import { useEffect, useState } from "react";


export default function Index() {

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
        setItems(itemsWithId as Item[]);
      } else {
        setItems([]);
      }

    })
  }, []);


  return (
    <Screen>
      <Title>Firebase</Title>
      <Paragraph>
        Firebase is a platform developed by Google that provides a variety of tools and services for building and managing mobile and web applications.
      </Paragraph>
      <Paragraph>
        Firebase provides Realtime Database that is NoSQL cloud database. Data is stored as JSON and synchronized in realtime to every connected client.
      </Paragraph>

      <CreateItemForm addItem={handleSave} />
      <ShoppingListTable items={items} removeItem={removeItem} />
    </Screen>
  );
}
