import { SectionList, StyleSheet, View } from "react-native";
import React, { useState } from "react";

import LeaveCard from "src/components/UI/LeaveCard";
import { leaveItems } from "src/data/dummy-data";
import SectionHeader from "src/components/UI/SectionHeader";
import CustomButton from "src/components/UI/CustomButton";
import { LinearGradient } from "expo-linear-gradient";
import * as Colors from "src/constants/Colors";

const HomeScreen = () => {
  const [showUpcoming, setShowUpcoming] = useState(true);

  const today = new Date();
  const upcomingLeaves = leaveItems.filter(
    (leave) => new Date(leave.start_date) >= today
  );
  const pastLeaves = leaveItems.filter(
    (leave) => new Date(leave.end_date) < today
  );

  const dataToShow = showUpcoming ? upcomingLeaves : pastLeaves;

  const toggleLeaves = () => {
    setShowUpcoming(!showUpcoming);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.secondary, Colors.accent]}
        style={styles.gradient}
      >
        <CustomButton
          onPress={toggleLeaves}
          text={showUpcoming ? "Past Leaves" : "Upcoming Leaves"}
          btnStyle={styles.toggleButton}
        />
        <SectionList
          sections={dataToShow.reduce((acc: any, curr: any) => {
            const date = new Date(curr.start_date);
            const month = date.toLocaleString("default", { month: "long" });
            const year = date.getFullYear();
            const existingSectionIndex = acc.findIndex(
              (section: any) => section.title === `${month} ${year}`
            );
            if (existingSectionIndex !== -1) {
              acc[existingSectionIndex].data.push(curr);
            } else {
              acc.push({
                title: `${month} ${year}`,
                data: [curr],
              });
            }
            return acc;
          }, [])}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ alignItems: "center" }}>
              <LeaveCard
                start_date={item.start_date}
                end_date={item.end_date}
                reason={item.reason}
              />
            </View>
          )}
          renderSectionHeader={SectionHeader}
        />
      </LinearGradient>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleButton: {
    alignSelf: "flex-end",
  },
});
