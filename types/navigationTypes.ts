import { StackNavigationProp } from "@react-navigation/stack";
import { TaskObj } from "./taskTypes";

export type RootStackParamList = {
  SplashScreen: undefined;
  Signup: undefined;
  Login: undefined;
  Home: undefined;
  AddTask: undefined;
  TaskDetails: { item: TaskObj };
  Profile: undefined;
};

export type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  | "SplashScreen"
  | "Signup"
  | "Login"
  | "Home"
  | "AddTask"
  | "TaskDetails"
  | "Profile"
>;
