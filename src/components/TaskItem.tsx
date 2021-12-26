import React, { Fragment, useEffect } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Icon from "react-native-vector-icons/Feather";
import trashIcon from "../assets/icons/trash/trash.png";
import editIcon from "../assets/icons/edit/edit.png";
import { Task } from "./TasksList";

type EditTaskArgs = {
  taskId: number;
  title: string;
};

interface TasksItemProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({ taskId, title }: EditTaskArgs) => void;
}

const TaskItem = ({
  toggleTaskDone,
  removeTask,
  task,
  editTask,
}: TasksItemProps) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [taskTitleValue, setTaskTitleValue] = React.useState(task.title);
  const textinputRef = React.useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setIsEditing(false);
    setTaskTitleValue(task.title);
  }

  function handleSubmitEditing() {
    setIsEditing(false);
    if (taskTitleValue.trim().length <= 0 || taskTitleValue !== task.title) {
      editTask({ taskId: task.id, title: taskTitleValue });
    } else {
      Alert.alert("Error", "Please enter a valid title");
    }
  }
  useEffect(() => {
    if (textinputRef.current) {
      if (isEditing) {
        textinputRef.current.focus();
      } else {
        textinputRef.current.blur();
      }
    }
  }, [isEditing]);

  return (
    <Fragment>
      <View style={styles.infoContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}>
          <View style={task.done ? styles.taskMarkerDone : styles.taskMarker}>
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            value={taskTitleValue}
            onChangeText={(text) => setTaskTitleValue(text)}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={task.done ? styles.taskTextDone : styles.taskText}
            ref={textinputRef}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        {isEditing ? (
          <TouchableOpacity onPress={handleCancelEditing}>
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStartEditing}>
            <Image source={editIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.iconsDivider} />

        <TouchableOpacity
          onPress={() => removeTask(task.id)}
          disabled={isEditing}>
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  constainer: {},
  infoContainer: { flex: 1 },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 12,
    paddingRight: 24,
  },
  iconsDivider: {
    width: 1,
    height: 24,
    backgroundColor: "#C4C4C4",
    marginHorizontal: 12,
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
});

export default TaskItem;
