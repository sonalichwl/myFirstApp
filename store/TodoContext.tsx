import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useReducer } from 'react';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

type TodoAction =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'SET_TODOS'; payload: Todo[] };

interface TodoState {
  todos: Todo[];
  isLoaded: boolean;
}

const initialState: TodoState = {
  todos: [],
  isLoaded: false,
};

const STORAGE_KEY = '@todos_storage';

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'SET_TODOS':
      return {
        ...state,
        todos: action.payload,
        isLoaded: true,
      };
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now().toString(),
            text: action.payload,
            completed: false,
          },
        ],
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    default:
      return state;
  }
};

interface TodoContextType {
  state: TodoState;
  dispatch: React.Dispatch<TodoAction>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // Load todos from storage on mount
  useEffect(() => {
    const loadTodos = async () => {
      try {
        console.log('Attempting to load todos from storage...');
        const storedTodos = await AsyncStorage.getItem(STORAGE_KEY);
        console.log('Stored todos found:', storedTodos);
        if (storedTodos) {
          const parsed = JSON.parse(storedTodos);
          dispatch({ type: 'SET_TODOS', payload: parsed });
        } else {
          dispatch({ type: 'SET_TODOS', payload: [] });
        }
      } catch (error) {
        console.error('Failed to load todos:', error);
        dispatch({ type: 'SET_TODOS', payload: [] });
      }
    };

    loadTodos();
  }, []);

  // Save todos to storage whenever they change
  useEffect(() => {
    const saveTodos = async () => {
      if (state.isLoaded) {
        try {
          console.log('Saving todos to storage:', state.todos);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos));
          console.log('Todos saved successfully');
        } catch (error) {
          console.error('Failed to save todos:', error);
        }
      }
    };

    saveTodos();
  }, [state.todos, state.isLoaded]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};

