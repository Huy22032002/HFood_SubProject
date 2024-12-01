import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

function SignUp({ navigation }) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        if (!name || !username || !password) {
            alert('Please fill in all fields');
            return;
        }

        setLoading(true);

        try {
            const userRef = doc(db, 'User', username);  // Tạo document với username là ID
            await setDoc(userRef, {
                name: name,
                username: username,
                password: password,
            });

            // Sau khi thêm thành công, điều hướng đến trang Home
            navigation.navigate('Home');
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Đăng Ký</Text>
            <TextInput
                placeholder="Tên"
                style={styles.input}
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <TextInput
                placeholder="Tên Đăng Nhập"
                style={styles.input}
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
            <TextInput
                placeholder="Mật khẩu"
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
                style={styles.signUpButton}
                onPress={handleSignUp}
                disabled={loading}
            >
                <Text style={styles.signUpButtonText}>
                    {loading ? 'Đang Tạo Tài Khoản...' : 'Đăng Ký'}
                </Text>
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
