import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import * as SQLite from 'expo-sqlite';

const ContestContext = createContext();

export const ContestProvider = ({ children }) => {
  const [contests, setContests] = useState([]);
  const [error, setError] = useState(null);
  const [isOnline, setIsOnline] = useState(false); 
  const [ws, setWs] = useState(null);
  const apiUrl = 'http://192.168.1.199:3000/api/contests';  
  const websocketUrl = 'ws://192.168.1.199:3000';
  

  const connectWebSocket = () => {
    const socket = new WebSocket(websocketUrl);

    socket.onopen = async () => {
      console.log('WebSocket connected');
      try {
        const db = await SQLite.openDatabaseAsync('database');
        await db.execAsync(`CREATE TABLE IF NOT EXISTS contest (
          id INTEGER PRIMARY KEY,
          name TEXT ,
          category TEXT ,
          location TEXT ,
          date TEXT ,
          maxplayers INTEGER 
        );`)
        const storedContests = await db.getAllAsync('select * from contest');
        if (storedContests) {
          await axios.post(`${apiUrl}/sync`,storedContests)
        }
      } catch (error) {
        setError(error.message);  
      }
      setIsOnline(true);
    };
    socket.onmessage = (message) => {
      console.log('Received message:', message.data);
    };


    socket.onerror = (error) => {
      setIsOnline(false);
    };

    socket.onclose = (event) => {
      setIsOnline(false);
      reconnectWebSocket();  
    };

    setWs(socket);
  };

  const reconnectWebSocket = () => {
    setTimeout(() => {
      connectWebSocket();  
    }, 5000);  
  };

  useEffect(() => {
    connectWebSocket();  

    return () => {
      if (ws) {
        ws.close(); 
      }
    };
  }, []);
  useEffect(() => {
    const loadContests = async () => {
        try {
          const db = await SQLite.openDatabaseAsync('database');
          await db.execAsync(`CREATE TABLE IF NOT EXISTS contest (
            id INTEGER PRIMARY KEY,
            name TEXT ,
            category TEXT ,
            location TEXT ,
            date TEXT ,
            maxplayers INTEGER 
          );`)
          const storedContests = await db.getAllAsync('select * from contest');
          if (storedContests) {
            setContests(storedContests);  
          }
          console.log("fetched contests", storedContests.length)
        } catch (error) {
          setError(error.message);  
        }
      if(isOnline){
        try {
          const response = await axios.get(apiUrl);
          setContests(response.data);
        } catch (error) {
          setError('Failed to load contests');
        }}
    };

    loadContests();
  }, []);

  const addContest = async (contest) => {
    try {
      const db = await SQLite.openDatabaseAsync('database');
      await db.runAsync('insert into contest (id, name, category, location, date, maxplayers) values (?,?,?,?,?,?)',contest.id, contest.name, contest.category, contest.location, contest.date, contest.maxplayers);
      const updatedContests = [...contests, contest];
      setContests(updatedContests);
      console.log(`Added contest: ${contest.name} (ID: ${contest.id})`);
    } catch (error) {
      setError(error.message);
    }
    if(isOnline){
      try {
        const response = await axios.post(apiUrl, contest);
        setContests([...contests, response.data]);
      } catch (error) {
        setError('Failed to add contest');
      }
    }
  };

  const updateContest = async (updatedContest) => {
    try {
      const db = await SQLite.openDatabaseAsync('database');
      await db.runAsync(
        'UPDATE contest SET name = ?, category = ?, location = ?, date = ?, maxplayers = ? WHERE id = ?',
        updatedContest.name, updatedContest.category, updatedContest.location, updatedContest.date, updatedContest.maxplayers, updatedContest.id
    );      const updatedContests = contests.map((contest) =>
        contest.id === updatedContest.id ? { ...contest, ...updatedContest } : contest
      );
      setContests(updatedContests);
      console.log(`Updated contest: ${updatedContest.name} (ID: ${updatedContest.id})`);

    } catch (error) {
      setError('Failed to update contest');
    }
    if(isOnline){
    try {
      const response = await axios.put(`${apiUrl}/${updatedContest.id}`, updatedContest);
      setContests(
        contests.map((contest) =>
          contest.id === updatedContest.id ? { ...contest, ...updatedContest } : contest
        )
      );
    } catch (error) {
      setError('Failed to update contest');
    }
  }
  };

  const deleteContest = async (id) => {
    try {
      const db = await SQLite.openDatabaseAsync('database');
      await db.runAsync('delete from contest where id = ?', id)
      const updatedContests = contests.filter((contest) => contest.id !== id);
      setContests(updatedContests);
      console.log(`Deleted contest: (ID: ${id})`);
    } catch (error) {
      setError('Failed to delete contest');
    }
    if(isOnline){
    try {
      await axios.delete(`${apiUrl}/${id}`);
      setContests(contests.filter((contest) => contest.id !== id));
    } catch (error) {
      setError('Failed to delete contest');
    }}
  };

  return (
    <ContestContext.Provider value={{ contests, addContest, updateContest, deleteContest, error, isOnline }}>
      {children}
    </ContestContext.Provider>
  );
};

export const useContest = () => {
  return useContext(ContestContext);
};
