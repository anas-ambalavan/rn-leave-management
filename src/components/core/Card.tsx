import { StyleSheet, Text, View } from "react-native";
import React from "react";
import * as Colors from "src/constants/Colors";

const Card = () => {
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

export default Card;

const styles = StyleSheet.create({
  card: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginTop: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
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
