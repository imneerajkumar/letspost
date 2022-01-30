import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
import navigationTheme from "./navigationTheme";
import { useSelector } from "react-redux";

function MainNavigator(props) {
  const isAuth = useSelector(state => !!state.auth.name);

  return (
    <NavigationContainer theme={navigationTheme}>
      {isAuth ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default MainNavigator;