import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";

export function useStoredState(key: string): [string, (a: string) => void] {
    const [value, setValue] = useState("");

    useEffect(() => {
        AsyncStorage.getItem(key).then(loaded => {
            setValue(loaded ?? "");
        });
    }, []);

    useEffect(() => {
        AsyncStorage.setItem(key, value);
    }, [value]);

    return [value, setValue];
}
