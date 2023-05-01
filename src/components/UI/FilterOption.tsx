import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import { FilterOptionProps } from "src/interfaces/common";
import * as Colors from "src/constants/Colors";

const FilterOption = ({
  filter,
  selectedFilter,
  handleFilterSelect,
}: FilterOptionProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleFilterSelect(filter)}
    >
      <View style={styles.radioContainer}>
        {selectedFilter === filter && <View style={styles.radio} />}
      </View>
      <Text>{filter}</Text>
    </TouchableOpacity>
  );
};

export default FilterOption;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  radioContainer: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.darkGrey,
    alignItems: "center",
    justifyContent: "center",
    marginEnd: 10,
  },
  radio: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
});
