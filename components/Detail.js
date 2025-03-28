import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';
import AnimatedButton from './AnimatedButton';
import Modal from 'react-native-modal';

const Detail = ({ route }) => {
  const navigation = useNavigation();
  const [noteText, setNoteText] = useState(route.params.item.note);
  const [noteTitle, setNoteTitle] = useState(route.params.item.title);
  const [isModalVisible, setModalVisible] = useState(false);

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
    setModalVisible(true);
  };

  const confirmDelete = () => {
    firebase.firestore()
      .collection('notes')
      .doc(route.params.item.id)
      .delete()
      .then(() => {
        setModalVisible(false);
        navigation.navigate('Home');
      })
      .catch((error) => {
        alert(error);
        setModalVisible(false);
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
        <AnimatedButton
          title="Update"
          onPress={handleUpdate}
          style={styles.updateBtn}
        />
        <AnimatedButton
          title="Delete"
          onPress={handleDelete}
          style={styles.deleteBtn}
        />
      </View>

      {/* Modal for Delete Confirmation */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Are you sure you want to delete this note?</Text>
          <View style={styles.modalBtnView}>
            <AnimatedButton
              title="Cancel"
              onPress={() => setModalVisible(false)}
              style={styles.cancelBtn}
            />
            <AnimatedButton
              title="Delete"
              onPress={confirmDelete}
              style={styles.confirmBtn}
            />
          </View>
        </View>
      </Modal>
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
  },
  textArea: {
    height: 200,
    borderColor: '#20B2AA',
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    textAlignVertical: 'top',
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  updateBtn: {
    backgroundColor: '#20B2AA',
  },
  deleteBtn: {
    backgroundColor: '#FF7F50',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalBtnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelBtn: {
    backgroundColor: '#20B2AA',
  },
  confirmBtn: {
    backgroundColor: '#FF7F50',
  },
});
