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

const WhyChooseBMIC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const whyChooseBMIC = [
    {
      id: 1,
      title: "Compute Payments",
      description: "Pay for quantum cloud services with BMIC tokens",
      iconColor: "#3FE0C5",
    },
    {
      id: 2,
      title: "Staking Rewards",
      description: "Stake BMIC tokens to earn rewards and secure the network",
      iconColor: "#8B5CF6",
    },
    {
      id: 3,
      title: "Governance",
      description: "Participate in protocol governance and decision making",
      iconColor: "#9810fa",
    },
    {
      id: 4,
      title: "Node Access",
      description: "Gain for premium computing power access and node types",
      iconColor: "#FF6B6B",
    },
    {
      id: 5,
      title: "NFT Scheduling",
      description: "Get NFTs for priority job scheduling on quantum nodes",
      iconColor: "#3FE0C5",
    },
  ];

  const onGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.f1}>
      <StatusBar style="light" />
      {/* Header with back button */}
      <Header title="Why choose BMIC token?" onBackPress={onGoBack} />
      <ScrollView
        style={[styles.container, styles.f1]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <View style={[{ gap: 16 }]}>
          {whyChooseBMIC.map((item) => (
            <View key={item.id} style={styles.card}>
              <View
                style={{
                  backgroundColor: item.iconColor,
                  width: 16,
                  height: 16,
                  borderRadius: 16,
                  marginVertical: 8,
                  marginLeft: 16,
                }}
              />
              <View style={styles.cardTitleContainer}>
                <Text style={styles.title}>{item.title}</Text>
              </View>
              <View style={styles.cardTitleContainer}>
                <Text style={styles.description}>{item.description}</Text>
              </View>
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
  cardTitleContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#71717b",
  },
});

export default WhyChooseBMIC;
