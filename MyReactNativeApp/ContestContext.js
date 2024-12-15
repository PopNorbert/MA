import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ContestContext = createContext();

export const ContestProvider = ({ children }) => {
  const [contests, setContests] = useState([]);
  const [error, setError] = useState(null);  // Add state to store errors

  useEffect(() => {
    const loadContests = async () => {
      try {
        const storedContests = await AsyncStorage.getItem('contests');
        if (storedContests) {
          setContests(JSON.parse(storedContests));  
        }
      } catch (error) {
        setError('Failed to load contests from storage');  // Handle error
      }
    };

    loadContests();
  }, []);

  const saveContestsToStorage = async (newContests) => {
    try {
      await AsyncStorage.setItem('contests', JSON.stringify(newContests));
    } catch (error) {
      setError('Failed to save contests to storage');  // Handle error
    }
  };

  const addContest = (contest) => {
    try {
      const updatedContests = [...contests, contest];
      setContests(updatedContests);
      saveContestsToStorage(updatedContests);
    } catch (error) {
      setError('Failed to add new contest');
    }
  };

  const updateContest = (updatedContest) => {
    try {
      const updatedContests = contests.map((contest) =>
        contest.id === updatedContest.id ? { ...contest, ...updatedContest } : contest
      );
      setContests(updatedContests);
      saveContestsToStorage(updatedContests);
    } catch (error) {
      setError('Failed to update contest');
    }
  };

  const deleteContest = (id) => {
    try {
      const updatedContests = contests.filter((contest) => contest.id !== id);
      setContests(updatedContests);
      saveContestsToStorage(updatedContests);
    } catch (error) {
      setError('Failed to delete contest');
    }
  };

  return (
    <ContestContext.Provider value={{ contests, addContest, updateContest, deleteContest, error }}>
      {children}
    </ContestContext.Provider>
  );
};

export const useContest = () => {
  return useContext(ContestContext);
};
