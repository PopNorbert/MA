import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import CreateContestScreen from './CreateContestScreen';
import EditContestScreen from './EditContestScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Contests' }} />
        <Stack.Screen name="CreateContest" component={CreateContestScreen} options={{ title: 'Create Contest' }} />
        <Stack.Screen name="EditContest" component={EditContestScreen} options={{ title: 'Edit Contest' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
