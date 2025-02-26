import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "../../utils/axiosClient";
import { AuthState, User } from "../../types/userTypes";
import { saveUser, saveUserToken } from "../../helpers/secureStorage";
import { ToastAndroid } from "react-native";

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  message: null,
};

export const signup = createAsyncThunk<
  { token: string; user: User; message: string },
  { name: string; email: string; password: string; rePassword: string },
  { rejectValue: { message: string } }
>("auth/signup", async ({ name, email, password, rePassword }, thunkAPI) => {
  console.log("INSIDE  SIGNUP");
  try {
    const response = await axiosClient.post("/auth/signup", {
      name,
      email,
      password,
      rePassword,
    });
    console.log("RETUN FROM SIGNUP", response?.data);
    const { token, user } = response?.data;
    console.log("what user...", user);
    await saveUser(user);
    await saveUserToken(token);

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data || { message: "Signup failed" }
    );
  }
});

export const signin = createAsyncThunk<
  { token: string; user: User; message: string },
  { email: string; password: string },
  { rejectValue: { message: string } }
>("auth/login", async ({ email, password }, thunkAPI) => {
  try {
    console.log(email, password);

    const response = await axiosClient.post("/auth/login", { email, password });
    console.log("signin response", response?.data);
    const { token, user } = response?.data;
    await saveUser(user);
    await saveUserToken(token);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data || { message: "Signin failed" }
    );
  }
});

export const resetPassword = createAsyncThunk<
  { message: string },
  { currentPassword: string; newPassword: string; reNewPassword: string },
  { rejectValue: { message: string } }
>(
  "auth/reset-password",
  async ({ currentPassword, newPassword, reNewPassword }, thunkAPI) => {
    try {
      const response = await axiosClient.post("/auth/reset-password", {
        currentPassword,
        newPassword,
        reNewPassword,
      });
      console.log("password response", response?.data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Signin failed" }
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.message = null;
    },
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        console.log("PENIGNGGGG");
        state.loading = true;
        state.error = null;
      })
      .addCase(
        signup.fulfilled,
        (
          state,
          action: PayloadAction<{ token: string; user: User; message: string }>
        ) => {
          console.log("FULFILLED");
          state.loading = false;
          state.token = action.payload.token;
          state.user = action.payload.user;
          state.message = action.payload.message;
        }
      )
      .addCase(signup.rejected, (state, action) => {
        console.log("rejected...");
        state.loading = false;
        state.error =
          action.payload?.message || "An error occurred during signup.";
        ToastAndroid.show(
          action.payload?.message || "An error occurred during signup.",
          ToastAndroid.SHORT
        );
      })

      .addCase(signin.pending, (state) => {
        console.log("signin penindin");

        state.loading = true;
        state.error = null;
      })
      .addCase(
        signin.fulfilled,
        (
          state,
          action: PayloadAction<{ token: string; user: User; message: string }>
        ) => {
          console.log("signin fullfilled");
          state.loading = false;
          state.token = action.payload.token;
          state.user = action.payload.user;
          state.message = action.payload.message;
        }
      )
      .addCase(signin.rejected, (state, action) => {
        console.log("signin rehected", action.payload?.message);
        state.loading = false;
        state.error =
          action.payload?.message || "An error occurred during signin.";
        ToastAndroid.show(
          action.payload?.message || "An error occurred during signin.",
          ToastAndroid.SHORT
        );
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        resetPassword.fulfilled,
        (state, action: PayloadAction<{ message: string }>) => {
          console.log("reset fullfilled");
          state.loading = false;
          state.message = action.payload.message;
        }
      )
      .addCase(resetPassword.rejected, (state, action) => {
        console.log("reset rehected", action.payload?.message);
        state.loading = false;
        state.error =
          action.payload?.message || "An error occurred during reset password.";
        ToastAndroid.show(
          action.payload?.message || "An error occurred during reset password.",
          ToastAndroid.SHORT
        );
      });
  },
});

export const { clearError, logout, setCredentials } = authSlice.actions;

export default authSlice.reducer;
