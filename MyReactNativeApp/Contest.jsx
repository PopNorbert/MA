import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Contest = ({ id, name, category, location, date, maxplayers, onDelete, onEdit }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.details}>Category: {category}</Text>
      <Text style={styles.details}>Location: {location}</Text>
      <Text style={styles.details}>Date: {date}</Text>
      <Text style={styles.details}>Max Players: {maxplayers}</Text>
      <View style={styles.buttonsContainer}>
        <Button title="Edit" onPress={onEdit} color="blue" />
        <Button title="Delete" onPress={() => onDelete(id)} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  details: {
    fontSize: 14,
    marginBottom: 2,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default Contest;
