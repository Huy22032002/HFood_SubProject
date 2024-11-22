import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

function ForgetPassword({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Đổi mật khẩu</Text>
            <TextInput
                placeholder="Mật khẩu cũ"
                style={styles.input}
                secureTextEntry
            />
            <TextInput
                placeholder="Mật khẩu mới"
                style={styles.input}
                secureTextEntry
            />
            <TouchableOpacity style={styles.updateButton} onPress={() => alert('Mật khẩu đã được đổi')}>
                <Text style={styles.updateButtonText}>Cập nhật mật khẩu</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#333',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        fontSize: 16,
        color: '#333',
    },
    updateButton: {
        backgroundColor: '#FF5733',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    updateButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default ForgetPassword;
