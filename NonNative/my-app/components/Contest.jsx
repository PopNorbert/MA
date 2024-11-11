import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Contest = ({ id, name, category, location, date, maxplayers, onDelete, onEdit }) => {
  const confirmDelete = () => {
    Alert.alert(
      'Delete Contest',
      'Are you sure you want to delete this contest?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => onDelete(id) },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.details}>Category: {category}</Text>
        <Text style={styles.details}>Location: {location}</Text>
        <Text style={styles.details}>Date: {date}</Text>
        <Text style={styles.details}>Max Players: {maxplayers}</Text>
      </View>
      <Button title="Edit" onPress={() => onEdit({ id, name, category, location, date, maxplayers })} color="blue" />
      <Button title="Delete" onPress={confirmDelete} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  infoContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  details: {
    fontSize: 16,
    color: '#555',
  },
});

export default Contest;
