import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";

import { TProblems } from "../../models";
import CentralIcon from "../../../assets/centralIcon.png";
import QuantumIcon from "../../../assets/quantumIcon.png";
import AiComputeIcon from "../../../assets/aiComputeIcon.png";

const TheProblem = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const problems: TProblems[] = [
    {
      id: 1,
      icon: CentralIcon,
      title: "Centralization in Quantum Access",
      description:
        "Current quantum computing is controlled by tech giants, limiting innovation and accessibility for smaller organizations and researchers.",
    },
    {
      id: 2,
      icon: QuantumIcon,
      title: "Quantum Threat to Crypto",
      description:
        "Quantum computers threaten current cryptographic systems, putting blockchain security and digital assets at risk of compromise.",
    },
    {
      id: 3,
      icon: AiComputeIcon,
      title: "AI's Compute Ceiling",
      description:
        "AI advancement is hitting computational limits with classical computers, requiring quantum processing for next-generation breakthroughs.",
    },
  ];

  const onGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.f1}>
      <StatusBar style="light" />
      <ScrollView
        style={[styles.container, styles.f1]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Header with back button */}
        <View style={[styles.row, styles.spaceBetween, { marginBottom: 24 }]}>
          <TouchableOpacity onPress={onGoBack}>
            <AntDesign name="left" size={24} color="white" />
          </TouchableOpacity>

          <Text style={[styles.title]}>The Problem</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={[{ gap: 16 }]}>
          {problems.map((problem: TProblems) => (
            <View key={problem.id} style={styles.card}>
              <Image
                source={problem.icon}
                style={{
                  height: 64,
                  width: 64,
                  marginTop: 16,
                  marginHorizontal: 16,
                }}
                contentFit="cover"
                transition={1000}
              />
              <View style={styles.cardTitleContainer}>
                <Text style={styles.title}>{problem.title}</Text>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.description}>{problem.description}</Text>
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
    marginHorizontal: 16,
  },
  cardContent: {
    marginHorizontal: 16,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#71717b",
    paddingBottom: 16,
  },
});

export default TheProblem;
