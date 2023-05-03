import { Alert } from "react-native";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

import { apiKey } from "src/env.config";
import { LeaveProps, LeaveState } from "src/interfaces/leaves";

const getToken = async () => {
  const userData = await SecureStore.getItemAsync("userData");
  if (userData) return JSON.parse(userData).access_token;
  return null;
};

export const fetchLeavesAsync = createAsyncThunk(
  "leaves/fetchLeaves",
  async (data, thunkAPI) => {
    try {
      const token = await getToken();
      const response = await axios.get(
        "https://zsrzpuksbzimwhxqlddb.supabase.co/rest/v1/leaves?select=*",
        {
          headers: {
            apikey: apiKey,
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //   console.log("response.data", response.data);
      return response.data;
    } catch (error: any) {
      let message = (error as Error).message;
      if (error.response) {
        console.log(error.response.data.error_description);
        message = error.response.data.error_description;
      }
      console.log("Error", error);
      console.log((error as Error).message);
      Alert.alert(message);
      throw new Error(message);
    }
  }
);

export const applyLeaveAsync = createAsyncThunk(
  "leaves/applyLeave",
  async (data: LeaveProps, thunkAPI) => {
    try {
      const token = await getToken();
      const response = await axios.post(
        "https://zsrzpuksbzimwhxqlddb.supabase.co/rest/v1/leaves",
        data,
        {
          headers: {
            apikey: apiKey,
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Prefer: "return=representation",
          },
        }
      );
      // console.log("response.data", response.data);
      return response.data;
    } catch (error: any) {
      let message = (error as Error).message;
      if (error.response) {
        console.log(error.response.data.error_description);
        message = error.response.data.error_description;
      }
      console.log("Error", error);
      console.log((error as Error).message);
      Alert.alert(message);
      throw new Error(message);
    }
  }
);

export const editLeaveAsync = createAsyncThunk(
  "leaves/editLeave",
  //need to edit props
  async (data: LeaveProps, thunkAPI) => {
    try {
      const token = await getToken();
      const response = await axios.patch(
        //need to update
        "https://dkgicggupnrxldwvkeft.supabase.co/rest/v1/leaves?id=eq.12",
        data,
        {
          headers: {
            apikey: apiKey,
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("response.data", response.data);
      return response.data;
    } catch (error: any) {
      let message = (error as Error).message;
      if (error.response) {
        console.log(error.response.data.error_description);
        message = error.response.data.error_description;
      }
      console.log("Error", error);
      console.log((error as Error).message);
      Alert.alert(message);
      throw new Error(message);
    }
  }
);

const initialState: { leaveState: LeaveState } = {
  leaveState: {
    items: [],
    loading: false,
    error: null,
  },
};

const leaveSlice = createSlice({
  name: "leave",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeavesAsync.pending, (state) => {
        state.leaveState.loading = true;
        state.leaveState.error = null;
      })
      .addCase(fetchLeavesAsync.fulfilled, (state, action) => {
        state.leaveState.items = action.payload;
        state.leaveState.loading = false;
        state.leaveState.error = null;
      })
      .addCase(fetchLeavesAsync.rejected, (state, action: any) => {
        state.leaveState.items = [];
        state.leaveState.loading = false;
        state.leaveState.error = action.payload;
      })
      .addCase(applyLeaveAsync.pending, (state) => {
        state.leaveState.loading = true;
        state.leaveState.error = null;
      })
      .addCase(applyLeaveAsync.fulfilled, (state, { payload }) => {
        state.leaveState.items = [...state.leaveState.items, ...payload];
        state.leaveState.loading = false;
        state.leaveState.error = null;
      })
      .addCase(applyLeaveAsync.rejected, (state, action: any) => {
        state.leaveState.items = [];
        state.leaveState.loading = false;
        state.leaveState.error = action.payload;
      });
  },
});

export default leaveSlice.reducer;
