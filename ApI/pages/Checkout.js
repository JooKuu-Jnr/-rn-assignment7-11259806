import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Checkout = ({ navigation, cart, setCart, openDrawer }) => {
    const [storedCart, setStoredCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const savedCart = await AsyncStorage.getItem('cart');
                if (savedCart !== null) {
                    const cartItems = JSON.parse(savedCart);
                    setStoredCart(cartItems);
                    calculateTotal(cartItems);
                }
            } catch (error) {
                console.error("Failed to load cart from local storage:", error);
            }
        };

        fetchCart();
    }, []);

    useEffect(() => {
        calculateTotal(storedCart);
    }, [storedCart]);

    const calculateTotal = (cartItems) => {
        const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
        setTotalPrice(total);
    };

    const removeFromCart = async (item) => {
        try {
            const newCart = storedCart.filter(cartItem => cartItem.id !== item.id);
            setStoredCart(newCart);
            setCart(newCart);
            await AsyncStorage.setItem('cart', JSON.stringify(newCart));
            calculateTotal(newCart);
        } catch (error) {
            console.error("Failed to remove item from cart:", error);
        }
    };

    const renderItem = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.textContainer}>
                    <Text style={styles.titleText}>{item.title.toUpperCase()}</Text>
                    <Text style={styles.descriptionText}>{item.description}</Text>
                    <Text style={styles.priceText}>${item.price}</Text>
                </View>
                <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeFromCart(item)}
                >
                    <Image 
                        source={require('../assets/remove.png')} 
                        style={styles.removeImage} 
                    />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.Navbar}>
                <TouchableOpacity onPress={openDrawer}>
                    <Image source={require('../assets/Menu.png')} />
                </TouchableOpacity>
                <Image source={require('../assets/Logo.png')} />
                <View style={styles.flex}>
                    <Image source={require('../assets/Search.png')} />
                </View>
            </View>

            <View style={styles.header}>
                <Text style={styles.headerText}>CHECKOUT</Text>
            </View>
            <FlatList
                data={storedCart}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />

            <View style={styles.footer}>
                <View style={styles.row}> 
                    <Text style={styles.totalText}>EST. TOTAL:</Text>
                    <Text style={styles.totalText}>${totalPrice.toFixed(2)}</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.checkoutButton}>
                <Image source={require('../assets/shoppingBag.png')} style={styles.whiteImage} />
                <Text style={styles.checkoutText}>CHECKOUT</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    Navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    flex: {
        flexDirection: 'row',
    },
    header: {
        alignItems: 'center',
        marginTop: 20,
    },
    headerText: {
        fontSize: 32,
        fontWeight: '500',
    },
    listContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
    },
    itemImage: {
        width: 100,
        height: 150,
    },
    textContainer: {
        flex: 1,
        marginLeft: 20,
    },
    titleText: {
        fontSize: 16,
        fontWeight: '500',
        textTransform: 'uppercase',
    },
    descriptionText: {
        fontSize: 12,
        color: 'gray',
    },
    priceText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#DAA06D',
    },
    removeButton: {
        marginLeft: 10,
    },
    removeImage: {
        width: 30,
        height: 30,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    totalText: {
        fontSize: 20,
        fontWeight: '500',
    },
    footer: {
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingVertical: 10,
    },
    checkoutButton: {
        flexDirection: 'row',
        width: '100%',
        height: 70,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    whiteImage: {
        tintColor: 'white',
    },
    checkoutText: {
        marginLeft: 5,
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
    },
});

export default Checkout;
