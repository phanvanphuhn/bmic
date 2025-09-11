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
import Header from "../components/header";
import AppIcon from "../../../assets/appIcon.png";

const Tokenomic = () => {
  const navigation = useNavigation<NavigationProp<any>>();
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

  const onGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.f1}>
      <StatusBar style="light" />
      {/* Header with back button */}
      <Header title="Tokenomics" onBackPress={onGoBack} titleColor="#FFD700" />
      <ScrollView
        style={[styles.container, styles.f1]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
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
  wrapTokenomicsContainer: {
    backgroundColor: "#18181b",
    borderRadius: 16,
    padding: 16,
  },
});

export default Tokenomic;
