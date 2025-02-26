import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import React, { FC, useEffect, useState } from "react";
import {
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from "../../../store/slices/taskSlice";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch } from "react-redux";
import { ActivityIndicator, Text, TextInput, Title } from "react-native-paper";
import moment from "moment";
import CustomButton from "../../../components/CustomButton";
import { TaskDetailsProps } from "../../../types/taskTypes";
import ModalContainer from "../../../components/ModalContainer";
import ConfirmDeleteModal from "../../../components/ConfirmDeleteModal";
import { useLocalSearchParams, useRouter } from "expo-router";

const TaskDetails = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useLocalSearchParams();
  const taskId = Array.isArray(id) ? id[0] : id;
  const [open, setOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { task, loading } = useSelector((state: RootState) => state.tasks);

  const [currentTask, setCurrentTask] = useState({
    title: "",
    description: "",
    createdAt: "",
    updatedAt: "",
  });
  const isTaskModified =
    task &&
    (currentTask.title.trim() !== task.title ||
      currentTask.description.trim() !== task.description);

  useEffect(() => {
    if (task) {
      const { title, description, createdAt, updatedAt } = task;
      setCurrentTask({
        title,
        description,
        createdAt,
        updatedAt,
      });
    }
  }, [task]);

  useEffect(() => {
    dispatch(getTaskById(taskId));
  }, [dispatch, id]);

  const handleUpdateTask = async () => {
    if (isTaskModified) {
      setUpdating(true);
      await dispatch(
        updateTask({
          taskId: taskId,
          taskData: {
            title: currentTask.title,
            description: currentTask.description,
          },
        })
      );
      await dispatch(getTasks());
      setUpdating(false);
      router.back();
    }
  };

  const handleDeleteTask = async () => {
    setDeleting(true);
    await dispatch(deleteTask(taskId));
    await dispatch(getTasks());
    setDeleting(false);
    setOpen(false);
    router.back();
  };

  return (
    <>
      {loading && !updating && !deleting ? (
        <View style={styles.loadingConainer}>
          <ActivityIndicator size={"small"} />
        </View>
      ) : (
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={10}
        >
          <Title style={styles.title}>Edit Task</Title>
          <TextInput
            label="Title"
            value={currentTask.title}
            mode="outlined"
            onChangeText={(text) =>
              setCurrentTask({ ...currentTask, title: text })
            }
          />
          <TextInput
            label="Description"
            value={currentTask.description}
            mode="outlined"
            onChangeText={(text) =>
              setCurrentTask({ ...currentTask, description: text })
            }
            multiline
          />
          <Text>
            Task Added:{" "}
            {moment(currentTask.createdAt).format("DD MMM YY hh:mm a")}
          </Text>
          <Text>
            Last Updated:{" "}
            {moment(currentTask.updatedAt).format("DD MMM YY hh:mm a")}
          </Text>
          <View style={styles.btnWrap}>
            <View style={{ flex: 0.3 }}>
              <CustomButton
                onPress={() => setOpen(true)}
                label="Delete"
                loading={deleting}
                mode="outlined"
              />
            </View>
            <View style={{ flex: 0.7 }}>
              <CustomButton
                label="Update Task"
                onPress={handleUpdateTask}
                loading={updating}
                disabled={!isTaskModified}
              />
            </View>
          </View>
          <ModalContainer open={open} handleClose={() => setOpen(false)}>
            <ConfirmDeleteModal
              onPressNo={() => setOpen(false)}
              onPressYes={handleDeleteTask}
              loading={deleting}
            />
          </ModalContainer>
        </KeyboardAvoidingView>
      )}
    </>
  );
};

export default TaskDetails;

const styles = StyleSheet.create({
  loadingConainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    justifyContent: "flex-end",
    flex: 1,
    margin: 20,
    gap: 12,
  },
  btnWrap: {
    flexDirection: "row",
    gap: 10,
  },
  title: {
    fontWeight: "bold",
    alignSelf: "center",
  },
});
