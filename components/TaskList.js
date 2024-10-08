import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  FlatList, 
  ImageBackground, 
  Modal, 
  TextInput 
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTasks } from '../hooks/useTasks';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ToggleTheme from './ToggleTheme';
import { useTheme } from '../hooks/useTheme';
const TaskList = () => {
  const { theme } = useTheme(); 
  const { tasks, deleteTask, updateTask } = useTasks();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedDueDate, setEditedDueDate] = useState(new Date());
  const [editedPriority, setEditedPriority] = useState('Normal');
  const [showDatePicker, setShowDatePicker] = useState(false);  

 
  const sortedTasks = useMemo(() => {
    const priorityOrder = { High: 1, Normal: 2, Low: 3 };

    return tasks.slice().sort((a, b) => {
   
      const isCompletedA = a.completed === true;
      const isCompletedB = b.completed === true;

      
      if (isCompletedA !== isCompletedB) {
        return isCompletedA ? 1 : -1;
      }

      
      const priorityA = priorityOrder[a.priority] || 4; 
      const priorityB = priorityOrder[b.priority] || 4;

      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }

     
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return dateA - dateB;
    });
  }, [tasks]);

 
  const formatDate = (dueDate) => {
    const date = new Date(dueDate);
    return date.toLocaleDateString('en-GB', {
      timeZone: 'Asia/Kolkata',
    });
  };

  // Open the modal to edit the task
  const openEditModal = (task) => {
    setEditingTask(task);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
    setEditedDueDate(new Date(task.dueDate));
    setEditedPriority(task.priority);
    setModalVisible(true);
  };

  // Handle saving the updated task
  const handleSave = () => {
    if (editingTask) {
      updateTask(editingTask.id, {
        title: editedTitle,
        description: editedDescription,
        dueDate: editedDueDate.toISOString(),
        priority: editedPriority,
        // Keep the existing completed status
        completed: editingTask.completed === true,
      });
      setModalVisible(false);
    }
  };

  // Handle toggling the completion status
  const toggleCompletion = (task) => {
    updateTask(task.id, {
      ...task,
      completed: !(task.completed === true),
    });
  };

  // DatePicker onChange event
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || editedDueDate;
    setShowDatePicker(false);
    setEditedDueDate(currentDate);
  };

  const styles = getStyles(theme); 

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      {/* Task Header: Checkbox and Task Details */}
      <View style={styles.taskHeader}>
        {/* Completion Toggle */}
        <TouchableOpacity onPress={() => toggleCompletion(item)} style={styles.checkbox}>
          {item.completed ? (
            <Icon name="check-box" size={24} color="#4CAF50" />
          ) : (
            <Icon name="check-box-outline-blank" size={24} color="#ccc" />
          )}
        </TouchableOpacity>

        <View style={styles.taskDetails}>
          <Text 
            style={[
              styles.title, 
              item.completed && styles.completedTitle
            ]}
          >
            {item.title}
          </Text>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.metaData}>
            <Text style={styles.metaText}>Due: {formatDate(item.dueDate)}</Text>
            <Text style={styles.metaText}>Priority: {item.priority}</Text>
          </View>
        </View>
      </View>

      {/* Edit and Delete buttons in a row */}
      <View style={styles.buttonRowContainer}>
        <TouchableOpacity onPress={() => openEditModal(item)} style={styles.editButton}>
          <Text style={styles.editButtonText}>Update</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  console.log(sortedTasks); // For debugging purposes

  return (
    <View style={styles.background1}>
      <ToggleTheme />
      <FlatList 
        data={sortedTasks} 
        renderItem={renderItem} 
        keyExtractor={(item) => item.id} 
        contentContainerStyle={styles.flatListContent}
        // Remove 'key' prop from renderItem and let FlatList handle it
      />

      {editingTask && (
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalView}>
              <TextInput
                style={styles.input}
                value={editedTitle}
                onChangeText={setEditedTitle}
                placeholder="Edit Task Title"
              />
              <TextInput
                style={styles.input1}
                value={editedDescription}
                onChangeText={setEditedDescription}
                multiline={true}  // Enable multiline input
                numberOfLines={6} // Initial number of lines for description
                placeholder="Edit Task Description"
              />

              <View style={styles.datePickerContainer}>
                <Text style={styles.dateText}>Due Date: {formatDate(editedDueDate)}</Text>
                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.button1}>
                  <Text style={styles.buttonText}>Select Date</Text>
                </TouchableOpacity>
              </View>

              {showDatePicker && (
                <DateTimePicker
                  value={editedDueDate}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                />
              )}

              {/* Priority Picker */}
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={editedPriority}
                  onValueChange={(itemValue) => setEditedPriority(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="High" value="High" />
                  <Picker.Item label="Normal" value="Normal" />
                  <Picker.Item label="Low" value="Low" />
                </Picker>
              </View>

              <View style={styles.buttonRow}>
                <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const getStyles = (theme) => { return  StyleSheet.create({
  taskContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    marginRight: 10,
    marginTop: 5, 
  },
  taskDetails: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 3,
    flexWrap: 'wrap',
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    flexWrap: 'wrap',
  },
  metaData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  metaText: {
    fontSize: 12,
    color: '#777',
  },
  buttonRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: 'center',
    borderRadius: 5,
    flex: 0.48, 
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: 'center',
    borderRadius: 5,
    flex: 0.48,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  background1: {
    flex: 1,
    resizeMode: 'cover',
    paddingTop: 20,
    backgroundColor: theme === 'dark' ? '#121212' : '#ffffff',
  },
  flatListContent: {
    paddingBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius:5,
    fontSize: 14,
  },
  input1: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius:5,
    textAlignVertical: 'top',
    paddingTop:5,
    fontSize: 14,
  },
  datePickerContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
    color: 'black',
  },
  pickerContainer: {
    marginBottom: 10,
    borderWidth:1,
    borderRadius:5,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: 50,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 0.48,
  },
  cancelButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 0.48,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
  button1: {
    backgroundColor: 'black',
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
});
};

export default TaskList;
