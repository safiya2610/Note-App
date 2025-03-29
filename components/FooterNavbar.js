import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AddNote from './AddNote';
import Home from './Home';

const Tab = createBottomTabNavigator();

const FooterNavbar = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Your Notes') {
                        iconName = 'book-outline';
                    } else if (route.name === 'New Note') {
                        iconName = 'add-circle-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#6200ea',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}
        >
            <Tab.Screen name="Your Notes" component={Home} />
            <Tab.Screen name="New Note" component={AddNote} />
        </Tab.Navigator>
    );
};

export default FooterNavbar;
