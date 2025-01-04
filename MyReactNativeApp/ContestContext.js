import React, { createContext, useState, useContext, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';

const ContestContext = createContext();

export const ContestProvider = ({ children }) => {
  const [contests, setContests] = useState([]);
  const [error, setError] = useState(null);  

  useEffect(() => {
    const loadContests = async () => {
      try {
        const db = await SQLite.openDatabaseAsync('database');
        await db.execAsync(`CREATE TABLE IF NOT EXISTS contests (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT ,
          category TEXT ,
          location TEXT ,
          date TEXT ,
          maxplayers INTEGER 
        );`)
        const storedContests = await db.getAllAsync('select * from contests');
        if (storedContests) {
          setContests(storedContests);  
        }
      } catch (error) {
        setError(error.message);  
      }
    };

    loadContests();
  }, []);

  const addContest = async (contest) => {
    try {
      const db = await SQLite.openDatabaseAsync('database');
      await db.runAsync('insert into contests (name, category, location, date, maxplayers) values (?,?,?,?,?)', contest.name, contest.category, contest.location, contest.date, contest.maxplayers);
      const updatedContests = [...contests, contest];
      setContests(updatedContests);
    } catch (error) {
      setError(error.message);
    }
  };

  const updateContest = async (updatedContest) => {
    try {
      const db = await SQLite.openDatabaseAsync('database');
      await db.runAsync(
        'UPDATE contests SET name = ?, category = ?, location = ?, date = ?, maxplayers = ? WHERE id = ?',
        updatedContest.name, updatedContest.category, updatedContest.location, updatedContest.date, updatedContest.maxplayers, updatedContest.id
    );      const updatedContests = contests.map((contest) =>
        contest.id === updatedContest.id ? { ...contest, ...updatedContest } : contest
      );
      setContests(updatedContests);
    } catch (error) {
      setError('Failed to update contest');
    }
  };

  const deleteContest = async (id) => {
    try {
      const db = await SQLite.openDatabaseAsync('database');
      await db.runAsync('delete from contests where id = ?', id)
      const updatedContests = contests.filter((contest) => contest.id !== id);
      setContests(updatedContests);
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
