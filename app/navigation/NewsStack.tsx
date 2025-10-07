import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NewsScreen from "../screens/NewsScreen";
import { ROUTES } from "../consts/Routes";

const Stack = createStackNavigator();

const NewsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "#000" },
      }}
    >
      <Stack.Screen name={ROUTES.NEWS} component={NewsScreen} />
    </Stack.Navigator>
  );
};

export default NewsStack;
