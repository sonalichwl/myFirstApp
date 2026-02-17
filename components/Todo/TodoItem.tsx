import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTodos } from '../../hooks/useTodos';
import { Todo } from '../../store/TodoContext';

interface TodoItemProps {
    todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
    const { toggleTodo, deleteTodo } = useTodos();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.todoTextContainer} onPress={() => toggleTodo(todo.id)}>
                <Ionicons
                    name={todo.completed ? 'checkbox' : 'square-outline'}
                    size={24}
                    color={todo.completed ? '#007AFF' : '#ccc'}
                />
                <Text style={[styles.text, todo.completed && styles.completedText]}>
                    {todo.text}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
                <Ionicons name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        justifyContent: 'space-between',
    },
    todoTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    text: {
        fontSize: 16,
        marginLeft: 10,
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: '#aaa',
    },
});

export default TodoItem;
