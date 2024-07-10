import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ScrollView } from 'react-native';

const DetailPage = ({ route, navigation }) => {
    const { item } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.Navbar}>
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
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
            
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{item.title.toUpperCase()}</Text>
                    <Text style={styles.price}>${item.price}</Text>
                    <View style={styles.materials}>
                        <Text style={styles.materialsTitle}>MATERIALS</Text>
                        <Text style={styles.materialsDescription}>
                            We work with monitoring programmes to ensure compliance with safety, health and quality standards for our products.
                        </Text>
                        <Text style={styles.iconText}>Do not use bleach</Text>
                        <Text style={styles.iconText}>Do not tumble dry</Text>
                        <Text style={styles.iconText}>Dry clean with tetrachloroethylene</Text>
                        <Text style={styles.iconText}>Iron at a maximum of 110°C/230°F</Text>
                    </View>
                    <View style={styles.shipping}>
                        <Text style={styles.shippingText}>Free Flat Rate Shipping</Text>
                        <Text style={styles.estimatedDelivery}>Estimated to be delivered on 09/07/2023 - 12/07/2023.</Text>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>ADD TO BASKET</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    Navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    flex: {
        flexDirection: 'row',
    },
    contentContainer: {
        padding: 20,
    },
    imageContainer: {
        width: '100%',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    detailsContainer: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#DAA06D',
        marginBottom: 20,
    },
    materials: {
        marginBottom: 20,
    },
    materialsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    materialsDescription: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
    },
    iconText: {
        fontSize: 14,
        marginBottom: 5,
    },
    shipping: {
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingTop: 10,
    },
    shippingText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    estimatedDelivery: {
        fontSize: 14,
        color: '#555',
    },
    addButton: {
        backgroundColor: '#000',
        padding: 20,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default DetailPage;
