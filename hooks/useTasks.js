import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

 
  const fetchTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks !== null) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Error fetching tasks from AsyncStorage:', error);
    }
  };

  
  const addTask = async (task) => {
    try {
      const newTask = { id: Date.now().toString(), ...task };
      const updatedTasks = [...tasks, newTask];
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error adding task to AsyncStorage:', error);
    }
  };

  
  const updateTask = async (id, updatedTask) => {
    try {
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      );
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task in AsyncStorage:', error);
    }
  };

  
  const deleteTask = async (id) => {
    try {
      const filteredTasks = tasks.filter((task) => task.id !== id);
      await AsyncStorage.setItem('tasks', JSON.stringify(filteredTasks));
      setTasks(filteredTasks);
    } catch (error) {
      console.error('Error deleting task from AsyncStorage:', error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(TaskContext);
};
