import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "src/store";
import * as Font from "expo-font";
import { useState } from "react";
import AppLoading from "expo-app-loading";
import AppNavigator from "src/navigation/AppNavigator";

const fetchFonts = () => {
  return Font.loadAsync({
    "roboto-light": require("./src/assets/fonts/Roboto-Light.ttf"),
    "roboto-bold": require("./src/assets/fonts/Roboto-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      {/* <View style={styles.container}>
        <Text>Leave Management App</Text>
        <StatusBar style="auto" />
      </View> */}
      <AppNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
