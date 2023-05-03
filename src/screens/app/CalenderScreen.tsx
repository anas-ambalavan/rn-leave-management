import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Agenda } from "react-native-calendars";
import { DateData, MarkedDates } from "react-native-calendars/src/types";

import { RenderItemData } from "src/interfaces/calender";
import { height } from "src/constants/Sizes";
import * as Colors from "src/constants/Colors";
import { RootState } from "src/store";
import { useSelector } from "react-redux";
// import { leaveItems } from "src/data/dummy-data";

const CalenderScreen = () => {
  const [items, setItems] = useState({});
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});

  const { items: LeaveItems, loading } = useSelector(
    (state: RootState) => state.leaveState.leaveState
  );

  const [selectedDate, setSelectedDate] = useState("");

  const onDayPress = (day: DateData) => {
    const updatedMarkedDates = { ...markedDates };

    // Reset the previously selected date's color
    if (selectedDate) {
      updatedMarkedDates[selectedDate] = {
        ...updatedMarkedDates[selectedDate],
        marked: false,
      };
    }

    updatedMarkedDates[day.dateString] = {
      ...updatedMarkedDates[day.dateString],
      marked: true,
      dotColor: Colors.primary,
    };

    setSelectedDate(day.dateString);
    setMarkedDates(updatedMarkedDates);
  };

  const loadItems = (day: DateData) => {
    setTimeout(() => {
      const newItems: { [key: string]: RenderItemData[] } = {};
      const dateString = day.dateString;
      const dayItems = LeaveItems.filter((item) => {
        return (
          item.start_date <= dateString &&
          item.end_date >= dateString &&
          item.reason
        );
      });

      newItems[dateString] = [];

      if (dayItems.length !== 0) {
        dayItems.forEach((item) => {
          newItems[dateString].push({
            reason: item.reason || "",
          });
        });
      }
      setItems(newItems);
    }, 1000);
  };

  const renderItem = (item: any) => {
    return (
      <View style={styles.renderItem}>
        <Text>{item.reason}</Text>
      </View>
    );
  };

  const generateMarkedDates = () => {
    const markedDates: any = {};
    const markedDateStyles = {
      color: Colors.secondary,
      textColor: Colors.primary,
    };
    LeaveItems.forEach((item) => {
      if (item.start_date === item.end_date) {
        markedDates[item.start_date] = {
          ...markedDateStyles,
          startingDay: true,
          endingDay: true,
        };
      } else {
        markedDates[item.start_date] = {
          ...markedDateStyles,
          startingDay: true,
        };
        markedDates[item.end_date] = { ...markedDateStyles, endingDay: true };
        for (
          let d = new Date(item.start_date);
          d < new Date(item.end_date);
          d.setDate(d.getDate() + 1)
        ) {
          const date = d.toISOString().slice(0, 10);
          markedDates[date] = {
            ...markedDateStyles,
            startingDay: date === item.start_date ? true : false,
          };
        }
      }
    });
    setMarkedDates(markedDates);
  };

  useEffect(() => {
    generateMarkedDates();
  }, []);

  return (
    <Agenda
      items={items}
      loadItemsForMonth={loadItems}
      renderItem={renderItem}
      onDayPress={onDayPress}
      theme={{
        agendaDayTextColor: Colors.black,
        agendaDayNumColor: Colors.primary,
        agendaTodayColor: Colors.primary,
        agendaKnobColor: Colors.primary,
        selectedDayBackgroundColor: Colors.secondary,
        selectedDayTextColor: Colors.primary,
        selectedDotColor: Colors.red,
        todayTextColor: Colors.blue,
        dotColor: Colors.primary,
      }}
      hideExtraDays={true}
      markingType={"period"}
      markedDates={markedDates}
    />
  );
};

export default CalenderScreen;

const styles = StyleSheet.create({
  renderItem: {
    justifyContent: "center",
    padding: 5,
    borderWidth: 1,
    borderColor: Colors.grey,
    backgroundColor: Colors.white,
    height: height / 10,
    marginTop: 10,
    borderRadius: 5,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
