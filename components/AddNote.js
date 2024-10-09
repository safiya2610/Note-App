import React, { useState } from 'react';
import { View, TextInput, Keyboard, StyleSheet, Text, KeyboardAvoidingView } from 'react-native';
import { firebase } from '../config';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AddNote = () => {
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');

    const handleAdd = () => {
        firebase.firestore()
            .collection('notes')
            .add({
                title, 
                note, 
            })
            .then(() => {
                setTitle('');
                setNote('');
                Keyboard.dismiss();
            })
            .catch((error) => {
                alert(error);
            });
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <TextInput
                placeholder='Title'
                value={title}
                onChangeText={(text) => setTitle(text)}
                style={styles.titleInput}
                placeholderTextColor="#888"
            />
            <TextInput
                placeholder='Note'
                value={note}
                onChangeText={(text) => setNote(text)}
                style={styles.noteInput}
                multiline
                placeholderTextColor="#888"
                textAlignVertical="top"
            />
            <TouchableOpacity style={styles.btn} onPress={handleAdd}>
                <Text style={styles.btnText}>Add</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

export default AddNote;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FAFAFA', 
    },
    titleInput: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        height: 50,
        width: '100%',
        borderWidth: 1,
        borderColor: '#FF7F50', 
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
    },
    noteInput: {
        fontSize: 16,
        fontWeight: 'normal',
        marginBottom: 20,
        height: 150,
        width: '100%',
        borderWidth: 1,
        borderColor: '#20B2AA',
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: '#FFF', 
    },
    btn: {
        backgroundColor: '#87ceeb', 
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    btnText: {
        color: '#FFF', 
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
    },
});
