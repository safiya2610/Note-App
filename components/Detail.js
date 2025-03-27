import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { firebase } from '../config';

const Detail = ({ route }) => {
    const navigation = useNavigation();
    const [noteText, setNoteText] = useState(route.params.item.note);
    const [noteTitle, setNoteTitle] = useState(route.params.item.title);
    
    const handleUpdate = () => {
        if (noteTitle && noteTitle.length > 0) {
            firebase.firestore()
            .collection('notes')
            .doc(route.params.item.id)
            .update({
                title: noteTitle,
                note: noteText,
            })
            .then(() => {
                navigation.navigate('Home');
            })
            .catch((error) => {
                alert(error);
            });
        }
    };

    const handleDelete = () => {
        firebase.firestore()
        .collection('notes')
        .doc(route.params.item.id)
        .delete()
        .then(() => {
            navigation.navigate('Home');
        })
        .catch((error) => {
            alert(error);  
        });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='Title'
                value={noteTitle}
                onChangeText={(text) => setNoteTitle(text)}
                placeholderTextColor="#888"
            />
            <TextInput
                style={styles.textArea}
                placeholder='Note'
                value={noteText}
                onChangeText={(text) => setNoteText(text)}
                multiline={true}
                placeholderTextColor="#888"
            />
            
            <View style={styles.btnView}>
                <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
                    <Text style={styles.btnTxt}>Update</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
                    <Text style={styles.btnTxt}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Detail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FAFAFA', 
    },
    input: {
        height: 50,
        borderColor: '#FF7F50', 
        borderWidth: 2,
        marginBottom: 15,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    textArea: {
        height: 200,
        borderColor: '#20B2AA', 
        borderWidth: 2,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        textAlignVertical: 'top',
    },
    btnView: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    updateBtn: {
        margin:10,
        backgroundColor: '#20B2AA', 
        padding: 15,
        borderRadius: 10,
        width: '48%',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    deleteBtn: {
        backgroundColor: '#FF7F50', 
        padding: 15,
        borderRadius: 10,
        width: '48%',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    btnTxt: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});