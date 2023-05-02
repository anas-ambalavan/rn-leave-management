import React from "react";
import { TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "@expo/vector-icons/Ionicons";

import HomeScreen from "src/screens/app/HomeScreen";
import CalenderScreen from "src/screens/app/CalenderScreen";
import LeaveScreen from "src/screens/app/LeaveScreen";
import {
  HOME_SCREEN,
  CALENDER_SCREEN,
  LEAVE_SCREEN,
  AUTH_SCREEN,
} from "./Constants";
import * as Colors from "src/constants/Colors";
import { height } from "src/constants/Sizes";
import { IconName } from "src/interfaces/common";
import { onLogout } from "src/store/authSlice";
import { useAppDispatch } from "src/store";
import AuthScreen from "src/screens/user/AuthScreen";

const headerOptions = () => {
  const dispatch = useAppDispatch();
  return {
    headerRight: () => {
      return (
        <TouchableOpacity
          onPress={() => {
            onLogout(dispatch);
          }}
        >
          <View style={{ marginRight: 10 }}>
            <Icon name="md-log-out-outline" size={25} color={Colors.primary} />
          </View>
        </TouchableOpacity>
      );
    },
  };
};

const BottomTabNavigator = createBottomTabNavigator();
export const LeavesNavigator = () => {
  return (
    <BottomTabNavigator.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: IconName = "md-home";
          if (route.name === HOME_SCREEN)
            iconName = focused ? "md-home" : "md-home-outline";
          else if (route.name === CALENDER_SCREEN)
            iconName = focused ? "md-calendar" : "md-calendar-outline";
          else if (route.name === LEAVE_SCREEN)
            iconName = focused ? "md-hand-left" : "md-hand-left-outline";
          return <Icon name={iconName} size={size} color={color} />;
        },
        //   headerShown: false,
        tabBarStyle: {
          height: height / 12,
        },
      })}
    >
      <BottomTabNavigator.Screen
        component={HomeScreen}
        name={HOME_SCREEN}
        options={{ title: "List of Leaves", ...headerOptions() }}
      />
      <BottomTabNavigator.Screen
        component={CalenderScreen}
        name={CALENDER_SCREEN}
        options={{ title: "Leave Calender", ...headerOptions() }}
      />
      <BottomTabNavigator.Screen
        component={LeaveScreen}
        name={LEAVE_SCREEN}
        options={{ title: "Apply Leave", ...headerOptions() }}
      />
    </BottomTabNavigator.Navigator>
  );
};

const AuthStackNavigator = createNativeStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator>
      <AuthStackNavigator.Screen
        name={AUTH_SCREEN}
        component={AuthScreen}
        options={{ title: "Authenticate" }}
      />
    </AuthStackNavigator.Navigator>
  );
};
