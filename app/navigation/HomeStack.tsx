import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainAppScreen from "../screens/MainAppScreen";
import TheProblem from "../screens/TheProblem/index";
import OurSolution from "../screens/OurSolution/index";
import WhyChooseBMIC from "../screens/WhyChooseBMIC/index";
import Tokenomic from "../screens/Tokenomic/index";
import InvestmentOpportunity from "../screens/InvestmentOpportunity/index";
import Roadmap from "../screens/Roadmap/index";
import { ROUTES } from "../consts/Routes";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "#000" },
      }}
    >
      <Stack.Screen name={ROUTES.MAIN_APP} component={MainAppScreen} />
      <Stack.Screen name={ROUTES.THE_PROBLEM} component={TheProblem} />
      <Stack.Screen name={ROUTES.OUR_SOLUTION} component={OurSolution} />
      <Stack.Screen name={ROUTES.WHY_CHOOSE_BMIC} component={WhyChooseBMIC} />
      <Stack.Screen name={ROUTES.TOKENOMIC} component={Tokenomic} />
      <Stack.Screen
        name={ROUTES.INVESTMENT_OPPORTUNITY}
        component={InvestmentOpportunity}
      />
      <Stack.Screen name={ROUTES.ROADMAP} component={Roadmap} />
    </Stack.Navigator>
  );
};

export default HomeStack;
