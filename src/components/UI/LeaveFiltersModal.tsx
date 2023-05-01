import moment from "moment";
import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
} from "react-native";

import {
  CURRENT_MONTH,
  CUSTOM_DATES,
  LAST_MONTH,
  LAST_SIX_MONTHS,
  LAST_YEAR,
} from "src/constants";
import { width } from "src/constants/Sizes";
import { LeaveFiltersModalProps } from "src/interfaces/leaves";
import FilterOption from "./FilterOption";
import * as Colors from "src/constants/Colors";

const LeaveFiltersModal = ({
  isVisible,
  onClose,
  resetFilter,
  selectedFilter,
  handleFilterSelect,
  onApplyFilter,
}: LeaveFiltersModalProps) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleApplyFilter = () => {
    const filterData = { filter: selectedFilter, startDate, endDate };
    const isValidStartDate = moment(startDate, "YYYY-MM-DD", true).isValid();
    const isValidEndDate = moment(endDate, "YYYY-MM-DD", true).isValid();
    if (
      selectedFilter === CUSTOM_DATES &&
      !isValidStartDate &&
      !isValidEndDate
    ) {
      return Alert.alert("Please enter valid dates! Format:YYYY-MM-DD ");
    }
    if (startDate > endDate)
      return Alert.alert("Please enter valid start-date amd end-date!");
    onApplyFilter(filterData);
    onClose();
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.headerText}>Leave Filters</Text>
          <View>
            <FilterOption
              filter={CURRENT_MONTH}
              selectedFilter={selectedFilter}
              handleFilterSelect={handleFilterSelect}
            />
            <FilterOption
              filter={LAST_MONTH}
              selectedFilter={selectedFilter}
              handleFilterSelect={handleFilterSelect}
            />
            <FilterOption
              filter={LAST_SIX_MONTHS}
              selectedFilter={selectedFilter}
              handleFilterSelect={handleFilterSelect}
            />
            <FilterOption
              filter={LAST_YEAR}
              selectedFilter={selectedFilter}
              handleFilterSelect={handleFilterSelect}
            />
            <FilterOption
              filter={CUSTOM_DATES}
              selectedFilter={selectedFilter}
              handleFilterSelect={handleFilterSelect}
            />

            {selectedFilter === CUSTOM_DATES && (
              <>
                <TextInput
                  placeholder="Start Date (YYYY-MM-DD)"
                  value={startDate}
                  onChangeText={setStartDate}
                  style={styles.textInput}
                />
                <TextInput
                  placeholder="End Date (YYYY-MM-DD)"
                  value={endDate}
                  onChangeText={setEndDate}
                  style={styles.textInput}
                />
              </>
            )}
          </View>
        </View>
        <TouchableOpacity onPress={handleApplyFilter} style={styles.button}>
          <Text style={styles.buttonText}>Apply Filters</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={resetFilter}
          style={{
            ...styles.button,
            backgroundColor: Colors.darkGrey,
            marginTop: 8,
          }}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onClose}
          style={{
            ...styles.button,
            backgroundColor: Colors.darkGrey,
            marginTop: 8,
          }}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default LeaveFiltersModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.white,
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: Colors.darkGrey,
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
    width: width * 0.5,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 4,
    padding: 12,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.white,
  },
});
