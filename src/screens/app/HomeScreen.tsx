import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Card from "src/components/core/Card";

const HomeScreen = () => {
  return (
    <View style={{ alignItems: "center" }}>
      {/* <Text>HomeScreen</Text> */}
      <Card />
      <Card />
      <Card />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
