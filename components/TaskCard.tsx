import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { Card, Chip, Paragraph, Title, useTheme } from "react-native-paper";
import CustomButton from "./CustomButton";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { getTasks, updateTask } from "../store/slices/taskSlice";
import { TaskObj } from "../types/taskTypes";
import { useRouter } from "expo-router";

interface CardProps {
  item: TaskObj;
}
const TaskCard = ({ item }: CardProps) => {
  const theme = useTheme();
  const router = useRouter();
  const [markedComplete, setMarkedComplete] = useState(false);
  const [updating, setUpdating] = useState(false);
  const { loading } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch<AppDispatch>();
  const { _id, title, description, isCompleted } = item;
  const onPress = () => router.push(`/(stack)/taskDetails/${item._id}`);

  const handleMarkTaskAsComplete = async () => {
    setUpdating(true);
    await dispatch(
      updateTask({
        taskId: _id,
        taskData: {
          isCompleted: true,
        },
      })
    );
    setUpdating(false);
    setMarkedComplete(true);
    await dispatch(getTasks());
  };

  return (
    <Card
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          shadowColor: theme.colors.shadow,
        },
      ]}
    >
      <Card.Content style={{ paddingTop: 6 }}>
        <Title style={styles.title}>{title}</Title>
        <Paragraph style={styles.desc}>{description}</Paragraph>
      </Card.Content>
      <Card.Actions>
        {isCompleted || markedComplete ? (
          <Chip onPress={() => console.log("Pressed")}>Completed</Chip>
        ) : (
          <CustomButton
            label={"Mark As Complete"}
            onPress={handleMarkTaskAsComplete}
            mode="text"
            loading={updating}
          />
        )}
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  desc: {
    marginVertical: 0,
  },
  title: {
    marginVertical: 0,
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default TaskCard;
