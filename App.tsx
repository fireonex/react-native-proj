import {Button, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View} from 'react-native';
import {ReactElement, ReactNode, useState} from "react";
import {Checkbox} from "expo-checkbox";
import {Input} from "./input/Input";
import {globalStyles} from "./global-styles";


type taskType = {
    id: string;
    title: string;
    isDone: boolean;
}

export default function App() {
    const [value, setValue] = useState('');
    const [tasks, setTasks] = useState<taskType[]>([]);
    const [show, setShow] = useState('');
    const [error, setError] = useState<string | null>(null);


    const addTaskHandler = () => {
        if (value === '') {
            setError('Title is required');
            return
        }
        const newTask = {id: `${tasks.length + 1 + new Date().getTime()}`, title: value, isDone: false};
        setTasks([...tasks, newTask]);
        setValue('')
        setError(null);
    }
    const checkboxOnChangeHandler = (taskId: string) => {
        setTasks(prevTasks => prevTasks.map(task =>
            task.id === taskId ? {...task, isDone: !task.isDone} : task
        ));
    }

    const changeTitleHandler = (taskId: string, title: string) => {
        setTasks(prevTasks => prevTasks.map(task => task.id === taskId ? {...task, title} : task))
    }
    const deleteTaskHandler = (taskId: string) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId))
    }

    return (
        <View style={styles.container}>
            <HideKeyboard>
                <View style={{width: '80%', alignItems: 'center', paddingVertical: 20}}>
                    <TextInput value={value} onChangeText={setValue}
                               style={styles.input}/>
                </View>
            </HideKeyboard>
            <View style={[globalStyles.button]}>
                <Button color={'#001e1d'} title={'Add task'} onPress={addTaskHandler}/>
            </View>
            <View style={{width: '60%'}}>
                {tasks.map((task: taskType) => {
                    return <View key={task.id} style={[globalStyles.border, styles.boxTask]}>
                        <Checkbox
                            value={task.isDone}
                            onValueChange={() => checkboxOnChangeHandler(task.id)}
                            style={styles.checkbox}
                        />
                        {show === task.id ? (
                            <Input setShow={setShow} title={task.title} taskId={task.id} changeTitle={changeTitleHandler} />
                        ) : (
                            <Text
                                onPress={() => setShow(task.id)}
                                style={[globalStyles.text, styles.taskText]}
                            >
                                {task.title}
                            </Text>
                        )}
                        <Button title={'X'} color={'#001e1d'} onPress={() => deleteTaskHandler(task.id)} />
                    </View>
                })}
            </View>
            <Text style={globalStyles.errorText}>{error}</Text>
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
        alignItems: "center",
        backgroundColor: "#e8e4e6",
        paddingVertical: 4,
        paddingHorizontal: 10,
        marginVertical: 3,
    },
    taskText: {
        flex: 1,
        marginHorizontal: 10,
        color: '#001e1d',
    },
    checkbox: {
        marginRight: 10,
    },
});

