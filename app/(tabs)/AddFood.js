import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';

const AddFood = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null); // Use local image
    const [price, setPrice] = useState('');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'Categories'));
                const categoriesList = [];
                querySnapshot.forEach((doc) => {
                    categoriesList.push({ id: doc.id, name: doc.data().name });
                });
                setCategories(categoriesList);
            } catch (error) {
                Alert.alert('Lỗi', `Không thể tải danh mục: ${error.message}`);
            }
        };
        fetchCategories();
    }, []);

    const handleAddFood = async () => {
        if (!name || !category || !description || !image || !price) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
            return;
        }

        setLoading(true);

        try {
            await addDoc(collection(db, 'Product'), {
                name,
                category,
                description,
                image: image.uri, // Use URI of the selected image
                price: parseInt(price, 10),
            });

            Alert.alert('Thành công', 'Sản phẩm đã được thêm');
            setName('');
            setCategory('');
            setDescription('');
            setImage(null);
            setPrice('');
        } catch (error) {
            Alert.alert('Lỗi', `Không thể thêm sản phẩm: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                Alert.alert('Hủy', 'Bạn đã hủy chọn hình ảnh');
            } else if (response.errorCode) {
                Alert.alert('Lỗi', `Lỗi chọn hình ảnh: ${response.errorMessage}`);
            } else if (response.assets && response.assets.length > 0) {
                setImage(response.assets[0]); // Save selected image
            }
        });
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

            <Text style={styles.label}>Danh mục:</Text>
            <Picker
                selectedValue={category}
                onValueChange={setCategory}
                style={styles.input}
            >
                <Picker.Item label="Chọn danh mục" value="" />
                {categories.map((cat) => (
                    <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
                ))}
            </Picker>

            <TextInput
                placeholder="Mô tả"
                style={styles.input}
                value={description}
                onChangeText={setDescription}
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

            <TextInput
                placeholder="Giá (VD: 10000)"
                style={styles.input}
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />

            <TouchableOpacity
                style={styles.button}
                onPress={handleAddFood}
                disabled={loading}
            >
                <Text style={styles.buttonText}>{loading ? 'Đang thêm...' : 'Thêm sản phẩm'}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#F4E0AF',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        color: '#4CAF50',
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: '#4CAF50',
        marginBottom: 20,
        padding: 12,
        fontSize: 16,
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#355F2E',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    imagePicker: {
        padding: 10,
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 10,
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
});

export default AddFood;
