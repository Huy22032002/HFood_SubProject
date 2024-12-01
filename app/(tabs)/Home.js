import { initializeApp } from "firebase/app";
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList, TextInput, Image } from 'react-native';
import { db } from '../../config/firebaseConfig'; 
import { getFirestore, getDocs, collection } from "firebase/firestore";


const Home = ({ route, navigation }) => {
    // Fetch Categories
    const [categories, setCategories] = useState([]);
    //fetch Products
    const [foods, setFoods] = useState([]);

    const fetchCategories = async () => {
        try {
            // Lấy tất cả các tài liệu trong bộ sưu tập "Categories"
            const querySnapshot = await getDocs(collection(db, "Categories"));

            const categoriesData = querySnapshot.docs.map((doc) => {
                // Lấy dữ liệu từ mỗi tài liệu
                const data = doc.data();
                return {
                    id: doc.id,  // Lấy ID của tài liệu
                    image: data.image,
                    name: data.name,
                };
            });

            console.log("Fetched Categories: ", categoriesData);
            setCategories(categoriesData);  // Lưu vào state
        } catch (error) {
            console.error("Error fetching categories: ", error);
        }
    };
    const fetchProducts = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "Product"));
            const productsData = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    image: data.image,
                    name: data.name,
                    price: data.price,
                };
            });
            setFoods(productsData);
        } catch (error) {
            console.error("Error fetching products: ", error);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, []);

    const [popUp, setPopUp] = useState(false);
    const activePopUp = () => {
        setPopUp(!popUp);
    };

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginRight: 30 }}>
            <Image source={{ uri: item.image }} style={{ width: 70, height: 70, borderRadius: 40 }} />
            <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderProductItem = ({ item }) => (
        <TouchableOpacity
            style={styles.productItem}
            onPress={() => navigation.navigate('FoodDetail', { id: item.id })}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                <View>
                    <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                    <Text style={{ color: 'gray', fontWeight: 'bold' }}>${item.price}</Text>
                </View>
                <Image source={{ uri: item.image }} style={{ width: 100, height: 100, borderRadius: 10 }} />
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header and Modal */}
            <View style={styles.headerUser}>
                <TouchableOpacity
                    style={{ marginRight: 15 }}
                    onPress={() => navigation.navigate('AddFood')}>
                    <Image
                        source={require('../../assets/images/addFood.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ marginRight: 15 }}
                    onPress={() => navigation.navigate('AddCategory')}>
                    <Image
                        source={require('../../assets/images/category.jpg')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ marginRight: 15 }}
                    onPress={() => navigation.navigate('Cart')}>
                    <Image
                        source={require('../../assets/images/cart.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={activePopUp}>
                    <Image
                        source={require('../../assets/images/logo.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>

            <Modal visible={popUp} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.modalButton} onPress={() => navigation.navigate("UserProfile")}>
                        <Text style={styles.modalButtonText}>View Information</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalButton} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.modalButtonText}>Log Out</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.closeButton} onPress={activePopUp}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <View style={styles.headerSearch}>
                <TextInput placeholder="Search foods here..." style={styles.searchInput} />
            </View>

            <View style={styles.bannerContainer}>
                <Image source={require('../../assets/images/banner.jpg')} style={styles.bannerImage} />
            </View>

            <FlatList
                horizontal
                data={categories}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ justifyContent: 'space-around', flex: 1 }}
                showsHorizontalScrollIndicator={false}
            />

            <FlatList
                data={foods}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.id}
                style={{ flex: 100 }}
                numColumns={2}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        padding: 10,
    },
    headerUser: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 10,
    },
    headerSearch: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    searchInput: {
        fontSize: 16,
        color: '#333',
    },
    bannerContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    bannerImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    icon: {
        width: 40,
        height: 40,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalButton: {
        backgroundColor: '#ffffff',
        padding: 10,
        marginBottom: 10,
        width: 200,
        alignItems: 'center',
        borderRadius: 5,
    },
    modalButtonText: {
        color: '#333',
        fontSize: 16,
    },
    closeButton: {
        backgroundColor: '#FF5733',
        padding: 10,
        borderRadius: 5,
        width: 100,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#ffffff',
    },
    productItem: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        margin: 10,
        width: '45%',
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    }
});

export default Home;
