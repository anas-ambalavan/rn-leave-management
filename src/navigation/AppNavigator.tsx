import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HomeScreen from "src/screens/app/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CalenderScreen from "src/screens/app/CalenderScreen";
import LeaveScreen from "src/screens/app/LeaveScreen";
import { HOMESCREEN, CALENDERSCREEN, LEAVESCREEN } from "./Constants";
import * as Colors from "src/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { height } from "src/constants/Sizes";
import { IconName } from "src/interfaces/common";
import { NavigationContainer } from "@react-navigation/native";

const BottomTabNavigator = createBottomTabNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <BottomTabNavigator.Navigator
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          tabBarActiveTintColor: Colors.primary,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: IconName = "md-home";
            if (route.name === HOMESCREEN)
              iconName = focused ? "md-home" : "md-home-outline";
            else if (route.name === CALENDERSCREEN)
              iconName = focused ? "md-calendar" : "md-calendar-outline";
            else if (route.name === LEAVESCREEN)
              iconName = focused ? "md-hand-left" : "md-hand-left-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          //   headerShown: false,
          tabBarStyle: {
            height: height / 12,
          },
        })}
      >
        <BottomTabNavigator.Screen
          component={HomeScreen}
          name={HOMESCREEN}
          options={{ title: "Leaves" }}
        />
        <BottomTabNavigator.Screen
          component={CalenderScreen}
          name={CALENDERSCREEN}
          options={{ title: "Calender" }}
        />
        <BottomTabNavigator.Screen
          component={LeaveScreen}
          name={LEAVESCREEN}
          options={{ title: "Apply Leave" }}
        />
      </BottomTabNavigator.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
