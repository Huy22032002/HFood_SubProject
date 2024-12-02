import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useUser } from './UserContext';
import { useCart } from './CartContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { Timestamp } from "firebase/firestore";

function Cart({ navigation }) {
    const [address, setAddress] = useState('');
    const { cartItems, updateCartItem, removeFromCart } = useCart();
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleIncreaseQuantity = (item) => {
        updateCartItem(item.id, item.quantity + 1);
    };

    const handleDecreaseQuantity = (item) => {
        if (item.quantity > 1) {
            updateCartItem(item.id, item.quantity - 1);
        }
    };

    const handleRemoveItem = (item) => {
        removeFromCart(item.id);
    };

    const { user } = useUser();
    const username = user?.name || "Khách hàng";
    const phone = user?.phone || "Không có số điện thoại";
    const userAddress = user?.address || "Không có địa chỉ";

    const deliveryAddress = address.trim() !== '' ? address : userAddress;

    const handlePurchase = async () => {
        if (cartItems.length === 0) {
            alert('Giỏ hàng của bạn không có sản phẩm. Vui lòng thêm sản phẩm vào giỏ hàng!');
            return;
        }
        const order = {
            createAt: Timestamp.fromDate(new Date()),
            list_products: cartItems.map((item) => ({
                product_id: `/Product/${item.id}`,
                quantity: item.quantity,
                total: item.price * item.quantity,
            })),
            total: totalPrice,
            status: true,
            user_id: user.userId,
            address: deliveryAddress,
        };

        try {
            const docRef = await addDoc(collection(db, 'order'), order);
            alert('Đặt hàng thành công!');
            navigation.navigate('Order', { orderId: docRef.id });
        } catch (error) {
            alert('Đặt hàng thất bại!');
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.price.toLocaleString()} VNĐ</Text>
                <View style={styles.quantityControls}>
                    <TouchableOpacity onPress={() => handleDecreaseQuantity(item)}>
                        <Text style={styles.controlButton}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.itemQuantity}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => handleIncreaseQuantity(item)}>
                        <Text style={styles.controlButton}>+</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => handleRemoveItem(item)}>
                    <Text style={styles.removeButton}>Xoá</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Thông tin đơn hàng</Text>
            <Text style={styles.userInfo}>Khách hàng: {username}</Text>
            <Text style={styles.userInfo}>Số điện thoại: {phone}</Text>
            <Text style={styles.userInfo}>Địa chỉ hiện tại: {userAddress}</Text>

            <TextInput
                value={address}
                onChangeText={setAddress}
                placeholder="Nhập địa chỉ giao hàng"
                style={styles.addressInput}
            />

            <FlatList
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.cartList}
            />

            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Tổng tiền: {totalPrice.toLocaleString()} VNĐ</Text>
            </View>

            <TouchableOpacity style={styles.purchaseButton} onPress={handlePurchase}>
                <Text style={styles.purchaseButtonText}>Đặt hàng</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFF8E1',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#4CAF50',
    },
    userInfo: {
        fontSize: 16,
        marginBottom: 8,
        color: '#555',
    },
    addressInput: {
        height: 40,
        borderColor: '#DDD',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 10,
        backgroundColor: '#FFF',
    },
    cartList: {
        marginBottom: 16,
    },
    itemContainer: {
        flexDirection: 'row',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#E8F5E9',
        borderRadius: 8,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 10,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: 14,
        marginBottom: 8,
        color: '#4CAF50',
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    controlButton: {
        fontSize: 20,
        marginHorizontal: 10,
        color: '#4CAF50',
    },
    itemQuantity: {
        fontSize: 16,
    },
    removeButton: {
        fontSize: 14,
        color: '#F44336',
    },
    totalContainer: {
        marginTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#DDD',
        paddingTop: 16,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    purchaseButton: {
        marginTop: 16,
        backgroundColor: '#4CAF50',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    purchaseButtonText: {
        fontSize: 16,
        color: '#FFF',
        fontWeight: 'bold',
    },
});

export default Cart;
