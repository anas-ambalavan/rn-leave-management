import { StyleSheet, Text, View } from "react-native";
import React from "react";
import * as Colors from "src/constants/Colors";

const LeaveCard = () => {
  const dateText = "Wed, 16, Dec";

  return (
    <View style={styles.card}>
      <View style={styles.detailsContainer}>
        <Text style={styles.date}>{dateText}</Text>
        <Text style={styles.reason}>Reason</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.status}>Approved</Text>
      </View>
    </View>
  );
};

export default LeaveCard;

const styles = StyleSheet.create({
  card: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginTop: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { height: 2, width: 0 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  date: {
    fontFamily: "roboto-bold",
  },
  reason: {
    fontFamily: "roboto-light",
  },
  detailsContainer: {
    paddingVertical: 5,
  },
  right: {
    padding: 5,
    borderRadius: 5,
    borderColor: "#eee",
    backgroundColor: Colors.secondary,
  },
  status: {
    color: Colors.primary,
  },
});
