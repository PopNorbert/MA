import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import CreateContestScreen from './CreateContestScreen';
import EditContestScreen from './EditContestScreen';
import { ContestProvider } from './ContestContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <ContestProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Contests' }} />
          <Stack.Screen name="CreateContest" component={CreateContestScreen} options={{ title: 'Create Contest' }} />
          <Stack.Screen name="EditContest" component={EditContestScreen} options={{ title: 'Edit Contest' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContestProvider>
  );
};

export default App;
