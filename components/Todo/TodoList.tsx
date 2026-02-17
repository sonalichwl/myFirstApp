import React from 'react';
import { FlatList } from 'react-native';
import { useTodos } from '../../hooks/useTodos';
import TodoItem from './TodoItem';

const TodoList = () => {
    const { todos } = useTodos();

    return (
        <FlatList
            data={todos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TodoItem todo={item} />}
        />
    );
};

export default TodoList;
