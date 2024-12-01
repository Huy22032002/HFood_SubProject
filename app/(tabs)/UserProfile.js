import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useUser } from './UserContext';

function UserProfile({ navigation }) {

    const handleUpdate = () => {
        alert('Thông tin đã được cập nhật');
    };
    const { user } = useUser();

    const [image, setImage] = useState(user?.image || '');
    const [name, setName] = useState(user?.name || '');
    const [age, setAge] = useState(user?.age || '');
    const [address, setAddress] = useState(user?.address || '');
    const [phone, setPhone] = useState(user?.phone || '');

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Thông tin cá nhân</Text>
            <Image source={{ uri: image }} style={{ height: 100 }} />     
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.label}>Tên: </Text>
                    <Text style={styles.txtInfo}>{name}</Text>
                </View>
                 <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.label}>Tuổi: </Text>
                <Text style={styles.txtInfo}>{age}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.label}>Địa chỉ: </Text>
                <Text style={styles.txtInfo}>{address}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.label}>Số điện thoại: </Text>
                <Text style={styles.txtInfo}>{phone}</Text>
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
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#555',
    },
    txtInfo: {
        fontSize: 16,
        fontWeight:'bold'
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
