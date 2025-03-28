import React from 'react';
import { StyleSheet } from 'react-native';

import AddNote from './components/AddNote';
import Header from './components/Header';
import Home from './components/Home';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { createStackNavigator } from '@react-navigation/stack';
import Detail from './components/Detail';
// Create a Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      <NavigationContainer>
        <Stack.Navigator>
          {/* Add your screens here */}
          <Stack.Screen name="Home" component={Home}
            options={{
              headerTitle: () => <Header name="Notes" />,
              headerStyle: {
                backgroundColor: '#F88',
                height: 120,
              }
            }}
          />
          <Stack.Screen name="AddNote" component={AddNote}
            options={{
              headerTitle: () => <Header name="Notes" />,
              headerStyle: {
                backgroundColor: '#F88',
                height: 120,
              }
            }}
          />
          <Stack.Screen name="Detail" component={Detail}
            options={{
              headerTitle: () => <Header name="Edit Notes" />,
              headerStyle: {
                backgroundColor: '#F88',
                height: 120,
              }
            }}
          />

        </Stack.Navigator>
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
