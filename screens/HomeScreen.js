import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import CreateTask from '../components/CreateTask';
import TaskList from '../components/TaskList';
import ToggleTheme from '../components/ToggleTheme';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ToggleTheme />
      <CreateTask />
      <TaskList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
});

export default HomeScreen;
