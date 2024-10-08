
# Tasko - Task Manager App (React Native)

## Project Overview

The **Tasko** is a mobile application designed to help users manage their tasks efficiently. Users can create, update, delete, and mark tasks as complete, as well as categorize tasks by priority and due date. The application features a user-friendly interface and allows seamless navigation, providing an efficient way to organize daily tasks and enhance productivity.

## Features

- Create and manage tasks with titles, descriptions, due dates, and priority levels (High, Normal, Low).
- Mark tasks as complete or incomplete.
- Edit existing tasks.
- Delete tasks.
- Intuitive UI for managing tasks.
- Toggle between light and dark themes for enhanced user experience.

## Key Design Decisions

1. **State Management**: The application uses React's built-in state management, utilizing hooks such as `useState` and `useMemo` for managing task data and ensuring performance optimization when sorting tasks.

2. **Date Handling**: The app uses the `DateTimePicker` library for selecting due dates, allowing users to easily set and visualize deadlines.

3. **Responsive Design**: The app is designed to be responsive, ensuring usability across various mobile devices. Styles are adapted to light and dark themes to improve accessibility.

4. **Modular Components**: The app is structured using modular components, promoting reusability and maintainability of the code.

5. **Performance Optimization**: The use of `useMemo` for sorting tasks ensures that the sorting operation is efficient, especially when the task list grows.


## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Udai637643/Tasko
   cd task-manager-app

2. **Install Dependencies**:
   ```bash
   npm install

3. **Run the Application**:
    ```bash
   npm start
## Authors

- [@Udai Lal Regar](https://github.com/Udai637643)


## Screenshots

**Splash Screen**
![App Screenshot](./assets/tasksplash.jpg)

**Create Task Screen In Both Dark And Light Mode**
![App Screenshot](./assets/CreateDark.jpg)

![App Screenshot](./assets/CreateLight.jpg)

**Task List Screen In Both Dark And Light Mode**
![App Screenshot](./assets/TaskListdark.jpg)

![App Screenshot](./assets/tasklistlight.jpg)

**Update Task Modal**

![App Screenshot](./assets/update.jpg)

