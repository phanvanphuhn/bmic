import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import AuthScreen from "./app/screens/AuthScreen";
import BottomTabNavigator from "./app/navigation/BottomTabNavigator";
import { ROUTES } from "./app/consts/Routes";
import { useAuthStore } from "./app/stores/authStore";

const Stack = createStackNavigator();

export default function App() {
  const { currentUser, isGuest } = useAuthStore();

  const initialRoute = currentUser || isGuest ? ROUTES.MAIN_TABS : ROUTES.AUTH;

  return (
    <SafeAreaProvider>
      <NavigationContainer key={initialRoute}>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: "#000" },
          }}
        >
          <Stack.Screen name={ROUTES.AUTH} component={AuthScreen} />
          <Stack.Screen
            name={ROUTES.MAIN_TABS}
            component={BottomTabNavigator}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </SafeAreaProvider>
  );
}
