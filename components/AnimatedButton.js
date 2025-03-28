import React, { useRef } from 'react';
import { Animated, TouchableWithoutFeedback, StyleSheet, Text } from 'react-native';

const AnimatedButton = ({ onPress, title, style, textStyle }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start(() => onPress && onPress());
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[styles.button, style, { transform: [{ scale: scaleAnim }] }]}>
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF7F50',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 6, // Adjust for rectangular shape with slightly rounded corners
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AnimatedButton;
