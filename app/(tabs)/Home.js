import React, { useState } from 'react';  
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList, TextInput, Image } from 'react-native';
import axios from 'axios';

const Home = ({ navigation }) => {
    const categories = [
        { id: '1', name: 'Pizza', image : require('../../assets/images/category.png') },
        { id: '2', name: 'Burgers', image: require('../../assets/images/category.png') },
        { id: '3', name: 'Drinks', image: require('../../assets/images/category.png') },
        { id: '4', name: 'JunkFood', image: require('../../assets/images/category.png') },
        { id: '5', name: 'Bread', image: require('../../assets/images/category.png') },
        { id: '6', name: 'Noodles', image: require('../../assets/images/category.png') },
    ];

    //fetch food
    const [foods, setFoods] = useState([]);
    const fetchAPIFood = async () => {
        try {
            const response = await axios.get("https://6707200ca0e04071d2292c11.mockapi.io/Food");
            setFoods(response.data);
        } catch (error) {
            if (error.response && error.response.status === 429) {
                console.log("limit...");
                setTimeout(fetchAPIFood, 5000); 
            } else {
                console.error("API Error: ", error);
            }
        }
    };
    fetchAPIFood();

    const [popUp, setPopUp] = useState(false);
    const activePopUp = () => {
        setPopUp(!popUp);
    };

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity style={{justifyContent:'center', alignItems:'center', marginRight:30}}>
            <Image source={item.image}  style={{width:70, height:70, borderRadius:40}}/>
            <Text style={{fontWeight:'bold'}}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderProductItem = ({ item }) => (
        <TouchableOpacity
            style={styles.productItem}
            onPress={() => navigation.navigate('FoodDetail', { id: item.id })}
        >
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
                <View>
                    <Text style={{fontWeight:'bold'}}>{item.name}</Text>
                    <Text style={{color:'gray', fontWeight:'bold'}}>${item.price}</Text>
                </View>
                <Image source={item.image} style={{width:100, height:100, borderRadius:10}} />
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerUser}>
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
                <TextInput placeholder="Search foods here..." style={styles.searchInput} 
                      
                 />
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
                showsVerticalScrollIndicator={false}
            />

            <FlatList
                data={foods}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.id}
                style={{flex:100}}
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
        margin: 10,  // Adds space between product items
        width: '45%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    orderButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});


export default Home;
