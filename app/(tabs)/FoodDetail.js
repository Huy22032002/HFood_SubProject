import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { useCart } from './CartContext';

const FoodDetail = ({ route }) => {
    const { id } = route.params;
    const [foodDetail, setFoodDetail] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const [comments, setComments] = useState([]);
    const [users, setUsers] = useState({});
    const { cartItems, setCartItems } = useCart();

    const addToCart = (item) => {
        alert("Sản phẩm thêm vào: " + id); 

        setCartItems((prevItems) => {
            const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);

            if (existingItem) {
                alert('Sản phẩm này đã có trong giỏ hàng!');
                return prevItems;
            } else {
                const updatedCart = [...prevItems, { ...item, quantity: 1 }];
                return updatedCart;
            }
        });
    };

    useEffect(() => {
        const fetchFoodDetail = async () => {
            try {
                const docRef = doc(db, "Product", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const foodData = docSnap.data();
                    setFoodDetail({...foodData, id: id});

                    if (foodData.category && foodData.category.id) {
                        const categoryRef = doc(db, "Categories", foodData.category.id);
                        const categoryDocSnap = await getDoc(categoryRef);
                        if (categoryDocSnap.exists()) {
                            setCategoryName(categoryDocSnap.data().name);
                        }
                    }

                    if (foodData.reviews) {
                        setComments(foodData.reviews);
                    }
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching product details: ", error);
            }
        };

        fetchFoodDetail();
    }, [id]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userPromises = comments.map(async (review) => {
                    const userRef = doc(db, "User", review.user_id);
                    const userDocSnap = await getDoc(userRef);
                    if (userDocSnap.exists()) {
                        return { user_id: review.user_id, user_name: userDocSnap.data().name };
                    }
                    return null;
                });

                const userData = await Promise.all(userPromises);
                const userMap = {};
                userData.forEach((user) => {
                    if (user) {
                        userMap[user.user_id] = user.user_name;
                    }
                });

                setUsers(userMap);
            } catch (error) {
                console.error("Error fetching user data: ", error);
            }
        };

        if (comments.length > 0) {
            fetchUsers();
        }
    }, [comments]);

    if (!foodDetail) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    const renderCommentItem = ({ item }) => (
        <View style={styles.commentContainer}>
            <Text style={styles.commentUserId}>User: {users[item.user_id]}</Text>
            <Text style={styles.commentText}>{item.comment}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Image source={{ uri: foodDetail.image }} style={styles.foodImage} />
            <Text style={styles.foodName}>{foodDetail.name}</Text>
            <Text>{categoryName}</Text>
            <Text style={styles.foodPrice}>${foodDetail.price}</Text>
            <Text style={styles.foodDescription}>{foodDetail.description}</Text>

            <Text style={styles.commentsHeader}>Review From Customers:</Text>
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={(item, index) => index.toString()}
                style={styles.commentsList}
                showsVerticalScrollIndicator={false}
            />

            <TouchableOpacity
                onPress={() => addToCart(foodDetail)}
                style={styles.addToCartButton}
            >
                <Text style={styles.addToCartText}>Add To Cart</Text>
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
        height: 300,
        borderRadius: 10,
        marginBottom: 20,
    },
    foodName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    foodPrice: {
        fontSize: 20,
        color: '#FF5733',
        marginVertical: 10,
    },
    foodDescription: {
        fontSize: 16,
        color: '#333',
        marginBottom: 20,
    },
    commentsHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    commentContainer: {
        backgroundColor: '#e9ecef',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    commentUserId: {
        fontWeight: 'bold',
        color: '#007bff',
    },
    commentText: {
        marginTop: 5,
        fontSize: 14,
        color: '#333',
    },
    addToCartButton: {
        borderRadius: 20,
        backgroundColor: 'red',
        padding: 10,
        marginTop: 20,
    },
    addToCartText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
});

export default FoodDetail;
