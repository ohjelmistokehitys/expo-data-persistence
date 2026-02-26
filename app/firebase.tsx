import { database } from "@/firebaseConfig";
import { Paragraph, Screen, Title } from "@/utils/components";
import { styles } from "@/utils/styles";
import { onValue, push, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput } from "react-native";

type Product = { title: string, amount: string };

export default function Index() {

    const [product, setProduct] = useState<Product>({ title: '', amount: '' });
    const [items, setItems] = useState<Product[]>([]);

    function handleSave(p: Product) {
        push(ref(database, "items/"), p);
        setProduct({ title: "", amount: "" });
    }

    useEffect(() => {
        const unsubscribe = onValue(ref(database, "items/"), (snapshot) => {
            console.log(snapshot.val());
            const productList: Product[] = Object.values(snapshot.val());
            setItems(productList);
        });

        // return function to unsubscribe from the listener when the component unmounts
        return unsubscribe;
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

            <TextInput
                placeholder='Product title'
                style={styles.textInput}
                onChangeText={text => setProduct({ ...product, title: text })}
                value={product.title}
            />

            <TextInput
                placeholder='Amount'
                style={styles.textInput}
                onChangeText={text => setProduct({ ...product, amount: text })}
                value={product.amount}
            />

            <Button onPress={() => handleSave(product)} title="Save" />

            <FlatList
                renderItem={({ item }) =>
                    <Text style={styles.listItem}>{item.title}, {item.amount}</Text>
                }
                data={items}
                style={styles.list}
            />
        </Screen >
    );
}

