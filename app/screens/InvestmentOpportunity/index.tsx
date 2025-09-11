import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import Header from "../components/header";

const InvestmentOpportunity = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const investmentData = [
    {
      id: 1,
      title: "€40M",
      subTitle: "Funding Raised",
      description:
        "Capital raised from institutional investors and strategic partners to fund quantum infrastructure development",
    },
    {
      id: 2,
      title: "10x",
      subTitle: "Projected ROI",
      description:
        "Expected return on investment based on quantum computing market growth projections",
    },
    {
      id: 3,
      title: "First",
      subTitle: "Competitive Edge",
      description:
        "World's first decentralized quantum cloud platform combining AI orchestration with blockchain governance",
    },
  ];

  const onGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.f1}>
      <StatusBar style="light" />
      {/* Header with back button */}
      <Header title="Investment Opportunity" onBackPress={onGoBack} />
      <ScrollView
        style={[styles.container, styles.f1]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <View style={{ gap: 16 }}>
          {investmentData.map((investmentItem) => (
            <View key={investmentItem.id} style={styles.investmentContainer}>
              <Text style={[styles.title, { color: "#3FE0C5" }]}>
                {investmentItem.title}
              </Text>
              <Text style={styles.subtitle}>{investmentItem.subTitle}</Text>
              <Text style={[styles.description, { color: "#71717b" }]}>
                {investmentItem.description}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  f1: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: "row",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "500",
  },
  description: {
    fontSize: 16,
    color: "#fff",
  },
  investmentContainer: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#1A2332",
    gap: 8,
  },
});

export default InvestmentOpportunity;
