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
    },
    {
      id: 2,
      title: "Our Solution",
      screenName: ROUTES.OUR_SOLUTION,
    },
    {
      id: 3,
      title: "Why choose BMIC token?",
      screenName: ROUTES.WHY_CHOOSE_BMIC,
    },
    {
      id: 4,
      title: "Tokenomics",
      screenName: ROUTES.TOKENOMIC,
    },
    {
      id: 5,
      title: "Investment Opportunity",
      screenName: ROUTES.INVESTMENT_OPPORTUNITY,
    },
    {
      id: 6,
      title: "Roadmap",
      screenName: ROUTES.ROADMAP,
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
        {/* Header */}
        <Text style={[styles.title, { fontSize: 32 }]}>
          Powering the Decentralized Quantum Cloud
        </Text>
        <Text style={styles.subtitle}>for the AI and Crypto Era</Text>
        <View style={styles.videoContainer}>
          <VideoView
            player={videoPlayer}
            style={styles.quantumImage}
            contentFit="contain"
            allowsFullscreen
            allowsPictureInPicture
          />
        </View>
        <Text style={styles.description}>
          BMICis building theworld's firstdecentralized quantum compute network,
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
        {/* Navigation Items */}
        {navigationItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.containerItem, styles.row, styles.spaceBetween]}
            onPress={() => onNavigate(item.screenName)}
          >
            <Text style={styles.title}>{item.title}</Text>
            <AntDesign name="right" size={24} color="white" />
          </TouchableOpacity>
        ))}
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
  containerItem: {
    marginVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#71717b",
    paddingBottom: 24,
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
  },
  videoContainer: {
    position: "relative",
    marginVertical: 8,
  },
  quantumImage: {
    width: "100%",
    height: 200,
  },
  playButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -20 }, { translateY: -20 }],
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  whyBmicImage: {
    width: "100%",
    height: 250,
  },
});
