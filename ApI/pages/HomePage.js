import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomePage = ({ navigation, cart, setCart }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Failed to fetch data from API:", error);
            }
        };

        fetchData();

        const fetchCart = async () => {
            try {
                const savedCart = await AsyncStorage.getItem('cart');
                if (savedCart) {
                    setCart(JSON.parse(savedCart));
                }
            } catch (error) {
                console.error("Failed to load cart from local storage:", error);
            }
        };

        fetchCart();
    }, []);

    const addToCart = async (item) => {
        try {
            const itemExists = cart.find(cartItem => cartItem.id === item.id);
            if (!itemExists) {
                const newCart = [...cart, item];
                setCart(newCart);
                await AsyncStorage.setItem('cart', JSON.stringify(newCart));
            } else {
                console.log("Item is already in the cart");
            }
        } catch (error) {
            console.error("Failed to save cart to local storage:", error);
        }
    };

    const renderItem = ({ item }) => {
        return (
            <View style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.cardImage} />
                <View style={styles.textContainer}>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <Text style={styles.descriptionText}>{item.description}</Text>
                    <Text style={styles.priceText}>${item.price}</Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => addToCart(item)}
                >
                    <Image 
                        source={require('../assets/add_circle.png')} 
                        style={styles.overlayImage} 
                    />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.Navbar}>
            <TouchableOpacity>
                <Image source={require('../assets/Menu.png')} />
            </TouchableOpacity>
                <Image source={require('../assets/Logo.png')} />
                <View style={styles.flex}>
                    <Image source={require('../assets/Search.png')} />
                    <TouchableOpacity onPress={() => navigation.navigate('Checkout')}>
                        <Image source={require('../assets/shoppingBag.png')} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.Header}>
                <Text style={styles.headerText}>OUR STORY</Text>
                <View style={styles.circle}>
                    <TouchableOpacity>
                        <Image source={require('../assets/Listview.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.circle2}>
                    <TouchableOpacity>
                        <Image source={require('../assets/Filter.png')} />
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.column}
                contentContainerStyle={styles.layout}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
    Navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    flex: {
        flexDirection: 'row',
    },
    Header: {
        marginTop: 20,
        flexDirection: 'row',
    },
    headerText: {
        fontSize: 32,
        fontWeight: '400',
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 20,
        backgroundColor: '#D3D3D3',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
    },
    circle2: {
        width: 30,
        height: 30,
        borderRadius: 20,
        backgroundColor: '#D3D3D3',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 14,
    },
    layout: {
        marginTop: 20,
    },
    column: {
        justifyContent: 'space-between',
    },
    card: {
        position: 'relative',
        width: '48%',
        marginBottom: 20,
    },
    cardImage: {
        width: '100%',
        height: 200,
    },
    button: {
        position: 'absolute',
        bottom: 70,
        right: 10,
    },
    overlayImage: {
        width: 30,
        height: 30,
    },
    textContainer: {
        marginTop: 10,
    },
    titleText: {
        fontSize: 16,
        fontWeight: '500',
    },
    descriptionText: {
        fontSize: 12,
    },
    priceText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#DAA06D',
    },
});

export default HomePage;
