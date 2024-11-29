import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const CreateContestScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { setContests } = route.params;

  const [contestDetails, setContestDetails] = useState({
    name: '',
    category: '',
    location: '',
    date: '',
    maxplayers: '',
  });

  const handleCreate = () => {
    setContests((prevContests) => [
      ...prevContests,
      { id: Date.now(), ...contestDetails },
    ]);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Contest</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={contestDetails.name}
        onChangeText={(text) => setContestDetails((prev) => ({ ...prev, name: text }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={contestDetails.category}
        onChangeText={(text) => setContestDetails((prev) => ({ ...prev, category: text }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={contestDetails.location}
        onChangeText={(text) => setContestDetails((prev) => ({ ...prev, location: text }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Date"
        value={contestDetails.date}
        onChangeText={(text) => setContestDetails((prev) => ({ ...prev, date: text }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Max Players"
        value={contestDetails.maxplayers}
        onChangeText={(text) => setContestDetails((prev) => ({ ...prev, maxplayers: text }))}
        keyboardType="numeric"
      />
      <Button title="Create" onPress={handleCreate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
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
});

export default CreateContestScreen;
