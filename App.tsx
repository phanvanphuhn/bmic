import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  ImageSourcePropType,
  Linking,
} from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";
import * as Notifications from "expo-notifications";
import CentralIcon from "./assets/centralIcon.png";
import QuantumIcon from "./assets/quantumIcon.png";
import AiComputeIcon from "./assets/aiComputeIcon.png";
import BlockchainAcpIcon from "./assets/blockchainAcpIcon.png";
import AiLayerIcon from "./assets/aiLayerIcon.png";

import QuantumGif from "./assets/quanTum.gif";
import WhyBmicGif from "./assets/whyBmic.gif";
import AppIcon from "./assets/appIcon.png";

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

  // Request tracking transparency and notifications permissions
  useEffect(() => {
    const requestPermissions = async () => {
      try {
        // Request tracking transparency permission first
        const trackingStatus = await requestTrackingPermissionsAsync();
        console.log("Tracking permission status:", trackingStatus.status);

        if (trackingStatus.status === "granted") {
          console.log("Yay! I have user permission to track data");
        }

        // Then request notifications permission
        const notificationSettings = await Notifications.getPermissionsAsync();
        if (!notificationSettings.granted) {
          const { status } = await Notifications.requestPermissionsAsync();
          console.log("Notification permission status:", status);

          if (status === "granted") {
            console.log("Yay! I have user permission to send notifications");
          }
        } else {
          console.log("Notifications already granted");
        }
      } catch (error) {
        console.error("Error requesting permissions:", error);
      }
    };

    requestPermissions();
  }, []);

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

  const tokenomicData = [
    {
      id: 1,
      title: "Pre Sale",
      total: "300",
      percent: "50%",
    },
    {
      id: 2,
      title: "Rewards & Staking",
      total: "250",
      percent: "18%",
    },
    {
      id: 3,
      title: "Liquidity & Exchanges",
      total: "200",
      percent: "15%",
    },
    {
      id: 4,
      title: "Team",
      total: "150",
      percent: "3%",
    },
    {
      id: 5,
      title: "Ecosystem Reserve",
      total: "100",
      percent: "8%",
    },
    {
      id: 6,
      title: "Marketing",
      total: "1,500",
      percent: "6%",
    },
  ];

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

  const roadmapData = [
    {
      id: 1,
      title: "Phase 1: Foundation",
      description: "Q4 2024 - Q1 2025",
      items: [
        {
          id: 1,
          title: "Build core AI & QML infrastructure",
        },
        {
          id: 2,
          title: "Alpha testnet launch - compute jobs",
        },
        {
          id: 3,
          title: "Whitepaper v1 and token launch",
        },
        {
          id: 4,
          title: "Arrangement of seed funding rounds",
        },
      ],
    },
    {
      id: 2,
      title: "Phase 2: Testnet Expansion",
      description: "Q2 2024 - Q3 2024",
      items: [
        {
          id: 1,
          title: "Developer onboarding",
        },
        {
          id: 2,
          title: "Beta compute marketplace live",
        },
        {
          id: 3,
          title: "Expand partner networking",
        },
        {
          id: 4,
          title: "NFT-based access live",
        },
      ],
    },
    {
      id: 3,
      title: "Phase 3: Mainet Launch",
      description: "Q4 2024 - Q1 2025",
      items: [
        {
          id: 1,
          title: "Full launch",
        },
        {
          id: 2,
          title: "Decentralized governance integration",
        },
        {
          id: 3,
          title: "Mainnet compute nodes are staking",
        },
        {
          id: 4,
          title: "Key strategic partnerships",
        },
      ],
    },
    {
      id: 4,
      title: "Phase 4: Optimization",
      description: "Q4 2024 - Q1 2025",
      items: [
        {
          id: 1,
          title: "Global node expansion",
        },
        {
          id: 2,
          title: "Compute quantum and data networks",
        },
        {
          id: 3,
          title: "Hybrid AI quantum services",
        },
        {
          id: 4,
          title: "Key strategic partnerships",
        },
      ],
    },
  ];

  const onSeeMore = () => {
    void Linking.openURL("https://bmic.ai/");
  };

  return (
    <SafeAreaView style={styles.f1}>
      <StatusBar style="light" />
      <ScrollView
        style={[styles.container, styles.f1]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Header */}
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
        {/* Why BMIC? */}
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
        {/* The Problem */}
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
        {/* Our Solution */}
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
        {/* Why choose BMIC token? */}
        <View>
          <Text
            style={[styles.title, { marginVertical: 24, textAlign: "center" }]}
          >
            Why choose BMIC token?
          </Text>
          <View style={[{ gap: 16 }]}>
            {whyChooseBMIC.map((whyChooseBMIC) => (
              <View key={whyChooseBMIC.id} style={styles.card}>
                <View
                  style={{
                    backgroundColor: whyChooseBMIC.iconColor,
                    width: 16,
                    height: 16,
                    borderRadius: 16,
                    marginVertical: 8,
                    marginLeft: 16,
                  }}
                />
                <View style={styles.cardTitleContainer}>
                  <Text style={styles.title}>{whyChooseBMIC.title}</Text>
                </View>
                <View style={styles.cardTitleContainer}>
                  <Text style={styles.description}>
                    {whyChooseBMIC.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        {/* Tokenomics */}
        <View>
          <Text
            style={[
              styles.title,
              { marginVertical: 24, textAlign: "center", color: "#FFD700" },
            ]}
          >
            Tokenomics
          </Text>
          <Text
            style={[
              styles.subtitle,
              { textAlign: "center", marginBottom: 16, marginTop: -8 },
            ]}
          >
            The BMIC token has a limited supply of 1.5 billion tokens and cannot
            be increased.
          </Text>
          <View style={styles.wrapTokenomicsContainer}>
            <View style={[styles.row, { alignItems: "center", gap: 8 }]}>
              <Image
                source={AppIcon}
                style={{
                  width: 32,
                  height: 32,
                }}
              />
              <Text style={styles.subtitle}>Coins</Text>
            </View>
            <View
              style={[
                styles.row,
                styles.spaceBetween,
                {
                  alignItems: "center",
                  paddingVertical: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: "#71717b",
                },
              ]}
            >
              <View style={{ width: "50%", justifyContent: "flex-start" }}>
                <Text style={styles.subtitle}>Category</Text>
              </View>
              {/* <View style={{ width: "30%", alignItems: "flex-end" }}>
                <Text style={styles.subtitle}>Million</Text>
              </View> */}
              <View style={{ width: "20%", alignItems: "flex-end" }}>
                <Text style={styles.subtitle}>%</Text>
              </View>
            </View>
            {tokenomicData.map((tokenomicItem) => (
              <View
                key={tokenomicItem.id}
                style={[
                  styles.row,
                  styles.spaceBetween,
                  {
                    alignItems: "center",
                    paddingVertical: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: "#71717b",
                  },
                  // tokenomicItem.id === tokenomicData.length && {
                  //   borderBottomWidth: 0,
                  //   backgroundColor: "#71717b",
                  // },
                ]}
              >
                <View style={{ width: "50%", justifyContent: "flex-start" }}>
                  <Text
                    style={[
                      styles.subtitle,
                      tokenomicItem.id === tokenomicData.length && {
                        fontWeight: "bold",
                      },
                    ]}
                  >
                    {tokenomicItem.title}
                  </Text>
                </View>
                {/* <View style={{ width: "30%", alignItems: "flex-end" }}>
                  <Text
                    style={[
                      styles.subtitle,
                      tokenomicItem.id === tokenomicData.length && {
                        fontWeight: "bold",
                      },
                    ]}
                  >
                    {tokenomicItem.total}
                  </Text>
                </View> */}
                <View style={{ width: "20%", alignItems: "flex-end" }}>
                  <Text
                    style={[
                      styles.subtitle,
                      tokenomicItem.id === tokenomicData.length && {
                        fontWeight: "bold",
                      },
                    ]}
                  >
                    {tokenomicItem.percent}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        {/* Investment Opportunity */}
        <View>
          <Text
            style={[styles.title, { marginVertical: 24, textAlign: "center" }]}
          >
            Investment Opportunity
          </Text>
          <View style={{ gap: 16 }}>
            {investmentData.map((investmentItem) => (
              <View style={styles.investmentContainer}>
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
        </View>
        {/* Roadmap */}
        <View>
          <Text
            style={[styles.title, { marginVertical: 24, textAlign: "center" }]}
          >
            Roadmap
          </Text>
          <View style={{ gap: 16 }}>
            {roadmapData.map((roadmapItem) => (
              <View style={styles.warpRoadmapItem}>
                <View>
                  <View style={[styles.row, { alignItems: "center", gap: 8 }]}>
                    <View
                      style={{
                        width: 32,
                        height: 32,
                        backgroundColor:
                          roadmapItem.id === 1
                            ? "#3FE0C5"
                            : roadmapItem.id === 2
                            ? "#8B5CF6"
                            : roadmapItem.id === 3
                            ? "#9810fa"
                            : "#FF6B6B",
                        borderRadius: 32,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={styles.subtitle}>{roadmapItem.id}</Text>
                    </View>
                    <View>
                      <Text style={styles.subtitle}>{roadmapItem.title}</Text>
                      <Text style={[styles.description, { color: "#71717b" }]}>
                        {roadmapItem.description}
                      </Text>
                    </View>
                  </View>
                  <View style={{ gap: 8, marginTop: 8 }}>
                    {roadmapItem.items.map((item) => (
                      <View
                        style={[styles.row, { gap: 8, alignItems: "center" }]}
                      >
                        <View
                          style={{
                            width: 8,
                            height: 8,
                            backgroundColor: "#71717b",
                            borderRadius: 16,
                          }}
                        />
                        <Text style={[styles.description, { color: "white" }]}>
                          {item.title}
                        </Text>
                      </View>
                    ))}
                  </View>
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
        onPress={onSeeMore}
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
  wrapTokenomicsContainer: {
    backgroundColor: "#18181b",
    borderRadius: 16,
    padding: 16,
  },
  investmentContainer: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#1A2332",
    gap: 8,
  },
  warpRoadmapItem: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#23273C",
    gap: 8,
  },
});
