import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import HomeStack from "./HomeStack";
import MainEventStack from "./MainEventStack";
import ProfileStack from "./ProfileStack";
import NewsStack from "./NewsStack";
import { ROUTES } from "../consts/Routes";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#000",
          borderTopColor: "#71717b",
          borderTopWidth: 1,
          height: Platform.OS === "ios" ? 90 : 70,
          paddingBottom: Platform.OS === "ios" ? 30 : 10,
          paddingTop: 10,
          marginBottom: Platform.OS === "ios" ? 0 : insets.bottom,
        },
        tabBarActiveTintColor: "#9810fa",
        tabBarInactiveTintColor: "#71717b",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name={ROUTES.HOME_TAB}
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.MAIN_EVENT_TAB}
        component={MainEventStack}
        options={{
          tabBarLabel: "Events",
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <AntDesign name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.NEWS_TAB}
        component={NewsStack}
        options={{
          tabBarLabel: "News",
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <AntDesign name="filetext1" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.PROFILE_TAB}
        component={ProfileStack}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
