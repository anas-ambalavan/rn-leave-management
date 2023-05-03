import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import React from "react";
import Icon from "@expo/vector-icons/Ionicons";

import * as Colors from "src/constants/Colors";
import * as Fonts from "src/assets/fonts";
import { width } from "src/constants/Sizes";
import { LeaveProps } from "src/interfaces/leaves";
import { LEAVE_SCREEN } from "src/navigation/Constants";

const LeaveCard = ({
  id,
  start_date,
  end_date,
  reason,
  navigation,
}: LeaveProps) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.detailsContainer}>
          <Text style={styles.reason}>
            {reason ? reason : `Reason not specified`}
          </Text>
          <Text style={styles.date}>{`Start Date: ${start_date}`}</Text>
          <Text style={styles.date}>{`End Date: ${end_date}`}</Text>
        </View>
        <View style={styles.rightContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate(LEAVE_SCREEN, {
                leaveId: id,
                start_date,
                end_date,
                reason,
              });
            }}
          >
            <Icon
              style={{ alignSelf: "flex-end" }}
              name="pencil"
              size={25}
              color={Colors.primary}
            />
          </TouchableWithoutFeedback>
          <View style={styles.right}>
            <Text style={styles.status}>Approved</Text>
          </View>
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
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
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
    marginVertical: 20,
    paddingVertical: 5,
  },
  right: {
    flexGrow: 1,
  },
  status: {
    marginTop: "auto",
    color: Colors.primary,
    borderColor: Colors.grey,
    backgroundColor: Colors.secondary,
    padding: 5,
    borderRadius: 5,
  },
  rightContainer: {
    marginVertical: 10,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
