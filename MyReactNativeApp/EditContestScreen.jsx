import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Button, Text, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useContest } from './ContestContext';

const EditContestScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { contest } = route.params;
  const { updateContest, error } = useContest();

  const [contestDetails, setContestDetails] = useState({ ...contest });

  const handleEdit = () => {
    try {
      updateContest(contestDetails);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update contest');  // Show error alert
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);  // Show error alert
    }
  }, [error]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Contest</Text>
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
        value={contestDetails.maxplayers.toString()}
        onChangeText={(text) => setContestDetails((prev) => ({ ...prev, maxplayers: text }))}
        keyboardType="numeric"
      />
      <Button title="Save Changes" onPress={handleEdit} />
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

export default EditContestScreen;
