import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ContestContext = createContext();


export const ContestProvider = ({ children }) => {
  const [contests, setContests] = useState([]);

  
  useEffect(() => {
    const loadContests = async () => {
      try {
        const storedContests = await AsyncStorage.getItem('contests');
        if (storedContests) {
          setContests(JSON.parse(storedContests));  
        }
      } catch (error) {
        console.error('Failed to load contests from AsyncStorage', error);
      }
    };

    loadContests();
  }, []);

  
  const saveContestsToStorage = async (newContests) => {
    try {
      await AsyncStorage.setItem('contests', JSON.stringify(newContests));
    } catch (error) {
      console.error('Failed to save contests to AsyncStorage', error);
    }
  };

  const addContest = (contest) => {
    const updatedContests = [...contests, contest];
    setContests(updatedContests);
    saveContestsToStorage(updatedContests);  
  };

  const updateContest = (updatedContest) => {
    const updatedContests = contests.map((contest) =>
      contest.id === updatedContest.id ? { ...contest, ...updatedContest } : contest
    );
    setContests(updatedContests);
    saveContestsToStorage(updatedContests);  
  };

  const deleteContest = (id) => {
    const updatedContests = contests.filter((contest) => contest.id !== id);
    setContests(updatedContests);
    saveContestsToStorage(updatedContests);  
  };

  return (
    <ContestContext.Provider value={{ contests, addContest, updateContest, deleteContest }}>
      {children}
    </ContestContext.Provider>
  );
};


export const useContest = () => {
  return useContext(ContestContext);
};
