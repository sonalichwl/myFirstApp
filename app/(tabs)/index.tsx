import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TodoInput from '../../components/Todo/TodoInput';
import TodoList from '../../components/Todo/TodoList';
import { TodoProvider } from '../../store/TodoContext';

export default function TodoScreen() {
    return (
        <TodoProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>My Todos</Text>
                    <TodoInput />
                    <TodoList />
                </View>
            </SafeAreaView>
        </TodoProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        padding: 20,
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
});
