import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/ProfileScreen/index";
import AppInfoScreen from "../screens/AppInfoScreen";
import AccountSettingsScreen from "../screens/AccountSettingsScreen";
import NotificationSettingsScreen from "../screens/NotificationSettingsScreen";
import { ROUTES } from "../consts/Routes";

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "#000" },
      }}
    >
      <Stack.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
      <Stack.Screen name={ROUTES.APP_INFO} component={AppInfoScreen} />
      <Stack.Screen
        name={ROUTES.ACCOUNT_SETTINGS}
        component={AccountSettingsScreen}
      />
      <Stack.Screen
        name={ROUTES.NOTIFICATION_SETTINGS}
        component={NotificationSettingsScreen}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
