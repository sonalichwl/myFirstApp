import { useTodoContext } from '../store/TodoContext';

export const useTodos = () => {
    const { state, dispatch } = useTodoContext();

    const addTodo = (text: string) => {
        dispatch({ type: 'ADD_TODO', payload: text });
    };

    const toggleTodo = (id: string) => {
        dispatch({ type: 'TOGGLE_TODO', payload: id });
    };

    const deleteTodo = (id: string) => {
        dispatch({ type: 'DELETE_TODO', payload: id });
    };

    return {
        todos: state.todos,
        addTodo,
        toggleTodo,
        deleteTodo,
    };
};
