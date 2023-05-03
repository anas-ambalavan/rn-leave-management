import { Alert } from "react-native";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "src/axios/";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { apiKey } from "src/env.config";

export const login = createAsyncThunk(
  "login",
  async (data: LoginData, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://zsrzpuksbzimwhxqlddb.supabase.co/auth/v1/token?grant_type=password",
        // "https://zsrzpuksbzimwhxqlddb.supabase.co/token?grant_type=password",
        data,
        {
          headers: {
            apikey: apiKey,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("response.data", response.data);
      // response.data.expires_in
      const expirationDate = new Date(
        +new Date().getTime() + response.data.expires_in * 1000
      );
      saveToEncryptedStorage(
        response.data.access_token,
        response.data.refresh_token,
        response.data.user.id,
        expirationDate
      );
      return response.data;
    } catch (error: any) {
      let message = (error as Error).message;
      if (error.response) {
        // console.log(error.response.data.error_description);
        message = error.response.data.error_description;
      }
      // console.log("Error", error);
      // console.log((error as Error).message);
      Alert.alert(message);
      throw new Error(message);
    }
  }
);

export const signup = createAsyncThunk(
  "signup",
  async (data: LoginData, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://zsrzpuksbzimwhxqlddb.supabase.co/auth/v1/signup",
        data,
        {
          headers: {
            apikey: apiKey,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("response.data", response.data);
      return response.data;
    } catch (error: any) {
      let message = (error as Error).message;
      if (error.response) {
        // console.log(error.response.data.error_description);
        message = error.response.data.error_description;
      }
      // console.log("Error", error);
      // console.log((error as Error).message);
      Alert.alert(message);
      throw new Error(message);
    }
  }
);

const initialState = {
  access_token: null,
  refresh_token: null,
  userId: null,
  didTryAutoLogin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    authenticate: (state, { payload }) => {
      state.access_token = payload.access_token;
      state.refresh_token = payload.refresh_token;
      state.userId = payload.userId;
      state.didTryAutoLogin = true;
    },
    setDidTryAutoLogin: (state, { payload }) => {
      state.didTryAutoLogin = true;
    },
    logout: (state, { payload }) => {
      return { ...initialState, didTryAutoLogin: true };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, { payload }) => {
        state.access_token = payload.access_token;
        state.refresh_token = payload.refresh_token;
        state.userId = payload.user.id;
        state.didTryAutoLogin = true;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.didTryAutoLogin = true;
        console.log("rejected", payload);
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        state.didTryAutoLogin = true;
        Alert.alert("Register Successfull, Please confirm your email address!");
        console.log("success", payload);
      })
      .addCase(signup.rejected, (state, { payload }) => {
        state.didTryAutoLogin = true;
        Alert.alert("Register Failed");
        console.log("rejected", payload);
      });
  },
});

export const { setDidTryAutoLogin, authenticate, logout } = authSlice.actions;

export default authSlice.reducer;

let timer: any;

export const setLogoutTimer = (expirationTime: any, dispatch: any) => {
  timer = setTimeout(() => {
    dispatch(logout({}));
  }, expirationTime);
};

export const onLogout = (dispatch: any) => {
  clearLogoutTimer();
  SecureStore.deleteItemAsync("userData");
  dispatch(logout({}));
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

export const saveToEncryptedStorage = (
  access_token: any,
  refresh_token: any,
  userId: any,
  expiryDate: any
) => {
  SecureStore.setItemAsync(
    "userData",
    JSON.stringify({
      access_token: access_token,
      refresh_token: refresh_token,
      userId: userId,
      expiryDate: expiryDate.toISOString(),
    })
  );
};
