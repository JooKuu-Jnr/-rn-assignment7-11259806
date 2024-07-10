import 'react-native-gesture-handler';
import React, { useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Drawer from 'react-native-drawer';
import HomePage from './pages/HomePage';
import Checkout from './pages/Checkout';
import DetailPage from './pages/DetailPage';
import Sidebar from './components/Sidebar'; // Adjust the import path as necessary

const Stack = createStackNavigator();

const App = () => {
    const [cart, setCart] = useState([]);
    const drawerRef = useRef(null);

    const openDrawer = () => {
        if (drawerRef.current) {
            drawerRef.current.open();
        }
    };

    const closeDrawer = () => {
        if (drawerRef.current) {
            drawerRef.current.close();
        }
    };

    return (
        <NavigationContainer>
            <Drawer
                ref={drawerRef}
                content={<Sidebar closeDrawer={closeDrawer} />}
                type="overlay"
                tapToClose={true}
                openDrawerOffset={0.2} // Adjust this value to set the gap on the right side of the drawer
                panCloseMask={0.2}
                closedDrawerOffset={-3}
                styles={{
                    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
                    main: { paddingLeft: 3 }
                }}
            >
                <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Home">
                        {props => <HomePage {...props} cart={cart} setCart={setCart} openDrawer={openDrawer} />}
                    </Stack.Screen>
                    <Stack.Screen name="Checkout">
                        {props => <Checkout {...props} cart={cart} setCart={setCart} openDrawer={openDrawer} />}
                    </Stack.Screen>
                    <Stack.Screen name="DetailPage" component={DetailPage} />
                </Stack.Navigator>
            </Drawer>
        </NavigationContainer>
    );
};

export default App;
