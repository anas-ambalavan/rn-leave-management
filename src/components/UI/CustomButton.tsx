import React from "react";
import { Platform, StyleSheet, Text, TouchableOpacity } from "react-native";

import * as Colors from "src/constants/Colors";
import * as Fonts from "src/assets/fonts";

const CustomButton = (props: any) => {
  const InlineBtnStyle = props.btnStyle ? props.btnStyle : {};
  return (
    <TouchableOpacity
      {...props}
      style={{
        ...styles.button,
        backgroundColor: Colors.primary,
        ...InlineBtnStyle,
      }}
      disabled={props.disabled ? props.disabled : false}
      onPress={() => {
        props.onPress ? props.onPress() : "";
      }}
    >
      <Text
        style={{
          color: Colors.white,
          fontSize: 16,
          fontWeight: Platform.OS === "android" ? "bold" : "900",
          fontFamily: Fonts.FONT_BOLD,
        }}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: "center",
  },
});
