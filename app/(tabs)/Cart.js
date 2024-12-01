import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useUser } from './UserContext';
import { useCart } from './CartContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
function Cart({ navigation }) {
    const [address, setAddress] = useState('');
    const { cartItems, updateCartItem, removeFromCart } = useCart(''); 

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
    const username = user?.name || "";
    const phone = user?.phone || "";
    const userAddress = user?.address || "";

    const renderItem = ({ item }) => (
        <View style={styles.itemFlatList}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>Price: ${item.price}</Text>
                <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity onPress={() => handleIncreaseQuantity(item)}>
                    <Text style={styles.actionText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDecreaseQuantity(item)}>
                    <Text style={styles.actionText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleRemoveItem(item)}>
                    <Text style={styles.actionText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
    const deliveryAddress = address.trim() !== '' ? address : userAddress;
    const handlePurchase = async () => {
        if (cartItems.length === 0) {
            alert('Giỏ hàng của bạn không có sản phẩm. Vui lòng thêm sản phẩm vào giỏ hàng!');
            return;
        }
        const order = {
            createAt: new Date().toISOString(),
            list_products: cartItems.map((item) => ({
                product_id: `/Product/${item.id}`,
                quantity: item.quantity,
                total: item.price * item.quantity,
            })),
            total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
            status: true,
            user_id: user.userId,
            address: deliveryAddress
        };

        try {
            const docRef = await addDoc(collection(db, 'order'), order);
            console.log('Order saved successfully with ID:', docRef.id);
            alert('Đặt hàng thành công!');

            navigation.navigate('Order', { orderId: docRef.id });

            //clearCart(); 
        } catch (error) {
            console.error('Error saving order:', error.message);
            alert('Đặt hàng thất bại!');
        }
    };
    return (
        <View style={styles.container}>
            <Text>Khách hàng: {username}</Text>
            <Text>Số điện thoại: {phone}</Text>
            <Text>Địa chỉ hiện tại: {userAddress}</Text>
            
            <Text>Hoặc nhập địa chỉ khác mà bạn muốn giao đơn hàng này: </Text>
            <TextInput 
                value={address} 
                onChangeText={setAddress} 
                style={{ width: '90%', height: 30, borderWidth:1, borderRadius:10, marginTop:10}}
            />
               
            <FlatList
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id ? item.id.toString() : String(item)}
                style={styles.cartList}
                showsVerticalScrollIndicator={false}
            />

            <TouchableOpacity>
                <Text style={styles.txtMaGiamGia}>Xem Mã Giảm Giá khả dụng</Text>
            </TouchableOpacity>

            <View style={styles.totalContainer}>
                <Text style={styles.txtTotalPrice}>Total: ${totalPrice.toFixed(2)}</Text>
            </View>

            <TouchableOpacity style={styles.btnOrder} onPress={handlePurchase}>
                <Text style={styles.txtBtnOrder}>BUY</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 16,
    },
    itemFlatList: {
        flexDirection: 'row',
        marginBottom: 16,
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 16,
    },
    itemDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 14,
        color: '#333',
    },
    itemQuantity: {
        fontSize: 14,
        color: '#555',
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionText: {
        fontSize: 18,
        marginHorizontal: 8,
        color: 'red',
        fontWeight:'bold'
    },
    totalContainer: {
        paddingVertical: 16,
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    txtTotalPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'right',
    },
    btnOrder: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    txtBtnOrder: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    txtMaGiamGia: {
        color: 'red',
    },
});

export default Cart;
