import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Home from './components/Home';
import AddNote from './components/AddNote';
import Detail from './components/Detail';
import Header from './components/Header';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigator
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home}
        options={{
          headerTitle: () => <Header name="Notes" />,
          headerStyle: { backgroundColor: '#F88', height: 120 }
        }}
      />
      <Stack.Screen name="Detail" component={Detail}
        options={{
          headerTitle: () => <Header name="Edit Notes" />,
          headerStyle: { backgroundColor: '#F88', height: 120 }
        }}
      />
      <Stack.Screen
        name="AddNote"
        component={AddNote}
        options={{
          headerTitle: () => <Header name="Add Notes" />,
          headerStyle: { backgroundColor: '#F88', height: 120 }
        }}
      />
    </Stack.Navigator>
  );
}

// Bottom Tab Navigator
// Bottom Tab Navigator
function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 15,
          fontWeight: 'bold',
        },
        tabBarStyle: {
          paddingBottom: 15, // Add bottom padding
          height: 70, // Control height
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: 'absolute', // Ensure floating effect
          backgroundColor: '#ffffff',
        },
        tabBarActiveTintColor: '#6200ea',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Notes" component={HomeStack} />
      <Tab.Screen name="Add Note" component={AddNote} />
    </Tab.Navigator>
  );
}


// Root Component
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <AppTabs />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
});
