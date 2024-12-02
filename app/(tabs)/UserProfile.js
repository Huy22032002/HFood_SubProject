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

            {/* Profile Image */}
            <Image source={{ uri: image }} style={styles.profileImage} />

            {/* User Information */}
            <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Tên: </Text>
                    <Text style={styles.txtInfo}>{name}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Tuổi: </Text>
                    <Text style={styles.txtInfo}>{age}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Địa chỉ: </Text>
                    <Text style={styles.txtInfo}>{address}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Số điện thoại: </Text>
                    <Text style={styles.txtInfo}>{phone}</Text>
                </View>
            </View>

            {/* Update and Change Password Buttons */}
            <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
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
        backgroundColor: '#F4E0AF',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        alignSelf: 'center',
        marginBottom: 20,
        borderWidth: 3,
        borderColor: '#355F2E',
    },
    infoContainer: {
        marginBottom: 20,
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#555',
        width: 100,
    },
    txtInfo: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    updateButton: {
        backgroundColor: '#355F2E',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        elevation: 5, // Shadow effect
    },
    changePasswordButton: {
        backgroundColor: '#ff5733',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5, // Shadow effect
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default UserProfile;
