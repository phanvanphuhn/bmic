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

const Roadmap = () => {
  const navigation = useNavigation<NavigationProp<any>>();
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
      description: "Q2 2025 - Q3 2025",
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
      description: "Q4 2025 - Q1 2026",
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
      description: "Ongoing",
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

          <Text style={[styles.title]}>Roadmap</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={{ gap: 16 }}>
          {roadmapData.map((roadmapItem) => (
            <View key={roadmapItem.id} style={styles.warpRoadmapItem}>
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
                      key={item.id}
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
  warpRoadmapItem: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#23273C",
    gap: 8,
  },
});

export default Roadmap;
