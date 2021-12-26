import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const isTaskAlreadyAdded = tasks.find(
      (task) => task.title === newTaskTitle
    );

    if (isTaskAlreadyAdded) {
      return Alert.alert("Ops!", "Tarefa já existe!");
    }

    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks((oldState) => [...oldState, data]);
  }

  function handleToggleTaskDone(id: number) {
    // RESPEITANDO O PRINCIPIO DA IMUTABILIDADE
    const updateTasks = tasks.map((task) => ({ ...task }));
    const foundItem = updateTasks.find((task) => task.id === id);

    if (!foundItem) {
      return;
    }

    foundItem.done = !foundItem.done;
    setTasks(updateTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert("Remover", "Deseja remover a tarefa?", [
      { style: "cancel", text: "Não" },
      {
        text: "Sim",
        onPress: () => {
          const updateTasks = tasks.filter((task) => task.id !== id);
          setTasks(updateTasks);
        },
      },
    ]);
  }

  function handleEditTask(id: number, title: string) {
    const updateTasks = tasks.map((task) => ({ ...task }));
    const taskToBeEdited = updateTasks.find((task) => task.id === id);

    if (!taskToBeEdited) {
      return;
    }

    taskToBeEdited.title = title;
    setTasks(updateTasks);
  }
  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
