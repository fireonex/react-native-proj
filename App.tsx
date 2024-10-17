import {Button, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View} from 'react-native';
import {ReactElement, ReactNode, useState} from "react";
import {Checkbox} from "expo-checkbox";
import uuid from 'react-native-uuid';


type taskType = {
    id: string;
    title: string;
    isDone: boolean;
}

export default function App() {
    const [name, setName] = useState('');
    const [tasks, setTasks] = useState<taskType[]>([]);


    const addTaskHandler = () => {
        const newTask = {id: uuid.v4().toString(), title: name, isDone: false};
        setTasks([...tasks, newTask]);
        setName('')
    }
    const checkboxOnChangeHandler = (taskId: string) => {
        setTasks(prevTasks => prevTasks.map(task =>
            task.id === taskId ? { ...task, isDone: !task.isDone } : task
        ));
    }
    const deleteTaskHandler = (taskId: string) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id === taskId))
    }

    return (
        <View style={styles.container}>
            <HideKeyboard>
                <View style={{width: '80%', alignItems: 'center', paddingVertical: 20}}>
                    <TextInput value={name} onChangeText={setName}
                               style={styles.input}/>
                </View>
            </HideKeyboard>
            <View style={[globalStyles.button]}>
                <Button color={'#001e1d'} title={'Add task'} onPress={addTaskHandler}/>
            </View>
            <View style={{width: '60%'}}>
                {tasks.map((task: taskType) => {
                    return <View key={task.id} style={[globalStyles.border, styles.boxTask]}>
                        <Checkbox value={task.isDone} onValueChange={() => checkboxOnChangeHandler(task.id)}
                                  style={globalStyles.button}/>
                        <Text style={globalStyles.text}>{task.title}</Text>
                        <Button title={'Delete Task'} color={'#001e1d'} onPress={() => deleteTaskHandler(task.id)}/>
                    </View>
                })}
            </View>
        </View>
    );
}

const HideKeyboard = ({children}: { children: ReactNode }): ReactElement => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={[globalStyles.border]}>
        {children}
    </TouchableWithoutFeedback>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#004643',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#001e1d',
    },
    input: {
        width: '80%',
        backgroundColor: "#e8e4e6",
        padding: 4,
        fontSize: 20,
    },
    boxTask: {
        flexDirection: "row",
        backgroundColor: "#e8e4e6",
        justifyContent: "space-between",
        paddingVertical: 4,
        paddingHorizontal: 20,
        marginVertical: 3
    },
});

const globalStyles = StyleSheet.create({
    border: {
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#001e1d',
    },
    button: {
        backgroundColor: '#f9bc60',
        color: '#001e1d',
    },
    text: {
        color: '#001e1d',
    }
})
