import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTasks } from '../hooks/useTasks';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import ToggleTheme from './ToggleTheme';
import { useTheme } from '../hooks/useTheme';

const CreateTask = () => {
  const { theme } = useTheme(); // Get the current theme
  const navigation = useNavigation();
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [priority, setPriority] = useState('Low');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = () => {
    if (title.trim() === '') {
      Alert.alert('Validation Error', 'Title is required!');
      return;
    }
    if (description.trim() === '') {
      Alert.alert('Validation Error', 'Description is required!');
      return;
    }

    addTask({
      title,
      description,
      dueDate: dueDate.toISOString(),
      priority,
    });

    setTitle('');
    setDescription('');
    setDueDate(new Date());
    setPriority('Low');
    navigation.navigate('TaskList');
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dueDate;
    setShowDatePicker(false);
    setDueDate(currentDate);
  };

  const styles = getStyles(theme); // Get styles based on the theme

  return (
    <View style={styles.background}>
      <ToggleTheme />
      <View style={styles.container}>
        <TextInput
          placeholder="Title*"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          placeholder="Description*"
          value={description}
          onChangeText={setDescription}
          style={[styles.input, styles.descriptionInput]}
          multiline={true}
          numberOfLines={6}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.dateText}>Due Date: {dueDate.toLocaleDateString()}</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.button1}>
            <Text style={styles.buttonText}>Select Due Date</Text>
          </TouchableOpacity>
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={dueDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        <Text style={styles.label}>Priority:</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={priority} onValueChange={(itemValue) => setPriority(itemValue)}>
            <Picker.Item label="Low" value="Low" />
            <Picker.Item label="Normal" value="Normal" />
            <Picker.Item label="High" value="High" />
          </Picker>
        </View>
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Add Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getStyles = (theme) => {
  return StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#121212' : '#ffffff',
    },
    container: {
      margin: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginBottom: 10,
      backgroundColor:'rgba(255, 255, 255, 0.8)', 
      color:'#000', 
      borderRadius: 20,
    },
    descriptionInput: {
      textAlignVertical: 'top',
    },
    dateText: {
      marginBottom: 10,
      fontSize: 16,
      color: theme === 'dark' ? '#fff' : 'black',
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
      color: theme === 'dark' ? '#fff' : 'black',
    },
    pickerContainer: {
      borderWidth: 1,
      borderColor: '#ccc',
      marginBottom: 10,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 20,
    },
    button: {
      backgroundColor: theme === 'dark' ? '#fff' : 'black', 
      padding: 15,
      alignItems: 'center',
      borderRadius: 15,
      marginVertical: 15,
    },
    buttonText: {
      color: theme === 'dark' ? 'black' : '#fff', 
      fontSize: 16,
      fontWeight: 'bold',
    },
    button1: {
      backgroundColor: theme === 'dark' ? '#fff' : 'black',
      padding: 15,
      marginVertical: 15,
      borderRadius: 15,
      alignSelf: 'flex-start',
    },
  });
};

export default CreateTask;
