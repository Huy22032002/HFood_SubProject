import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, Button } from 'react-native';
import { db } from '../../config/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useUser } from './UserContext'

function OrderDetail({ route }) {
    const { orderId } = route.params;
    const [order, setOrder] = useState(null);
    const [review, setReview] = useState('');
    const [selectedProductId, setSelectedProductId] = useState(null);
    const {user} = useUser();
    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                const docRef = doc(db, 'order', orderId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const orderData = docSnap.data();

                    // Lấy chi tiết từng sản phẩm từ danh sách product_id
                    const products = await Promise.all(
                        orderData.list_products.map(async (product) => {
                            const productId = product.product_id.split('/').pop();
                            const productDoc = await getDoc(doc(db, 'Product', productId));
                            const productData = productDoc.data();
                            return {
                                ...productData,
                                quantity: product.quantity,
                                total: product.total,
                                product_id: product.product_id,
                            };
                        })
                    );

                    setOrder({
                        id: orderId,
                        ...orderData,
                        list_products: products,
                    });
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error getting order details: ", error);
            }
        };

        fetchOrderDetail();
    }, [orderId]);

    const handleReviewChange = (text) => {
        setReview(text);
    };

    const handleSubmitReview = async (productId) => {
        if (!review.trim()) {
            alert('Vui lòng nhập nội dung đánh giá!');
            return;
        }

        const productIdCleaned = productId.split('/').pop();  

        const product = order.list_products.find(item => item.product_id === productId);

        if (!product) {
            alert('Sản phẩm không tồn tại.');
            return;
        }

        // Cập nhật reviews cho sản phẩm
        const updatedReviews = [...(product.reviews || [])];
        updatedReviews.push({
            user_id: user.userId, 
            comment: review,
        });

        try {
            const productRef = doc(db, 'Product', productIdCleaned);  // Sử dụng productId đã được loại bỏ /Product/
            await updateDoc(productRef, {
                reviews: updatedReviews, // Cập nhật field reviews
            });

            // Reset lại các giá trị sau khi gửi đánh giá
            setReview('');
            setSelectedProductId(null); // Đóng phần nhập đánh giá
        } catch (error) {
            console.error('Lỗi khi cập nhật đánh giá:', error);
        }
    };


    if (!order) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Đang tải...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Chi tiết đơn hàng #{order.id}</Text>
            <Text style={styles.infoText}>Ngày đặt hàng: {order.createAt}</Text>
            <Text style={styles.infoText}>Địa chỉ giao hàng: {order.address}</Text>
            <Text style={styles.infoText}>Tổng tiền: {order.total} đ</Text>
            <Text style={styles.infoText}>
                Trạng thái thanh toán: {order.status ? 'Đã thanh toán' : 'Chưa thanh toán'}
            </Text>

            <Text style={styles.sectionTitle}>Danh sách sản phẩm:</Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={order.list_products}
                keyExtractor={(item) => item.product_id}
                renderItem={({ item }) => (
                    <View style={styles.productItem}>
                        <Image
                            source={{ uri: item.image }}
                            style={{ width: 70, height: 70 }}
                            resizeMode="cover"
                        />
                        <View style={styles.productDetails}>
                            <Text style={styles.productName}>{item.name}</Text>
                            <Text style={styles.productQuantity}>Số lượng: {item.quantity}</Text>
                            <Text style={styles.productTotal}>Tổng: {item.total} đ</Text>

                            {/* Hiển thị phần đánh giá nếu đang chọn sản phẩm */}
                            {selectedProductId === item.product_id ? (
                                <View>
                                    <TextInput
                                        style={styles.input}
                                        value={review}
                                        onChangeText={handleReviewChange}
                                        placeholder="Nhập đánh giá của bạn..."
                                    />
                                    <Button
                                        title="Gửi đánh giá"
                                        onPress={() => handleSubmitReview(item.product_id)}
                                    />
                                </View>
                            ) : (
                                <Button
                                    title="Đánh giá"
                                    onPress={() => setSelectedProductId(item.product_id)}
                                />
                            )}
                        </View>
                    </View>
                )}
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
    infoText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
    },
    productItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
    },
    productDetails: {
        marginLeft: 12,
        flex: 1,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    productQuantity: {
        fontSize: 14,
        color: '#555',
    },
    productTotal: {
        fontSize: 14,
        color: '#333',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
        marginBottom: 8,
    },
    loadingText: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default OrderDetail;
