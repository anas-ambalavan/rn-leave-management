import React, { useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import * as SecureStore from "expo-secure-store";
// import moment from "moment";

import * as Colors from "src/constants/Colors";
import { useAppDispatch } from "src/store";
import {
  authenticate,
  setDidTryAutoLogin,
  setLogoutTimer,
} from "src/store/authSlice";

const StartupScreen = (props: any) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await SecureStore.getItemAsync("userData");
      if (!userData) {
        dispatch(setDidTryAutoLogin({}));
        return;
      }

      const transformedData = JSON.parse(userData);
      const { access_token, refresh_token, userId, expiryDate } =
        transformedData;
      const expirationDate = new Date(expiryDate);
      // console.log(
      //   "transformedData",
      //   transformedData,
      //   moment(expirationDate).format("YYYY-MM-DD , h:mm:ss a")
      // );

      if (expirationDate <= new Date() || !access_token || !userId) {
        dispatch(setDidTryAutoLogin({}));
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      dispatch(authenticate({ access_token, refresh_token, userId }));
      setLogoutTimer(expirationTime, dispatch);
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

export default StartupScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
