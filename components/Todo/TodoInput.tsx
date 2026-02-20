import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTodos } from '../../hooks/useTodos';

const TodoInput = () => {
    const [text, setText] = useState('');
    const { addTodo } = useTodos(); // Changed from useTodoContext to useTodos hook

    const handleAddTodo = () => {
        if (text.trim()) {
            addTodo(text);
            setText('');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Add a new todo..."
                value={text}
                onChangeText={setText}
            />
            <TouchableOpacity style={styles.button} onPress={handleAddTodo}>
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        fontSize: 16, // Standard size to prevent iOS auto-zoom
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default TodoInput;
