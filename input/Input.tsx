import {Button, StyleSheet, TextInput, View} from "react-native";
import {useState} from "react";
import {globalStyles} from "../global-styles";

type Props = {
    taskId: string;
    title: string;
    changeTitle: (taskId: string, title: string) => void;
    setShow: (taskId: string) => void;
};

export function Input({title, changeTitle, taskId, setShow}: Props) {
    const [value, setValue] = useState(title);
    const changeTitleHandler = (title: string) => {
        setValue(title);
    }
    return (
        <View style={styles.inputContainer}>
            <TextInput
                value={value}
                onChangeText={(title: string) => changeTitleHandler(title)}
                style={[styles.input, globalStyles.border]}
            />
            <Button color={'#001e1d'} title={'+'} onPress={() => {
                changeTitle(taskId, value)
                setShow('')
            }} />
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    input: {
        flex: 1,
        backgroundColor: "#e8e4e6",
        padding: 4,
        fontSize: 20,
        marginRight: 10,
    }
});
