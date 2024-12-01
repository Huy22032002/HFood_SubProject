import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

const AddFood = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAddFood = async () => {
        if (!name || !category || !description || !image || !price) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
            return;
        }

        setLoading(true);

        try {
            // Tạo document mới trong collection 'Product'
            await addDoc(collection(db, 'Product'), {
                name: name,
                category: category, // Đường dẫn tới collection category
                description: description,
                image: image, 
                price: parseInt(price, 10), // Chuyển giá sang số nguyên
            });

            Alert.alert('Thành công', 'Sản phẩm đã được thêm');
            // Reset state sau khi thêm thành công
            setName('');
            setCategory('');
            setDescription('');
            setImage('');
            setPrice('');
        } catch (error) {
            Alert.alert('Lỗi', `Không thể thêm sản phẩm: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Thêm sản phẩm mới</Text>
            <TextInput
                placeholder="Tên sản phẩm"
                style={styles.input}
                value={name}
                onChangeText={setName}
            />
            <TextInput
                placeholder="Danh mục (/Categories/drinks)"
                style={styles.input}
                value={category}
                onChangeText={setCategory}
            />
            <TextInput
                placeholder="Mô tả"
                style={styles.input}
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                placeholder="URL hình ảnh"
                style={styles.input}
                value={image}
                onChangeText={setImage}
            />
            <TextInput
                placeholder="Giá (VD: 10000)"
                style={styles.input}
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />
            <Button
                title={loading ? 'Đang thêm...' : 'Thêm sản phẩm'}
                color="#28a745"
                onPress={handleAddFood}
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

export default AddFood;
