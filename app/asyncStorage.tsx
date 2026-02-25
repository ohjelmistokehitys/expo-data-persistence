import { Paragraph, Screen, Title } from '@/utils/components';
import { styles } from '@/utils/styles';
import { useState } from 'react';
import { TextInput } from "react-native";


export default function Index() {

    const [text, setText] = useState("");

    return <Screen>

        <Title>Async storage</Title>

        <Paragraph>AsyncStorage is asynchronous and persistent key-value pair storage system. AsyncStorage is suitable for storing small data sets like user profiles, settings, or app state.</Paragraph>

        <Paragraph>Try the following field. It will presist the value between app restarts using async storage:</Paragraph>

        <TextInput
            placeholder="Write a message"
            value={text}
            onChangeText={setText} style={styles.textInput}
        />

    </Screen>;
}

