import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Image as ExpoImage } from "expo-image";
import AppIcon from "../../assets/appIcon.png";
import QuantumGif from "../../assets/quanTum.gif";
import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";
import * as Notifications from "expo-notifications";

const { width, height } = Dimensions.get("window");

interface AuthScreenProps {
  navigation: any;
}

export default function AuthScreen({ navigation }: AuthScreenProps) {
  const handleLetBMIC = () => {
    navigation.replace("MainApp");
  };

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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.content}>
        {/* Logo and Title */}
        <View style={styles.logoContainer}>
          <ExpoImage
            source={AppIcon}
            style={styles.logo}
            contentFit="contain"
            transition={1000}
          />
          <Text style={styles.title}>BMIC</Text>
          <Text style={styles.subtitle}>
            Powering the Decentralized Quantum Cloud
          </Text>
        </View>

        {/* Quantum Animation */}
        <View style={styles.animationContainer}>
          <ExpoImage
            source={QuantumGif}
            style={styles.quantumImage}
            contentFit="cover"
            transition={1000}
          />
        </View>

        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            BMIC is building the world's first decentralized quantum compute
            network, secured by blockchain and orchestrated by AI.
          </Text>
        </View>

        {/* Let BMIC Button */}
        <TouchableOpacity style={styles.letBMICButton} onPress={handleLetBMIC}>
          <Text style={styles.buttonText}>Let BMIC!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    paddingVertical: 24,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#3fe0c5",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  animationContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  quantumImage: {
    width: width * 0.8,
    height: 200,
    borderRadius: 16,
  },
  descriptionContainer: {
    paddingHorizontal: 16,
  },
  description: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    lineHeight: 24,
    opacity: 0.9,
  },
  letBMICButton: {
    backgroundColor: "#9810fa",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    shadowColor: "#9810fa",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
