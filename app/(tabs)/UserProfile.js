import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

function UserProfile({ navigation }) {

    const handleUpdate = () => {
        // Logic to update user profile
        alert('Thông tin đã được cập nhật');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Thông tin cá nhân</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Tên:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập tên của bạn"
                />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Email:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập email của bạn"
                />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Địa chỉ:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập địa chỉ của bạn"
                />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>SĐT:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập sđt của bạn"
                />
            </View>
            <TouchableOpacity
                style={styles.updateButton}
                onPress={handleUpdate}
            >
                <Text style={styles.buttonText}>Cập nhật thông tin</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.changePasswordButton}
                onPress={() => navigation.navigate('ForgetPassword')}
            >
                <Text style={styles.buttonText}>Đổi mật khẩu</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#555',
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        fontSize: 16,
        marginLeft: 10,
    },
    updateButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
    },
    changePasswordButton: {
        backgroundColor: '#ff5733',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default UserProfile;
