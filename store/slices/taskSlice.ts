import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Task, TaskObj, Tasks, TaskState } from "../../types/taskTypes";
import axiosClient from "../../utils/axiosClient";
import { ToastAndroid } from "react-native";

const initialState: TaskState = {
  tasks: [],
  task: null,
  loading: false,
  error: null,
  updateLoader: false,
};

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (
    taskData: { title: string; description: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.post("/tasks", taskData);
      console.log("taskData added.....", response?.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTasks = createAsyncThunk(
  "tasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/tasks");
      console.log("RESPONSE TASKS", response?.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTaskById = createAsyncThunk(
  "tasks/getTaskById",
  async (taskId: string, { rejectWithValue }) => {
    try {
      console.log("IN THYUNK", taskId);
      const response = await axiosClient.get(`/tasks/${taskId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (
    { taskId, taskData }: { taskId: string; taskData: Partial<TaskObj> },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.put(`/tasks/${taskId}`, taskData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId: string, { rejectWithValue }) => {
    try {
      await axiosClient.delete(`/tasks/${taskId}`);
      return taskId;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    clearTasks: (state) => {
      state.loading = false;
      state.tasks = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createTask.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      createTask.fulfilled,
      (state, action: PayloadAction<Task>) => {
        state.loading = false;
      }
    );
    builder.addCase(
      createTask.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
        ToastAndroid.show(
          action.payload?.message || "Error adding task.",
          ToastAndroid.SHORT
        );
      }
    );

    builder.addCase(getTasks.pending, (state) => {
      console.log("apple......");
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      getTasks.fulfilled,
      (state, action: PayloadAction<Tasks>) => {
        console.log("apple......2");
        state.loading = false;
        state.tasks = action.payload.tasks;
      }
    );
    builder.addCase(getTasks.rejected, (state, action: PayloadAction<any>) => {
      console.log("apple......3");
      state.loading = false;
      state.error = action.payload.message;
      ToastAndroid.show(
        action.payload?.message || "Error fetching tasks.",
        ToastAndroid.SHORT
      );
    });

    builder.addCase(getTaskById.pending, (state) => {
      console.log("kjfnkjdnfkjnpppppppppppppppp");
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      getTaskById.fulfilled,
      (state, action: PayloadAction<Task>) => {
        console.log(
          "IN jkljdfnkjfd vfkdjvkfd vkjfd vk dkv kdf vk dfk ",
          action.payload
        );
        state.loading = false;
        state.task = action.payload?.task;
      }
    );
    builder.addCase(
      getTaskById.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
        ToastAndroid.show(
          action.payload?.message || "Error fetching task.",
          ToastAndroid.SHORT
        );
      }
    );

    builder.addCase(updateTask.pending, (state) => {
      state.updateLoader = true;
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      updateTask.fulfilled,
      (state, action: PayloadAction<Task>) => {
        state.updateLoader = false;
        state.loading = false;
      }
    );
    builder.addCase(
      updateTask.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.updateLoader = false;
        state.error = action.payload.message;
        ToastAndroid.show(
          action.payload?.message || "Error updating task.",
          ToastAndroid.SHORT
        );
      }
    );

    builder.addCase(deleteTask.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      deleteTask.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      }
    );
    builder.addCase(
      deleteTask.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
        ToastAndroid.show(
          action.payload?.message || "Error deleting task.",
          ToastAndroid.SHORT
        );
      }
    );
  },
});
export const { clearTasks } = taskSlice.actions;

export default taskSlice.reducer;
