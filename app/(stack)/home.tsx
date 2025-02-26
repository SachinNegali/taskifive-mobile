import {
  BackHandler,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import TaskCard from "../../components/TaskCard";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getTasks } from "../../store/slices/taskSlice";
import { AppDispatch, RootState } from "../../store/store";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import CustomButton from "../../components/CustomButton";
import { Paragraph, Text, Title, useTheme } from "react-native-paper";
import ModalContainer from "../../components/ModalContainer";
import ExitAppModal from "../../components/ExitAppModal";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { tasks, loading, updateLoader } = useSelector(
    (state: RootState) => state.tasks
  );
  const { user } = useSelector((state: RootState) => state.auth);

  const fetchTasks = () => {
    dispatch(getTasks());
  };

  useEffect(() => {
    fetchTasks();
  }, [dispatch]);

  const handleBackPress = () => {
    setOpen(true);
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", handleBackPress);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
      };
    }, [])
  );

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <Pressable
        style={[
          styles.profile,
          {
            backgroundColor: theme.colors.primary,
            shadowColor: theme.colors.shadow,
          },
        ]}
        onPress={() => router.push("/(stack)/profile")}
      >
        <Paragraph style={styles.initial}>{user?.name[0]}</Paragraph>
      </Pressable>
      <FlatList
        data={tasks}
        renderItem={({ item }) => <TaskCard item={item} />}
        style={styles.list}
        contentContainerStyle={styles.listConatiner}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading && !updateLoader}
            onRefresh={fetchTasks}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyComp}>
            <Title style={styles.emptyTitle}>
              {loading ? "Please Wait..." : "No Tasks to display"}
            </Title>
            <Text
              style={styles.emptyDesc}
              onPress={() => !loading && router.push("/(stack)/addTask")}
            >
              {loading
                ? "Sometimes render ask for a sacrifice to respond"
                : "Add your first task"}
            </Text>
          </View>
        }
      />
      <View style={styles.btnWrap}>
        <CustomButton
          label={"Add Taks"}
          mode="contained"
          onPress={() => router.push("/(stack)/addTask")}
        />
      </View>
      <ModalContainer open={open} handleClose={() => setOpen(false)}>
        <ExitAppModal
          onPressYes={() => {
            setOpen(false);
            BackHandler.exitApp();
          }}
          onPressNo={() => setOpen(false)}
        />
      </ModalContainer>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
    padding: 20,
  },
  btnWrap: {
    flexDirection: "row",
    position: "absolute",
    justifyContent: "flex-end",
    bottom: 0,
    right: 0,
    margin: 20,
  },
  listConatiner: {
    gap: 10,
    paddingBottom: 100,
    paddingTop: 40,
  },
  profile: {
    width: 40,
    height: 40,
    marginTop: 40,
    marginLeft: 16,
    position: "absolute",
    right: 0,
    zIndex: 100,
    margin: 16,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  initial: {
    fontWeight: "bold",
    color: "#fff",
    textTransform: "capitalize",
  },
  emptyComp: {
    flex: 1,
    minHeight: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyTitle: {
    fontWeight: "bold",
  },
  emptyDesc: {
    textAlign: "center",
    color: "#c1c1c1",
  },
});
