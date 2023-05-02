import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { LeavesNavigator, AuthNavigator } from "./LeavesNavigator";
import StartupScreen from "src/screens/StartupScreen";
import { RootState } from "src/store";

const AppNavigator = (props: any) => {
  const isAuth = useSelector(
    (state: RootState) => !!state.authState.access_token
  );
  const didTryAutoLogin = useSelector(
    (state: RootState) => state.authState.didTryAutoLogin
  );

  return (
    <NavigationContainer>
      {/* <LeavesNavigator /> */}
      {/* <AuthNavigator /> */}
      {isAuth && <LeavesNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
