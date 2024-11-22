import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

function Login({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đăng nhập</Text>
            <TextInput placeholder="Username" style={styles.input} />
            <TextInput placeholder="Mật khẩu" secureTextEntry style={styles.input} />
            <Button title="Đăng nhập" color="#005f99" onPress={() => navigation.navigate('Home')} />
            <Text style={styles.txt} onPress={() => navigation.navigate('ForgetPassword')}>Quên mật khẩu?</Text>
            <Text style={styles.txt} onPress={() => navigation.navigate('SignUp')}>Đăng ký</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#e0f7fa' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#005f99' },
    input: { borderBottomWidth: 1, borderBottomColor: '#005f99', marginBottom: 20, padding: 8 },
    txt: { color: '#005f99', marginTop: 10, textAlign: 'center' },
});

export default Login;
