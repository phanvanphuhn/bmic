import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as Updates from "expo-updates";
import Constants from "expo-constants";

const AppInfoScreen = ({ navigation }: { navigation: any }) => {
  const insets = useSafeAreaInsets();
  const [updateInfo, setUpdateInfo] = useState<any>(null);

  useEffect(() => {
    const getUpdateInfo = async () => {
      try {
        // Check if Updates module is available and has the required methods
        if (
          Updates &&
          Updates.isEnabled &&
          typeof Updates.checkForUpdateAsync === "function"
        ) {
          const update = await Updates.checkForUpdateAsync();
          if (update && update.isAvailable) {
            setUpdateInfo(update);
          }
        } else {
          // Updates not available in development/Expo Go
          setUpdateInfo({
            isAvailable: false,
            error: false,
            development: true,
          });
        }
      } catch (error) {
        console.log("Error checking for updates:", error);
        // Set a fallback state to avoid crashes
        setUpdateInfo({ isAvailable: false, error: true });
      }
    };

    getUpdateInfo();
  }, []);

  const appInfo = [
    {
      title: "App Name",
      value: "BMIC",
    },
    {
      title: "Version",
      value: Constants.expoConfig?.version || "1.0.2",
    },
    {
      title: "Build Number",
      value:
        Constants.expoConfig?.ios?.buildNumber ||
        Constants.expoConfig?.android?.versionCode ||
        "N/A",
    },
    {
      title: "Bundle ID",
      value:
        Constants.expoConfig?.ios?.bundleIdentifier ||
        Constants.expoConfig?.android?.package ||
        "N/A",
    },
    {
      title: "Runtime Version",
      value: Constants.expoConfig?.runtimeVersion || "N/A",
    },
    {
      title: "Update ID",
      value: (Updates && Updates.updateId) || "N/A",
    },
    {
      title: "Channel",
      value: (Updates && Updates.channel) || "N/A",
    },
    {
      title: "Update Available",
      value: updateInfo?.isAvailable
        ? "Yes"
        : updateInfo?.error
        ? "No"
        : updateInfo?.development
        ? "Dev Mode"
        : "No",
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { marginBottom: -insets.bottom }]}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>App Information</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* App Icon and Name */}
        <View style={styles.appHeader}>
          <View style={styles.appIcon}>
            <AntDesign name="appstore1" size={40} color="#fff" />
          </View>
          <Text style={styles.appName}>BMIC</Text>
          <Text style={styles.appDescription}>
            Powering the Decentralized Quantum Cloud
          </Text>
        </View>

        {/* App Information */}
        <View style={styles.infoContainer}>
          <Text style={styles.sectionTitle}>Application Details</Text>
          {appInfo.map((info, index) => (
            <View key={index} style={styles.infoItem}>
              <Text style={styles.infoLabel}>{info.title}</Text>
              <Text style={styles.infoValue}>{String(info.value)}</Text>
            </View>
          ))}
        </View>

        {/* Update Information */}
        {updateInfo && (
          <View style={styles.infoContainer}>
            <Text style={styles.sectionTitle}>Update Information</Text>
            {updateInfo.development && (
              <View style={[styles.infoItem, { backgroundColor: "#2a2a2a" }]}>
                <Text
                  style={[styles.infoLabel, { color: "#71717b", fontSize: 14 }]}
                >
                  Note: Update checking is not available in development mode
                  (Expo Go)
                </Text>
              </View>
            )}
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Update Available</Text>
              <Text
                style={[
                  styles.infoValue,
                  {
                    color: updateInfo.isAvailable
                      ? "#3fe0c5"
                      : updateInfo.error
                      ? "#ff6b6b"
                      : updateInfo.development
                      ? "#fbbf24"
                      : "#71717b",
                  },
                ]}
              >
                {updateInfo.isAvailable
                  ? "Yes"
                  : updateInfo.error
                  ? "No"
                  : updateInfo.development
                  ? "Dev Mode"
                  : "No"}
              </Text>
            </View>
            {updateInfo.manifest && (
              <>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Update Version</Text>
                  <Text style={styles.infoValue}>
                    {updateInfo.manifest.version || "N/A"}
                  </Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Update ID</Text>
                  <Text style={styles.infoValue}>
                    {updateInfo.manifest.id || "N/A"}
                  </Text>
                </View>
              </>
            )}
          </View>
        )}

        {/* Technical Details */}
        <View style={styles.infoContainer}>
          <Text style={styles.sectionTitle}>Technical Details</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Expo SDK Version</Text>
            <Text style={styles.infoValue}>{Constants.expoVersion}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Platform</Text>
            <Text style={styles.infoValue}>
              {Constants.platform?.ios ? "iOS" : "Android"}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Device Name</Text>
            <Text style={styles.infoValue}>
              {Constants.deviceName || "N/A"}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#18181b",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  appHeader: {
    alignItems: "center",
    marginVertical: 32,
  },
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: "#9810fa",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  appDescription: {
    fontSize: 16,
    color: "#71717b",
    textAlign: "center",
  },
  infoContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#18181b",
    borderRadius: 12,
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 16,
    color: "#71717b",
    flex: 1,
  },
  infoValue: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
    textAlign: "right",
    flex: 1,
  },
});

export default AppInfoScreen;
