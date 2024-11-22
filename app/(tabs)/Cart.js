import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

function Cart({ navigation }) {
    const [cartItems, setCartItems] = useState([
        { id: '1', name: 'Product A', price: 100, quantity: 2, image: 'https://via.placeholder.com/100' },
        { id: '2', name: 'Product B', price: 150, quantity: 1, image: 'https://via.placeholder.com/100' },
        { id: '3', name: 'Product C', price: 200, quantity: 3, image: 'https://via.placeholder.com/100' },
    ]);

    const totalPrice = cartItems.reduce((sum,item)=> sum + item.price * item.quantity, 0 );

    const renderItem = ({ item }) => (
        <View style={styles.itemFlatList}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>Price: ${item.price}</Text>
                <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
            </View>
            <TouchableOpacity><Text>+</Text></TouchableOpacity>
            <TouchableOpacity><Text>-</Text></TouchableOpacity>
            <TouchableOpacity><Text>Xoá</Text></TouchableOpacity>

        </View>
    );

    return (
        <View style={styles.container}>
            <Text>Khách hàng: </Text>
            <Text>sđt: </Text>
            <Text>Địa chỉ: </Text>


            <FlatList
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                style={styles.cartList}
                showsVerticalScrollIndicator={false}
            />

            <TouchableOpacity><Text style={styles.txtMaGiamGia}>Xem Mã Giảm Giá khả dụng</Text></TouchableOpacity>

            <View style={styles.totalContainer}>
                <Text style={styles.txtTotalPrice}>Total: ${totalPrice}</Text>
            </View>

            <TouchableOpacity style={styles.btnOrder} onPress={() => alert('buy')}>
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
        alignItems:'center',
        justifyContent: 'space-between'
    },
    itemImg: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 16,
    },
    itemDetails: {
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
    txtMaGiamGia:{
        color:'red'
    }
});

export default Cart;
