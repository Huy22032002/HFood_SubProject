import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';

const FoodDetail = ({ route, navigation }) => {
    const { id } = route.params;  

    const [quantity, setQuantity] = useState(1);

    const [foodDetail, setFoodDetail] = useState(null); 
    const [loading, setLoading] = useState(true);  

    // Fetch detail
    useEffect(() => {
        axios.get(`https://6707200ca0e04071d2292c11.mockapi.io/Food/${id}`)
            .then((response) => {
                setFoodDetail(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }
    const renderComment = ({ item }) => (
        <View style={styles.commentItem}>
            <Text style={styles.commentUser}>User {item.user_id}:</Text>
            <Text style={styles.commentContent}>{item.content}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Image source={foodDetail.image} style={styles.foodImage} />
       
            <Text style={styles.foodName}>{foodDetail.name} ({foodDetail.category})</Text>
            <Text style={styles.foodDescription}>Description: {foodDetail.des}</Text>
            <Text style={styles.foodPrice}>Price: ${foodDetail.price}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Text style={{padding:10, backgroundColor:'gray', borderRadius:10}}>-</Text>
                </TouchableOpacity>
                <Text style={{ marginHorizontal: 10, fontWeight:'bold' }}>{quantity}</Text>
                <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                    <Text style={{ padding: 10, backgroundColor: 'gray', borderRadius: 10 }}>+</Text>
                </TouchableOpacity>
            </View>
            <Text style={{fontWeight:'bold', fontSize:17}}>Review</Text>
            <Image source={require('../../assets/images/rate.jpg')} style={{marginBottom:10,width:120, height:20}} />
            <FlatList
                data={foodDetail.comment}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderComment}
                showsVerticalScrollIndicator={false}
            />
            <TouchableOpacity
                style={styles.orderButton}
                onPress={() => alert('Add To Cart')}
            >
                <Text style={styles.orderButtonText}>Add To Cart</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    foodImage: {
        width: '100%',
        height: 250,
        borderRadius: 10,
        marginBottom: 20,
    },
    foodName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    foodDescription: {
        fontSize: 16,
        color: '#777',
        marginBottom: 20,
    },
    foodPrice: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginBottom: 30,
    },
    orderButton: {
        backgroundColor: '#FF5733',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    orderButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    commentItem: {
        backgroundColor: '#f1f1f1',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    }
});

export default FoodDetail;
