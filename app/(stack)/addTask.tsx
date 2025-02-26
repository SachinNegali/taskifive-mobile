import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { TextInput, Title } from "react-native-paper";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { createTask, getTasks } from "../../store/slices/taskSlice";
import CustomButton from "../../components/CustomButton";
import { useRouter } from "expo-router";

const AddTask = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [addingTask, setAddingTask] = useState(false);
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const handleAddTask = async () => {
    setAddingTask(true);
    await dispatch(createTask(task));
    await dispatch(getTasks());
    setAddingTask(false);
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={10}
    >
      <Title style={styles.title}>Add Task</Title>
      <TextInput
        label="Title"
        value={task.title}
        mode="outlined"
        onChangeText={(text) => setTask({ ...task, title: text })}
      />
      <TextInput
        label="Description"
        value={task.description}
        mode="outlined"
        onChangeText={(text) => setTask({ ...task, description: text })}
      />
      <CustomButton
        label="Add Task"
        onPress={handleAddTask}
        // loading={loading}
        loading={addingTask}
      />
    </KeyboardAvoidingView>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    flex: 1,
    margin: 20,
    gap: 12,
  },
  title: { alignSelf: "center", fontWeight: "bold" },
});
