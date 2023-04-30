import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import Icon from "@expo/vector-icons/Ionicons";
import { Calendar } from "react-native-calendars";
import { eachDayOfInterval } from "date-fns";
import moment from "moment";

import Card from "src/components/core/Card";
import * as Colors from "src/constants/Colors";
import Input from "src/components/core/Input";
import { leaveItems } from "src/data/dummy-data";
import { width } from "src/constants/Sizes";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state: any, action: any) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const LeaveScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [markedDates, setMarkedDates] = useState<{
    [date: string]: any;
  }>({});

  const handleDayPress = (day: any) => {
    if (startDate && endDate) {
      if (markedDates[day.dateString]) return;
      const range = {
        [startDate]: { startingDay: true, color: "green", textColor: "white" },
        [endDate]: { endingDay: true, color: "green", textColor: "white" },
      };
      const days = eachDayOfInterval({
        start: new Date(startDate),
        end: new Date(day.dateString || ""),
      });
      const newMarkedDates: { [date: string]: any } = {};
      days.forEach((d) => {
        newMarkedDates[moment(d).format("YYYY-MM-DD")] = {
          color: "green",
          textColor: "white",
        };
      });
      setStartDate(day.dateString || null);
      setEndDate(null);
      setMarkedDates((prev) => {
        return { ...prev, ...range, ...newMarkedDates };
      });
    } else if (startDate && !endDate) {
      if (markedDates[day.dateString]) return;
      const allDays = eachDayOfInterval({
        start:
          new Date(day.dateString || "") < new Date(startDate)
            ? new Date(day.dateString || "")
            : new Date(startDate),
        end:
          new Date(day.dateString || "") < new Date(startDate)
            ? new Date(startDate)
            : new Date(day.dateString || ""),
      });
      for (const d of allDays) {
        if (markedDates[moment(d).format("YYYY-MM-DD")]) {
          // If a date is already marked, reset start and end dates
          setStartDate(null);
          setEndDate(null);
          return;
        }
      }
      if (new Date(day.dateString || "") < new Date(startDate)) {
        setStartDate(day.dateString || null);
        setEndDate(startDate);
        setMarkedDates((prev) => {
          return { ...prev };
        });
      } else if (day.dateString === startDate) {
        setStartDate(null);
        setEndDate(null);
        setMarkedDates((prev) => {
          return { ...prev };
        });
      } else {
        const range = {
          [startDate]: {
            startingDay: true,
            color: "green",
            textColor: "white",
          },
          [day.dateString || ""]: {
            endingDay: true,
            color: "green",
            textColor: "white",
          },
        };
        const days = eachDayOfInterval({
          start: new Date(startDate),
          end: new Date(day.dateString || ""),
        });
        const newMarkedDates: { [date: string]: any } = {};
        days.forEach((d) => {
          newMarkedDates[moment(d).format("YYYY-MM-DD")] = {
            color: "green",
            textColor: "white",
          };
        });
        setEndDate(day.dateString || null);
        setMarkedDates((prev) => {
          return { ...prev, ...range, ...newMarkedDates };
        });
      }
    } else {
      if (markedDates[day.dateString]) return;
      setStartDate(day.dateString || null);
      setEndDate(null);
    }
  };

  const generateMarkedDates = () => {
    const markedDates: any = {};
    const markedDateStyles = {
      color: Colors.secondary,
      textColor: Colors.primary,
      disabled: true,
    };
    leaveItems.forEach((item) => {
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
          d <= new Date(item.end_date);
          d.setDate(d.getDate() + 1)
        ) {
          const date = d.toISOString().slice(0, 10);
          const isStartDate = date === item.start_date;
          const isEndDate = date === item.end_date;
          markedDates[date] = {
            ...markedDateStyles,
            startingDay: isStartDate,
            endingDay: isEndDate,
          };
        }
      }
    });
    // console.log(markedDates);
    setMarkedDates(markedDates);
  };

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      start_date: "",
      end_date: "",
      reason: null || "",
    },
    inputValidities: {
      start_date: false,
      end_date: false,
      reason: true,
    },
    formIsValid: false,
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier: any, inputValue: any, inputValidity: any) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  useEffect(() => {
    generateMarkedDates();
  }, [endDate?.length]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.screen}
    >
      <LinearGradient
        colors={[Colors.secondary, Colors.accent]}
        style={styles.gradient}
      >
        <View style={styles.calendar}>
          <Calendar
            minDate={
              endDate
                ? moment(endDate).add(1, "days").format("YYYY-MM-DD")
                : new Date().toISOString().slice(0, 10)
            }
            theme={{
              selectedDayBackgroundColor: Colors.secondary,
              selectedDayTextColor: Colors.primary,
            }}
            markedDates={markedDates}
            onDayPress={handleDayPress}
            hideExtraDays={true}
          />
        </View>
        <Card style={styles.cardContainer}>
          <ScrollView>
            <View>
              <View style={styles.inputContainer}>
                <View style={styles.iconContainer}>
                  <Icon
                    name="calendar-outline"
                    size={20}
                    color="#ccc"
                    style={styles.icon}
                  />
                  <Text>Start date </Text>
                </View>
                <Text>
                  {startDate ? (
                    startDate
                  ) : (
                    <Text style={{ color: "#c5c5c5" }}>Select Date</Text>
                  )}
                </Text>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.iconContainer}>
                  <Icon
                    name="calendar-outline"
                    size={20}
                    color="#ccc"
                    style={styles.icon}
                  />
                  <Text>End date </Text>
                </View>

                <Text>
                  {endDate ? (
                    endDate
                  ) : (
                    <Text style={{ color: "#c5c5c5" }}>Select Date</Text>
                  )}
                </Text>
              </View>
            </View>
            <Input
              id="reason"
              label="Reason"
              keyboardType="default"
              autoCapitalize="none"
              placeholder="Enter the reason (Optional)"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Button title={"Apply"} color={Colors.primary} />
              )}
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default LeaveScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
  iconContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  calendar: {
    width: width * 0.9,
    marginBottom: 10,
  },
});
