import React from 'react';
import { Switch } from 'react-native';
import { useTheme } from '../hooks/useTheme';

const ToggleTheme = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Switch
      value={theme === 'dark'}
      onValueChange={toggleTheme}
      thumbColor={theme === 'dark' ? '#fff' : '#000'}
      trackColor={{ false: '#767577', true: '#81b0ff' }}
    />
  );
};

export default ToggleTheme;
