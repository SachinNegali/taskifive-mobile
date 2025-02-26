import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "./navigationTypes";

export interface TaskObj {
  _id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  isDeleted: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  message: string;
  task: TaskObj;
}

export interface Tasks {
  message: string;
  tasks: TaskObj[];
}

export interface TaskState {
  tasks: TaskObj[];
  task: TaskObj | null;
  loading: boolean;
  error: string | null;
  updateLoader: boolean;
}

type TaskDetailsRouteProp = RouteProp<RootStackParamList, "TaskDetails">;

export interface TaskDetailsProps {
  route: TaskDetailsRouteProp;
}
