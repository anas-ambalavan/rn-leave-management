import { StyleSheet, Text, View } from "react-native";
import React from "react";

import * as Colors from "src/constants/Colors";
import * as Fonts from "src/assets/fonts";

const SectionHeader = ({ section: { title } }: any) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionHeaderText}>{title}</Text>
  </View>
);

export default SectionHeader;

const styles = StyleSheet.create({
  sectionHeader: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
  },
  sectionHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.white,
  },
});
