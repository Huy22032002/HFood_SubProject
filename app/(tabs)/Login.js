import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig'; 
import { useUser } from './UserContext';
function Login({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useUser();

    const handleLogin = async () => {
        if (!username || !password) {
            alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
            return;
        }

        setLoading(true);

        try {
            const userRef = doc(db, 'User', username); 
            const userDocSnap = await getDoc(userRef);

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                userData.userId = userDocSnap.id;
                if (userData.password === password) {
                    login(userData);
                    alert(userData.userId)
                    navigation.navigate('Home');  
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
                color="#355F2E"
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
        backgroundColor: '#F4E0AF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#355F2E',
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
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
    },
});

export default Login;
