import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  ImageSourcePropType,
} from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import CentralIcon from "./assets/centralIcon.png";
import QuantumIcon from "./assets/quantumIcon.png";
import AiComputeIcon from "./assets/aiComputeIcon.png";
import BlockchainAcpIcon from "./assets/blockchainAcpIcon.png";
import AiLayerIcon from "./assets/aiLayerIcon.png";

import QuantumGif from "./assets/quanTum.gif";
import WhyBmicGif from "./assets/whyBmic.gif";

type TProblems = {
  id: number;
  icon: ImageSourcePropType;
  title: string;
  description: string;
};

type TSolutions = {
  id: number;
  icon: ImageSourcePropType;
  title: string;
  description: string;
};

function AppContent() {
  const insets = useSafeAreaInsets();

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

  return (
    <SafeAreaView style={styles.f1}>
      <StatusBar style="light" />
      <ScrollView
        style={[styles.container, styles.f1]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <Text style={[styles.title, { fontSize: 32 }]}>
          Powering the Decentralized Quantum Cloud
        </Text>
        <Text style={styles.subtitle}>for the AI and Crypto Era</Text>
        <Image
          source={QuantumGif}
          style={styles.quantumImage}
          contentFit="cover"
          transition={1000}
        />
        <Text style={styles.description}>
          BMICis building theworld’s firstdecentralized quantum compute network,
          secured by blockchain and orchestrated by AI.
        </Text>
        <View style={[{ marginTop: 16, gap: 8 }]}>
          <Image
            source={WhyBmicGif}
            style={styles.whyBmicImage}
            contentFit="cover"
            transition={1000}
          />
          <View style={[{ gap: 4 }]}>
            <Text style={[styles.subtitle, { color: "#3fe0c5" }]}>
              Why BMIC?
            </Text>
            <Text style={styles.subtitle}>
              Powering the Decentralized Quantum Cloud
            </Text>
            <Text style={styles.description}>
              BMIC(BlockchainMicro-Ion Compute) exists to democratize quantum
              computing. Today, quantum power is centralized, prohibitively
              expensive, and largely restricted to a few tech giants. We believe
              in opening access to this revolutionary capability by combining
              quantum hardware, AI resource optimization, and blockchain
              governance.
            </Text>
          </View>
        </View>
        <View>
          <Text
            style={[styles.title, { marginVertical: 24, textAlign: "center" }]}
          >
            The Problem
          </Text>
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
        </View>
        <View>
          <Text
            style={[styles.title, { marginVertical: 24, textAlign: "center" }]}
          >
            Our Solution
          </Text>
          <View style={[{ gap: 16 }]}>
            {solutions.map((solutions: TSolutions) => (
              <View key={solutions.id} style={styles.card}>
                <Image
                  source={solutions.icon}
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
                  <Text style={styles.title}>{solutions.title}</Text>
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.description}>
                    {solutions.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={[
          styles.bottomButton,
          Platform.OS === "android" ? { marginBottom: insets.bottom } : {},
        ]}
      >
        <Text style={styles.subtitle}>See More Information</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

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
  bottomButton: {
    borderRadius: 8,
    backgroundColor: "#9810fa",
    padding: 16,
    margin: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  quantumImage: {
    width: "100%",
    height: 200,
    marginVertical: 8,
  },
  whyBmicImage: {
    width: "100%",
    height: 250,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#71717b",
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
});
