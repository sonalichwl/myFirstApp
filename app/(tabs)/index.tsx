import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TodoInput from '../../components/Todo/TodoInput';
import TodoList from '../../components/Todo/TodoList';
import { useAuth } from '../../store/AuthContext';
import { TodoProvider } from '../../store/TodoContext';

export default function TodoScreen() {
    const { logout, user } = useAuth();

    return (
        <TodoProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>My Todos</Text>
                    <TouchableOpacity onPress={logout} style={styles.logoutButton}>
                        <Text style={styles.logoutText}>Logout ({user?.username})</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    content: {
        padding: 20,
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    logoutButton: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    logoutText: {
        color: '#ff3b30',
        fontSize: 14,
        fontWeight: '600',
    },
});
