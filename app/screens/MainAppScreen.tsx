import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  Linking,
} from "react-native";
import {
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import { VideoView, useVideoPlayer } from "expo-video";
import { useEvent } from "expo";
import { useNavigation, type NavigationProp } from "@react-navigation/native";
import QuantumMp4 from "../../assets/quanTum.mp4";
import WhyBmicGif from "../../assets/whyBmic.gif";
import { ROUTES } from "../consts/Routes";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function MainAppScreen() {
  const navigation = useNavigation<NavigationProp<any>>();
  const insets = useSafeAreaInsets();

  // Video player state management
  const videoPlayer = useVideoPlayer(QuantumMp4, (player) => {
    player.loop = true;
    player.muted = true; // Start muted for better UX
  });

  // Track video playing state
  const { isPlaying } = useEvent(videoPlayer, "playingChange", {
    isPlaying: videoPlayer.playing,
  });

  const navigationItems = [
    {
      id: 1,
      title: "The Problem",
      screenName: ROUTES.THE_PROBLEM,
      description: "Centralization in Quantum Access",
    },
    {
      id: 2,
      title: "Our Solution",
      screenName: ROUTES.OUR_SOLUTION,
      description: "Decentralized Quantum Cloud",
    },
    {
      id: 3,
      title: "Why Choose BMIC Token?",
      screenName: ROUTES.WHY_CHOOSE_BMIC,
      description: "Compute Payments & Staking Rewards",
    },
    {
      id: 4,
      title: "Tokenomics",
      screenName: ROUTES.TOKENOMIC,
      description: "1.5B Token Supply",
    },
    {
      id: 5,
      title: "Investment Opportunity",
      screenName: ROUTES.INVESTMENT_OPPORTUNITY,
      description: "Join the Quantum Revolution",
    },
    {
      id: 6,
      title: "Roadmap",
      screenName: ROUTES.ROADMAP,
      description: "Phase 1-4 Development Plan",
    },
  ];

  const onNavigate = (screenName: string) => {
    navigation.navigate(screenName);
  };

  const onSeeMore = () => {
    void Linking.openURL("https://bmic.ai/");
  };

  useEffect(() => {
    videoPlayer.play();
  }, []);

  return (
    <SafeAreaView style={[styles.f1, { marginBottom: -insets.bottom }]}>
      <StatusBar style="light" />
      <ScrollView
        style={[styles.container, styles.f1]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>
            Powering the{"\n"}Decentralized{"\n"}Quantum Cloud
          </Text>
          <Text style={styles.heroSubtitle}>for the AI and Crypto Era</Text>
          <View style={styles.videoContainer}>
            <VideoView
              player={videoPlayer}
              style={styles.quantumImage}
              contentFit="contain"
              allowsFullscreen
              allowsPictureInPicture
            />
          </View>
          <Text style={styles.heroDescription}>
            BMIC is building the world's first decentralized quantum compute
            network, secured by blockchain and orchestrated by AI.
          </Text>
        </View>

        {/* Presale Section */}
        {/* <View style={styles.presaleSection}>
          <Text style={styles.presaleTitle}>Buy Now</Text>
          <Text style={styles.presaleSubtitle}>Before Price Rises</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>1 $MIC = $0.1000</Text>
            <Text style={styles.nextPriceLabel}>Next Price: $0.1030</Text>
          </View>
          <View style={styles.paymentOptions}>
            <View style={styles.paymentOption}>
              <Text style={styles.paymentText}>🔷 ETH</Text>
            </View>
            <View style={styles.paymentOption}>
              <Text style={styles.paymentText}>🟢 USDT</Text>
            </View>
            <View style={styles.paymentOption}>
              <Text style={styles.paymentText}>💳 CARD</Text>
            </View>
          </View>
        </View> */}
        {/* Why BMIC Section */}
        <View style={styles.whyBmicSection}>
          <Image
            source={WhyBmicGif}
            style={styles.whyBmicImage}
            contentFit="cover"
            transition={1000}
          />
          <View style={styles.whyBmicContent}>
            <Text style={styles.whyBmicTitle}>Why BMIC?</Text>
            <Text style={styles.whyBmicSubtitle}>
              Powering the Decentralized Quantum Cloud
            </Text>
            <Text style={styles.whyBmicDescription}>
              BMIC (Blockchain Micro-Ion Compute) exists to democratize quantum
              computing. Today, quantum power is centralized, prohibitively
              expensive, and largely restricted to a few tech giants. We believe
              in opening access to this revolutionary capability by combining
              quantum hardware, AI resource optimization, and blockchain
              governance.
            </Text>
          </View>
        </View>
        {/* Navigation Items */}
        <View style={styles.navigationSection}>
          <Text style={styles.navigationTitle}>Explore BMIC</Text>
          {navigationItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.navigationItem}
              onPress={() => onNavigate(item.screenName)}
            >
              <View style={styles.navigationItemContent}>
                <Text style={styles.navigationItemTitle}>{item.title}</Text>
                <Text style={styles.navigationItemDescription}>
                  {item.description}
                </Text>
              </View>
              <AntDesign name="right" size={20} color="#3fe0c5" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {/* Footer Section */}
      <View style={styles.footerSection}>
        <TouchableOpacity style={[styles.bottomButton]} onPress={onSeeMore}>
          <Text style={styles.bottomButtonText}>
            Join the Quantum Revolution
          </Text>
        </TouchableOpacity>
        {/* <View style={styles.footerLinks}>
          <Text style={styles.footerText}>support@bmic.ai</Text>
          <View style={styles.socialLinks}>
            <Text style={styles.socialText}>Twitter</Text>
            <Text style={styles.socialText}>Telegram</Text>
            <Text style={styles.socialText}>Medium</Text>
          </View>
        </View> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  f1: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: "row",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },

  // Hero Section
  heroSection: {
    marginBottom: 32,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    lineHeight: 42,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 20,
    color: "#3fe0c5",
    fontWeight: "600",
    marginBottom: 24,
  },
  heroDescription: {
    fontSize: 16,
    color: "#ccc",
    lineHeight: 24,
    marginTop: 16,
  },

  // Presale Section
  presaleSection: {
    backgroundColor: "#111",
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: "#333",
  },
  presaleTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
  },
  presaleSubtitle: {
    fontSize: 16,
    color: "#3fe0c5",
    textAlign: "center",
    marginBottom: 20,
  },
  priceContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  priceLabel: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  nextPriceLabel: {
    fontSize: 14,
    color: "#3fe0c5",
  },
  paymentOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  paymentOption: {
    backgroundColor: "#222",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333",
  },
  paymentText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },

  // Why BMIC Section
  whyBmicSection: {
    marginBottom: 32,
  },
  whyBmicContent: {
    marginTop: 16,
  },
  whyBmicTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3fe0c5",
    marginBottom: 8,
  },
  whyBmicSubtitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
    marginBottom: 12,
  },
  whyBmicDescription: {
    fontSize: 16,
    color: "#ccc",
    lineHeight: 24,
  },
  whyBmicImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },

  // Navigation Section
  navigationSection: {
    marginBottom: 32,
  },
  navigationTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  navigationItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#111",
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  navigationItemContent: {
    flex: 1,
  },
  navigationItemTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  navigationItemDescription: {
    fontSize: 14,
    color: "#3fe0c5",
  },

  // Footer Section
  footerSection: {
    backgroundColor: "#111",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  bottomButton: {
    backgroundColor: "#3fe0c5",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
  },
  bottomButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerLinks: {
    alignItems: "center",
  },
  footerText: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 12,
  },
  socialLinks: {
    flexDirection: "row",
    gap: 20,
  },
  socialText: {
    color: "#3fe0c5",
    fontSize: 14,
    fontWeight: "500",
  },

  // Video Container
  videoContainer: {
    position: "relative",
    marginVertical: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  quantumImage: {
    width: "100%",
    height: 200,
  },
});
