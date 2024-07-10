import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Sidebar = ({ navigation, closeDrawer }) => {
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={closeDrawer} style={styles.closeButton}>
                <Image source={require('../assets/Close.png')} style={styles.closeImage} />
            </TouchableOpacity>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>ERIC ATSU</Text>
                <View style={styles.headerBorder} />
            </View>
            <TouchableOpacity onPress={() => { navigation.navigate('Store'); closeDrawer(); }}>
                <Text style={styles.menuItem}>Store</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('Locations'); closeDrawer(); }}>
                <Text style={styles.menuItem}>Locations</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('Blog'); closeDrawer(); }}>
                <Text style={styles.menuItem}>Blog</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('Jewelry'); closeDrawer(); }}>
                <Text style={styles.menuItem}>Jewelry</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('Electronics'); closeDrawer(); }}>
                <Text style={styles.menuItem}>Electronics</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('Clothing'); closeDrawer(); }}>
                <Text style={styles.menuItem}>Clothing</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        paddingTop: 60,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        maxWidth: 250,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    closeImage: {
        width: 24,
        height: 24,
    },
    headerContainer: {
        marginBottom: 30,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    headerBorder: {
        marginTop: 5,
        width: 100,
        marginLeft:10,
        height: 1,
        backgroundColor: 'red',
    },
    menuItem: {
        fontSize: 18,
        marginVertical: 15,
        color: '#333',
    },
});

export default Sidebar;
