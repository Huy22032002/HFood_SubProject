import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig'; 

function Login({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!username || !password) {
            alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
            return;
        }

        setLoading(true);

        try {
            // Lấy thông tin người dùng từ Firestore
            const userRef = doc(db, 'User', username); // Giả sử 'User' là collection chứa thông tin người dùng, và 'username' là document ID
            const userDocSnap = await getDoc(userRef);

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();

                // Kiểm tra mật khẩu
                if (userData.password === password) {
                    // Đăng nhập thành công, chuyển hướng đến màn hình Home
                    navigation.navigate('Home', {id: username});
                } else {
                    alert('Lỗi', 'Mật khẩu không đúng');
                }
            } else {
                alert('Lỗi', 'Tài khoản không tồn tại');
            }
        } catch (error) {
            Alert.alert('Lỗi', 'Có lỗi xảy ra khi đăng nhập');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đăng nhập</Text>
            <TextInput
                placeholder="Tên Đăng Nhập"
                style={styles.input}
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                placeholder="Mật khẩu"
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={setPassword}
            />
            <Button
                title={loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                color="#005f99"
                onPress={handleLogin}
                disabled={loading}
            />
            <Text style={styles.txt} onPress={() => navigation.navigate('ForgetPassword')}>
                Quên mật khẩu?
            </Text>
            <Text style={styles.txt} onPress={() => navigation.navigate('SignUp')}>
                Đăng ký
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#e0f7fa',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#005f99',
        textAlign: 'center',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#005f99',
        marginBottom: 20,
        padding: 8,
        fontSize: 16,
    },
    txt: {
        color: '#005f99',
        marginTop: 10,
        textAlign: 'center',
    },
});

export default Login;
