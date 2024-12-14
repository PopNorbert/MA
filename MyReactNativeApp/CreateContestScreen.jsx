import React, { useState } from 'react';
import { TextInput, Button, View, StyleSheet } from 'react-native';
import { useContest } from './ContestContext';

const CreateContest = ({ navigation }) => {
  const { addContest } = useContest();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [maxplayers, setMaxplayers] = useState('');

  const handleCreate = () => {
    const newContest = {
      id: Date.now(),
      name,
      category,
      location,
      date,
      maxplayers: parseInt(maxplayers, 10),
    };
    addContest(newContest);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Contest Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />
      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />
      <TextInput
        placeholder="Date"
        value={date}
        onChangeText={setDate}
        style={styles.input}
      />
      <TextInput
        placeholder="Max Players"
        value={maxplayers}
        onChangeText={setMaxplayers}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Create Contest" onPress={handleCreate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    padding: 10,
  },
});

export default CreateContest;