import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { launchImageLibrary } from 'react-native-image-picker';

const AddCategory = ({navigation}) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null); 
    const [loading, setLoading] = useState(false);

    const handleAddCategory = async () => {
        if (!name || !image) {
            alert('Vui lòng nhập tên và chọn hình ảnh');
            return;
        }

        setLoading(true);

        try {
            await addDoc(collection(db, 'Categories'), {
                name: name,
                image: image.uri, 
            });

            alert('Thành công', 'Danh mục đã được thêm');
            setName('');
            setImage(null);
            navigation.navigate('Home'); 
        } catch (error) {
            alert(`Không thể thêm danh mục: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                alert('Hủy', 'Bạn đã hủy chọn hình ảnh');
            } else if (response.errorCode) {
                alert(`Lỗi chọn hình ảnh: ${response.errorMessage}`);
            } else if (response.assets && response.assets.length > 0) {
                setImage(response.assets[0]); 
            }
        });
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

            <TouchableOpacity onPress={handleSelectImage} style={styles.imagePicker}>
                <Text style={styles.imagePickerText}>Chọn hình ảnh</Text>
            </TouchableOpacity>

            {image && (
                <Image
                    source={{ uri: image.uri }}
                    style={styles.previewImage}
                />
            )}

            <TouchableOpacity
                style={styles.button}
                onPress={handleAddCategory}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? 'Đang thêm...' : 'Thêm danh mục'}
                </Text>
            </TouchableOpacity>
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
    imagePicker: {
        padding: 10,
        backgroundColor: '#28a745',
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    imagePickerText: {
        color: '#fff',
        fontWeight: '600',
    },
    previewImage: {
        width: 100,
        height: 100,
        marginVertical: 10,
        borderRadius: 10,
        alignSelf: 'center',
    },
    button: {
        backgroundColor: '#28a745',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default AddCategory;
