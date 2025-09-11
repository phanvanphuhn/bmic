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

import { TSolutions } from "../../models";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import CentralIcon from "../../../assets/centralIcon.png";
import BlockchainAcpIcon from "../../../assets/blockchainAcpIcon.png";
import AiLayerIcon from "../../../assets/aiLayerIcon.png";

const OurSolution = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const solutions: TSolutions[] = [
    {
      id: 1,
      icon: CentralIcon,
      title: "Quantum Hardware Layer",
      description:
        "We combine IBM Qiskit to integrate AI and quantum computing and cloud systems. Our quantum cloud is designed for high-performance computing and AI workloads.",
    },
    {
      id: 2,
      icon: BlockchainAcpIcon,
      title: "Blockchain Accept Layer",
      description:
        "Access to quantum is delivered. BMIC protocol incentivizes, payments, staking, and governance. Compute nodes work together through the decentralized network.",
    },
    {
      id: 3,
      icon: AiLayerIcon,
      title: "AI Orchestration Layer",
      description:
        "AI algorithms manage connectivity, infrastructure workloads, and resource optimization across the network. BMIC incentivizes efficiency, fault tolerance, and predictive scaling.",
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

          <Text style={[styles.title]}>Our Solution</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={[{ gap: 16 }]}>
          {solutions.map((solution: TSolutions) => (
            <View key={solution.id} style={styles.card}>
              <Image
                source={solution.icon}
                style={{
                  height: 64,
                  width: 64,
                  marginTop: 16,
                  marginHorizontal: 16,
                }}
                contentFit="contain"
                transition={1000}
              />
              <View style={styles.cardTitleContainer}>
                <Text style={styles.title}>{solution.title}</Text>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.description}>{solution.description}</Text>
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
  cardContent: {
    backgroundColor: "rgba(119, 49, 210, 0.3)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#71717b",
  },
});

export default OurSolution;
