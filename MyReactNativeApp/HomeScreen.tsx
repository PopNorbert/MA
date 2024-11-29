import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Button } from 'react-native';
import Contest from './Contest.jsx';
import { Alert } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [contests, setContests] = useState([
    { id: 1, name: 'Table Tennis Championship', category: 'ELITE', location: 'Basel, Switzerland', date: '2024-02-18', maxplayers: 16 },
    { id: 2, name: 'Amateur League', category: 'HOBBY', location: 'Zurich, Switzerland', date: '2024-03-10', maxplayers: 8 },
  ]);

  const deleteContest = (id) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            setContests((prevContests) => prevContests.filter((contest) => contest.id !== id));
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Button
        title="Create New Contest"
        onPress={() => navigation.navigate('CreateContest', { setContests })}
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
            onDelete={deleteContest}
            onEdit={() => navigation.navigate('EditContest', { contest: item, setContests })}
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
