import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CalendarScreen from "../screens/CalendarScreen";
import { ROUTES } from "../consts/Routes";

const Stack = createStackNavigator();

const MainEventStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "#000" },
      }}
    >
      <Stack.Screen name={ROUTES.CALENDAR} component={CalendarScreen} />
    </Stack.Navigator>
  );
};

export default MainEventStack;
