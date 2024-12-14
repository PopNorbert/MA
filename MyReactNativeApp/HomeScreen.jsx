import React from 'react';
import { FlatList, View, StyleSheet, Button, Alert } from 'react-native';
import Contest from './Contest.jsx';
import { useContest } from './ContestContext.js';

const HomeScreen = ({ navigation }) => {
  const { contests, deleteContest } = useContest();

  const confirmDelete = (id) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => deleteContest(id) },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Button
        title="Create New Contest"
        onPress={() => navigation.navigate('CreateContest')}
        color="green"
      />
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
            onDelete={confirmDelete}
            onEdit={() => navigation.navigate('EditContest', { contest: item })}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default HomeScreen;