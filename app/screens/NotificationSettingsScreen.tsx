import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import AntDesign from "@expo/vector-icons/AntDesign";
import Toast from "react-native-toast-message";
import * as Notifications from "expo-notifications";

import { ROUTES } from "../consts/Routes";

const NotificationSettingsScreen = ({ navigation }: { navigation: any }) => {
  const insets = useSafeAreaInsets();
  const [notificationStatus, setNotificationStatus] = useState<{
    granted: boolean;
    canAskAgain: boolean;
  }>({ granted: false, canAskAgain: true });

  useEffect(() => {
    checkNotificationStatus();
  }, []);

  const checkNotificationStatus = async () => {
    try {
      const { status, canAskAgain } = await Notifications.getPermissionsAsync();
      setNotificationStatus({
        granted: status === "granted",
        canAskAgain: canAskAgain,
      });
    } catch (error) {
      console.error("Error checking notification status:", error);
    }
  };

  const handleNotificationToggle = async () => {
    try {
      if (notificationStatus.granted) {
        // If notifications are enabled, show alert to disable
        Alert.alert(
          "Disable Notifications",
          "To disable notifications, you'll need to go to your device settings. Would you like to open settings now?",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Open Settings",
              onPress: () => {
                Linking.openSettings();
              },
            },
          ]
        );
      } else {
        // If notifications are disabled, try to request permission
        if (notificationStatus.canAskAgain) {
          const { status } = await Notifications.requestPermissionsAsync();
          if (status === "granted") {
            setNotificationStatus({ granted: true, canAskAgain: true });
            Toast.show({
              type: "success",
              text1: "Notifications Enabled",
              text2: "You'll now receive notifications from BMIC",
            });
          } else {
            Toast.show({
              type: "error",
              text1: "Permission Denied",
              text2: "Notifications are still disabled",
            });
          }
        } else {
          // Can't ask again, redirect to settings
          Alert.alert(
            "Enable Notifications",
            "Notifications are disabled. To enable them, please go to your device settings and allow notifications for BMIC.",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Open Settings",
                onPress: () => {
                  Linking.openSettings();
                },
              },
            ]
          );
        }
      }
    } catch (error) {
      console.error("Error handling notification toggle:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to update notification settings",
      });
    }
  };

  const getStatusColor = (granted: boolean) => {
    return granted ? "#3fe0c5" : "#ff6b6b";
  };

  const getStatusText = (granted: boolean) => {
    return granted ? "Enabled" : "Disabled";
  };

  const getStatusIcon = (granted: boolean) => {
    return granted ? "checkcircle" : "closecircle";
  };

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
        <Text style={styles.title}>Notification Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Notification Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Status</Text>
          <View style={styles.statusCard}>
            <View style={styles.statusLeft}>
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: notificationStatus.granted
                      ? "#3fe0c520"
                      : "#ff6b6b20",
                  },
                ]}
              >
                <AntDesign
                  name={getStatusIcon(notificationStatus.granted)}
                  size={24}
                  color={getStatusColor(notificationStatus.granted)}
                />
              </View>
              <View style={styles.statusText}>
                <Text style={styles.statusLabel}>Push Notifications</Text>
                <Text
                  style={[
                    styles.statusValue,
                    { color: getStatusColor(notificationStatus.granted) },
                  ]}
                >
                  {getStatusText(notificationStatus.granted)}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                {
                  backgroundColor: notificationStatus.granted
                    ? "#ff6b6b"
                    : "#3fe0c5",
                },
              ]}
              onPress={handleNotificationToggle}
            >
              <Text style={styles.toggleButtonText}>
                {notificationStatus.granted ? "Disable" : "Enable"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Notification Types */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Types</Text>

          <View style={styles.notificationItem}>
            <View style={styles.notificationLeft}>
              <View style={styles.iconContainer}>
                <AntDesign name="infocirlce" size={20} color="#9810fa" />
              </View>
              <View style={styles.notificationText}>
                <Text style={styles.notificationLabel}>App Updates</Text>
                <Text style={styles.notificationDescription}>
                  Notifications about app updates and new features
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.statusIndicator,
                {
                  backgroundColor: notificationStatus.granted
                    ? "#3fe0c5"
                    : "#71717b",
                },
              ]}
            />
          </View>

          <View style={styles.notificationItem}>
            <View style={styles.notificationLeft}>
              <View style={styles.iconContainer}>
                <AntDesign name="rocket1" size={20} color="#9810fa" />
              </View>
              <View style={styles.notificationText}>
                <Text style={styles.notificationLabel}>BMIC Updates</Text>
                <Text style={styles.notificationDescription}>
                  Important updates about BMIC platform and services
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.statusIndicator,
                {
                  backgroundColor: notificationStatus.granted
                    ? "#3fe0c5"
                    : "#71717b",
                },
              ]}
            />
          </View>

          <View style={styles.notificationItem}>
            <View style={styles.notificationLeft}>
              <View style={styles.iconContainer}>
                <AntDesign name="Safety" size={20} color="#9810fa" />
              </View>
              <View style={styles.notificationText}>
                <Text style={styles.notificationLabel}>Security Alerts</Text>
                <Text style={styles.notificationDescription}>
                  Important security notifications and alerts
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.statusIndicator,
                {
                  backgroundColor: notificationStatus.granted
                    ? "#3fe0c5"
                    : "#71717b",
                },
              ]}
            />
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  statusCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#18181b",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#333",
  },
  statusLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  statusText: {
    flex: 1,
  },
  statusLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  statusValue: {
    fontSize: 16,
    fontWeight: "500",
  },
  toggleButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  toggleButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#18181b",
    borderRadius: 12,
    marginBottom: 8,
  },
  notificationLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  notificationText: {
    flex: 1,
  },
  notificationLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 2,
  },
  notificationDescription: {
    fontSize: 14,
    color: "#71717b",
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  helpItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#18181b",
    borderRadius: 12,
    marginBottom: 8,
  },
  helpLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  helpText: {
    flex: 1,
  },
  helpLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 2,
  },
  helpDescription: {
    fontSize: 14,
    color: "#71717b",
  },
});

export default NotificationSettingsScreen;
