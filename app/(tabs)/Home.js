import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList, TextInput, Image } from 'react-native';
import { db } from '../../config/firebaseConfig';
import { getDocs, collection, query, where } from "firebase/firestore";
import { useUser } from './UserContext';

const Home = ({ navigation }) => {
    const [categories, setCategories] = useState([]);
    const [foods, setFoods] = useState([]);
    const { user } = useUser();

    const fetchCategories = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "Categories"));
            const categoriesData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setCategories(categoriesData);
        } catch (error) {
            console.error("Error fetching categories: ", error);
        }
    };

    const fetchAllProducts = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "Product"));
            const productsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setFoods(productsData);
        } catch (error) {
            console.error("Error fetching all products: ", error);
        }
    };

    const fetchFilteredProducts = async (categoryId) => {
        try {
            const querySnapshot = await getDocs(
                query(collection(db, "Product"), where("category", "==", categoryId))
            );
            const filteredProducts = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setFoods(filteredProducts);
        } catch (error) {
            console.error("Error fetching filtered products: ", error);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchAllProducts(); // Chỉ gọi một lần khi component mount
    }, []);

    const [popUp, setPopUp] = useState(false);
    const activePopUp = () => setPopUp(!popUp);

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity
            style={{ justifyContent: 'center', alignItems: 'center', marginRight: 30 }}
            onPress={() => fetchFilteredProducts(item.id)} // Gọi fetchFilteredProducts
        >
            <Image source={{ uri: item.image }} style={{ width: 70, height: 70, borderRadius: 40 }} />
            <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderProductItem = ({ item }) => (
        <TouchableOpacity
            style={styles.productItem}
            onPress={() => navigation.navigate('FoodDetail', { id: item.id })}
        >
            <View style={styles.productContent}>
                <View style={styles.productText}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productPrice}>${item.price}</Text>
                </View>
                <Image source={{ uri: item.image }} style={styles.productImage} />
            </View>
        </TouchableOpacity>
    );

    const userImage = user?.image || require('../../assets/images/logo.png');

    return (
        <View style={styles.container}>
            <View style={styles.headerUser}>
                {user?.role === 'admin' && (
                    <>
                        <TouchableOpacity
                            style={{ marginRight: 15 }}
                            onPress={() => navigation.navigate('AddFood')}
                        >
                            <Image source={require('../../assets/images/add.png')} style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginRight: 15 }}
                            onPress={() => navigation.navigate('AddCategory')}
                        >
                            <Image source={require('../../assets/images/category.png')} style={styles.icon} />
                        </TouchableOpacity>
                    </>
                )}
                <TouchableOpacity
                    style={{ marginRight: 15 }}
                    onPress={() => navigation.navigate('Order')}
                >
                    <Image source={require('../../assets/images/transaction-history.png')} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ marginRight: 15 }}
                    onPress={() => navigation.navigate('Cart')}
                >
                    <Image source={require('../../assets/images/carrt.png')} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={activePopUp}>
                    <Image
                        source={userImage}
                        style={{ width: 40, height: 40, borderRadius: 20 }}
                    />
                </TouchableOpacity>
            </View>

            <Modal visible={popUp} transparent animationType="fade">
                <View style={styles.modalContainer}>
                    <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => {
                            setPopUp(false);
                            navigation.navigate("UserProfile");
                        }}
                    >
                        <Text style={styles.modalButtonText}>View Information</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => {
                            setPopUp(false);
                            navigation.navigate('Login');
                        }}
                    >
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
            <TouchableOpacity
                style={styles.allProductsButton}
                onPress={() => fetchAllProducts()} // Gọi fetchAllProducts để reset về tất cả sản phẩm
            >
                <Image source={require('../../assets/images/refresh.png')} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
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
        backgroundColor: '#F4E0AF',
        padding: 10,
    },
    headerUser: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 10,
    },
    headerSearch: {
        backgroundColor: '#A8CD89',
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
        position: 'absolute',
        top: 120,
        right: 10,
        backgroundColor: '#A8CD89',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
        padding: 10,
        width: 150,
        zIndex: 1000,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalButton: {
        backgroundColor: '#ffffff',
        padding: 10,
        marginBottom: 10,
        width: 140,
        alignItems: 'center',
        borderRadius: 5,
    },
    modalButtonText: {
        color: '#333',
        fontSize: 14,
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
        backgroundColor: '#A8CD89',
        padding: 15,
        borderRadius: 10,
        margin: 10,
        width: '45%',
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    productContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    productText: {
        flex: 1,
        justifyContent: 'center',
        paddingRight: 10,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    productPrice: {
        fontSize: 16,
        color: '#5A5A5A',
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    allProductsButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
});

export default Home;
