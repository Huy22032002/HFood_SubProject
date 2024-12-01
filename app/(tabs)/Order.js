import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { db } from '../../config/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useUser } from './UserContext';

function Order({ navigation }) {
    const [orders, setOrders] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const q = query(
                    collection(db, 'order'),
                    where('user_id', '==', user.userId)
                );
                const querySnapshot = await getDocs(q);
                const ordersData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setOrders(ordersData);
            } catch (error) {
                console.error("Error getting orders: ", error);
            }
        };
        
        fetchOrders();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.orderItem}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Mã đơn: #{item.id}</Text>
            <Text style={styles.orderText}>Ngày đặt: #{item.createAt}</Text>
            <Text style={styles.orderText}>Tổng tiền: {item.total} đ</Text>
            <Text style={styles.orderText}>
                Trạng thái thanh toán: {item.status ? 'Đã thanh toán' : 'Chưa thanh toán'}
            </Text>
            <TouchableOpacity
                style={styles.viewDetailsButton}
                onPress={() => navigation.navigate('OrderDetail', { orderId: item.id })}
            >
                <Text style={{fontWeight:'bold'}}>Xem chi tiết</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đơn Hàng Của Tôi</Text>
            <FlatList
                data={orders}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    orderItem: {
        backgroundColor: 'pink',
        padding: 16,
        marginBottom: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 5,
    },
    orderText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
    },
    productList: {
        marginTop: 12,
        paddingLeft: 10,
    },
    productHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    productItem: {
        marginBottom: 4,
    },
    productText: {
        fontSize: 14,
        color: '#555',
    },
});

export default Order;
