import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAddCategory = async () => {
        if (!name || !image) {
            alert('Lỗi', 'Vui lòng nhập đầy đủ tên và URL hình ảnh');
            return;
        }

        setLoading(true);

        try {
            await addDoc(collection(db, 'Categories'), {
                name: name,
                image: image, 
            });

            alert('Thành công', 'Danh mục đã được thêm');
            setName('');
            setImage('');
        } catch (error) {
            alert('Lỗi', `Không thể thêm danh mục: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Thêm danh mục mới</Text>
            <TextInput
                placeholder="Tên danh mục"
                style={styles.input}
                value={name}
                onChangeText={setName}
            />
            <TextInput
                placeholder="URL hình ảnh"
                style={styles.input}
                value={image}
                onChangeText={setImage}
            />
            <Button
                title={loading ? 'Đang thêm...' : 'Thêm danh mục'}
                color="#28a745"
                onPress={handleAddCategory}
                disabled={loading}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 20,
        padding: 8,
        fontSize: 16,
    },
});

export default AddCategory;
