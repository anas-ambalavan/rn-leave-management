import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LeaveCard from "src/components/UI/LeaveCard";

const HomeScreen = () => {
  return (
    <View style={{ alignItems: "center" }}>
      {/* <Text>HomeScreen</Text> */}
      <LeaveCard />
      <LeaveCard />
      <LeaveCard />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
