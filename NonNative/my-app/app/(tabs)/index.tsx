import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Button, Modal, TextInput, Text } from 'react-native';
import Contest from '../../components/Contest';

const HomeScreen = () => {
  const [contests, setContests] = useState([
    { id: 1, name: 'Table Tennis Championship', category: 'ELITE', location: 'Basel, Switzerland', date: '2024-02-18', maxplayers: 16 },
    { id: 2, name: 'Amateur League', category: 'HOBBY', location: 'Zurich, Switzerland', date: '2024-03-10', maxplayers: 8 },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedContest, setSelectedContest] = useState(null);
  const [updatedContest, setUpdatedContest] = useState({});

  const deleteContest = (id) => {
    setContests((prevContests) => prevContests.filter((contest) => contest.id !== id));
  };

  const openEditModal = (contest) => {
    setSelectedContest(contest);
    setUpdatedContest({ ...contest }); // Clone the selected contest for editing
    setModalVisible(true);
  };

  const handleSave = () => {
    setContests((prevContests) =>
      prevContests.map((contest) =>
        contest.id === selectedContest.id ? { ...contest, ...updatedContest } : contest
      )
    );
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Contest
            id={item.id}
            name={item.name}
            category={item.category}
            location={item.location}
            date={item.date}
            maxplayers={item.maxplayers}
            onDelete={deleteContest}
            onEdit={openEditModal}
          />
        )}
      />

      {/* Edit Modal */}
      <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit Contest</Text>
          <Text>Name</Text>
          <TextInput
            style={styles.input}
            value={updatedContest.name}
            onChangeText={(text) => setUpdatedContest((prev) => ({ ...prev, name: text }))}
          />
          <Text>Category</Text>
          <TextInput
            style={styles.input}
            value={updatedContest.category}
            onChangeText={(text) => setUpdatedContest((prev) => ({ ...prev, category: text }))}
          />
          <Text>Location</Text>
          <TextInput
            style={styles.input}
            value={updatedContest.location}
            onChangeText={(text) => setUpdatedContest((prev) => ({ ...prev, location: text }))}
          />
          <Text>Date</Text>
          <TextInput
            style={styles.input}
            value={updatedContest.date}
            onChangeText={(text) => setUpdatedContest((prev) => ({ ...prev, date: text }))}
          />
          <Text>Max Players</Text>
          <TextInput
            style={styles.input}
            value={updatedContest.maxplayers}
            onChangeText={(text) => setUpdatedContest((prev) => ({ ...prev, maxplayers: text }))}
            keyboardType="numeric"
          />
          <View style={styles.buttonsContainer}>
            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} color="gray" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    marginVertical: 10,
    padding: 8,
    fontSize: 16,
  },
  buttonsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default HomeScreen;
