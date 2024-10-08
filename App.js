import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateTask from './components/CreateTask';
import TaskList from './components/TaskList';
import { TaskProvider } from './hooks/useTasks';
import { ThemeProvider } from './hooks/useTheme';
import { Ionicons } from '@expo/vector-icons'; // Optional: for icons in the tab

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <ThemeProvider>
      <TaskProvider>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="TaskList"
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;
                if (route.name === 'CreateTask') {
                  iconName = 'add-circle-outline'; // Icon for CreateTask
                } else if (route.name === 'TaskList') {
                  iconName = 'list-outline'; // Icon for TaskList
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'gray',
            }}
          >
            <Tab.Screen name="CreateTask" component={CreateTask} />
            <Tab.Screen name="TaskList" component={TaskList} />
          </Tab.Navigator>
        </NavigationContainer>
      </TaskProvider>
    </ThemeProvider>
  );
};

export default App;
