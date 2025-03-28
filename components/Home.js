import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '../config'; // Importing db 
import { FlashList } from '@shopify/flash-list';

const Home = () => {
    const [notes, setNotes] = useState([]);
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);

    // Data fetch
    useEffect(() => {
        const unsubscribe = db.collection('notes').onSnapshot((querySnapshot) => {
            const newNotes = [];
            querySnapshot.forEach((doc) => {
                const { note, title } = doc.data();
                newNotes.push({ note, title, id: doc.id });
            });
            setNotes(newNotes);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);
    console.log("notes", notes);

    return (
        <View style={styles.Cont}>
            {
                isLoading ? (
                    <Text style={{
                        textAlign: 'center',
                        margin: 20,
                        fontSize: 30,
                    }}>Loading...</Text>
                ) : notes.length === 0 ? (
                    <Text style={{ textAlign: 'center', margin: 20, fontSize: 30 }}>No notes available</Text>
                ) : (

                    <FlashList
                        data={notes}
                        numColumns={2}
                        estimatedItemSize={100}
                        renderItem={({ item }) => (
                            <View style={styles.noteView}>
                                <Pressable
                                    onPress={() => navigation.navigate('Detail', { item })}
                                >
                                    <Text style={styles.noteTitle}>{item.title}</Text>
                                    <Text style={styles.noteDescription}>{item.note}</Text>
                                </Pressable>
                            </View>
                        )}
                    />

                )
            }
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddNote')}>
                <Text style={styles.addButtonText}>Add Notes</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    Cont: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        padding: 10,
    },
    noteView: {
        padding: 15,
        margin: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        flex: 1,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
        elevation: 3,
    },
    noteTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333333',
    },
    noteDescription: {
        color: '#777777',
        marginTop: 5,
        fontSize: 14,
    },
    addButton: {
        backgroundColor: '#87ceeb',
        borderRadius: 30,
        paddingVertical: 12,
        paddingHorizontal: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        borderWidth: 2,
        borderColor: '#0056b3',
        elevation: 3,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Home;
