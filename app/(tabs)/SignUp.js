import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';

function SignUp({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Đăng Ký</Text>
            <TextInput placeholder="Tên" style={styles.input} />
            <TextInput placeholder="Email" style={styles.input} keyboardType="email-address" />
            <TextInput placeholder="Mật khẩu" style={styles.input} secureTextEntry />
            <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.signUpButtonText}>Đăng Ký</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginText}>Đã có tài khoản? Đăng nhập</Text>
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
    signUpButton: {
        backgroundColor: '#FF5733',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    signUpButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    loginText: {
        marginTop: 15,
        textAlign: 'center',
        color: '#007bff',
        fontSize: 14,
    },
});

export default SignUp;
