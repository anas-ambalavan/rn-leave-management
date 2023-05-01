import {
  SectionList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import LeaveCard from "src/components/UI/LeaveCard";
import { leaveItems } from "src/data/dummy-data";
import SectionHeader from "src/components/UI/SectionHeader";
import CustomButton from "src/components/UI/CustomButton";
import * as Colors from "src/constants/Colors";
import LeaveFiltersModal from "src/components/UI/LeaveFiltersModal";
import {
  CURRENT_MONTH,
  CUSTOM_DATES,
  LAST_MONTH,
  LAST_SIX_MONTHS,
  LAST_YEAR,
} from "src/constants";
import { onApplyFilterParams } from "src/interfaces/leaves";
import { Ionicons } from "@expo/vector-icons";
import { width } from "src/constants/Sizes";

const HomeScreen = () => {
  const [showUpcoming, setShowUpcoming] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [dataToShow, setDataToShow] = useState<any>([]);
  const [selectedFilter, setSelectedFilter] = useState("");

  const today = new Date();
  const upcomingLeaves = leaveItems
    .slice()
    .filter((leave) => new Date(leave.start_date) >= today)
    .sort(
      (a: any, b: any) => +new Date(a.start_date) - +new Date(b.start_date)
    );
  const pastLeaves = leaveItems
    .slice()
    .filter((leave) => new Date(leave.end_date) < today)
    .sort((a: any, b: any) => +new Date(b.end_date) - +new Date(a.end_date));

  useEffect(() => {
    if (showUpcoming) setDataToShow(upcomingLeaves);
    else setDataToShow(pastLeaves);
  }, [showUpcoming]);

  const toggleLeaves = () => {
    setSelectedFilter("");
    setShowUpcoming(!showUpcoming);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
  };

  const resetFilter = () => {
    toggleModal();
    setSelectedFilter("");
    setDataToShow(upcomingLeaves);
  };

  const onApplyFilter = ({
    filter,
    startDate,
    endDate,
  }: onApplyFilterParams) => {
    let filteredLeaves = [];

    switch (filter) {
      case CURRENT_MONTH:
        filteredLeaves = leaveItems.filter((leave: any) => {
          const leaveMonth = new Date(leave.start_date).getMonth();
          const currentMonth = new Date().getMonth();
          return leaveMonth === currentMonth;
        });
        break;

      case LAST_MONTH:
        filteredLeaves = leaveItems.filter((leave: any) => {
          const leaveMonth = new Date(leave.start_date).getMonth();
          const lastMonth = new Date(
            today.getFullYear(),
            today.getMonth() - 1,
            1
          ).getMonth();
          return leaveMonth === lastMonth;
        });
        break;

      case LAST_SIX_MONTHS:
        filteredLeaves = leaveItems
          .filter((leave: any) => {
            const leaveDate = new Date(leave.start_date);
            const lastSixMonthsDate = new Date(
              today.getFullYear(),
              today.getMonth() - 6,
              1
            );
            return leaveDate >= lastSixMonthsDate && leaveDate <= today;
          })
          .sort(
            (a: any, b: any) =>
              +new Date(b.start_date) - +new Date(a.start_date)
          );
        break;

      case LAST_YEAR:
        filteredLeaves = leaveItems
          .filter((leave: any) => {
            const leaveDate = new Date(leave.start_date);
            const lastYearDate = new Date(
              today.getFullYear() - 1,
              today.getMonth() + 1,
              0
            );
            return leaveDate >= lastYearDate && leaveDate <= today;
          })
          .sort(
            (a: any, b: any) =>
              +new Date(b.start_date) - +new Date(a.start_date)
          );
        break;

      case CUSTOM_DATES:
        filteredLeaves = leaveItems
          .filter((leave: any) => {
            const leaveDate = new Date(leave.start_date);
            const startDateObj = new Date(startDate);
            const endDateObj = new Date(endDate);
            return leaveDate >= startDateObj && leaveDate <= endDateObj;
          })
          .sort(
            (a: any, b: any) =>
              +new Date(a.start_date) - +new Date(b.start_date)
          );
        break;

      default:
        filteredLeaves = upcomingLeaves;
    }

    setDataToShow(filteredLeaves);
  };

  return (
    <>
      <View style={styles.container}>
        <LinearGradient
          colors={[Colors.secondary, Colors.accent]}
          style={styles.gradient}
        >
          <View style={styles.headerContainer}>
            <TouchableWithoutFeedback onPress={toggleModal}>
              <View style={styles.filterContainer}>
                <Ionicons
                  name="md-filter-sharp"
                  size={25}
                  color={Colors.primary}
                />
                <Text style={styles.filterText}>Filters</Text>
              </View>
            </TouchableWithoutFeedback>
            <CustomButton
              onPress={toggleLeaves}
              text={showUpcoming ? "Past Leaves" : "Upcoming Leaves"}
            />
          </View>
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
      <LeaveFiltersModal
        isVisible={isModalVisible}
        onClose={toggleModal}
        onApplyFilter={onApplyFilter}
        resetFilter={resetFilter}
        selectedFilter={selectedFilter}
        handleFilterSelect={handleFilterSelect}
      />
    </>
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: width * 0.9,
  },
  filterContainer: { flexDirection: "row", alignItems: "center" },
  filterText: { color: Colors.primary, marginLeft: 5 },
});
