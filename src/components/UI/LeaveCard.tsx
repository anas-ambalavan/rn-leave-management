import { StyleSheet, Text, View } from "react-native";
import React from "react";

import * as Colors from "src/constants/Colors";
import * as Fonts from "src/assets/fonts";
import { width } from "src/constants/Sizes";
import { LeaveCardProps } from "src/interfaces/leaves";

const LeaveCard = ({ start_date, end_date, reason }: LeaveCardProps) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.detailsContainer}>
          <Text style={styles.reason}>{reason}</Text>
          <Text style={styles.date}>{`Start Date: ${start_date}`}</Text>
          <Text style={styles.date}>{`End Date: ${end_date}`}</Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.status}>Approved</Text>
        </View>
      </View>
    </View>
  );
};

export default LeaveCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: width * 0.9,
    paddingHorizontal: 10,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginVertical: 8,
    shadowColor: Colors.black,
    shadowOpacity: 0.26,
    shadowOffset: { height: 2, width: 0 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  date: {
    fontFamily: Fonts.FONT_NORMAL,
  },
  reason: {
    fontSize: 18,
    fontFamily: Fonts.FONT_BOLD,
  },
  detailsContainer: {
    paddingVertical: 5,
  },
  right: {
    padding: 5,
    borderRadius: 5,
    borderColor: Colors.grey,
    backgroundColor: Colors.secondary,
  },
  status: {
    color: Colors.primary,
  },
});
