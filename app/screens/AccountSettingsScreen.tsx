import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Image as ExpoImage } from "expo-image";
import Toast from "react-native-toast-message";

import { ROUTES } from "../consts/Routes";
import { useAuthStore } from "../stores/authStore";

const AccountSettingsScreen = ({ navigation }: { navigation: any }) => {
  const insets = useSafeAreaInsets();
  const { currentUser, signOut, accounts, deleteAccount } = useAuthStore();

  const accountInfo = [
    {
      title: "Email Address",
      value: currentUser?.email || "N/A",
      icon: "mail",
    },
    {
      title: "Account ID",
      value: currentUser?.id || "N/A",
      icon: "idcard",
    },
    {
      title: "Member Since",
      value: currentUser?.createdAt
        ? new Date(currentUser.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "N/A",
      icon: "calendar",
    },
    {
      title: "Account Status",
      value: "Active",
      icon: "checkcircle",
      status: "active",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "#3fe0c5";
      case "inactive":
        return "#ff6b6b";
      default:
        return "#71717b";
    }
  };

  const onDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            if (currentUser) {
              // Delete the account from the store
              const success = deleteAccount(currentUser.id);

              if (success) {
                // Show success toast
                Toast.show({
                  type: "success",
                  text1: "Account Deleted",
                  text2: "Your account has been permanently deleted",
                });

                // Navigate to auth screen after a short delay
                setTimeout(() => {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: ROUTES.AUTH as never }],
                  });
                }, 1500);
              } else {
                Toast.show({
                  type: "error",
                  text1: "Error",
                  text2: "Failed to delete account. Please try again.",
                });
              }
            }
          },
        },
      ]
    );
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
        <Text style={styles.title}>Account Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            {currentUser?.avatar ? (
              <ExpoImage
                source={{ uri: currentUser.avatar }}
                style={styles.avatar}
                contentFit="cover"
              />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <AntDesign name="user" size={40} color="#fff" />
              </View>
            )}
          </View>
          <Text style={styles.profileName}>
            {currentUser ? currentUser.email.split("@")[0] : "BMIC User"}
          </Text>
          <Text style={styles.profileEmail}>
            {currentUser?.email || "user@bmic.ai"}
          </Text>
        </View>

        {/* Account Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          {accountInfo.map((info, index) => (
            <View key={index} style={styles.infoItem}>
              <View style={styles.infoLeft}>
                <View style={styles.iconContainer}>
                  <AntDesign
                    name={info.icon as any}
                    size={20}
                    color={
                      info.status ? getStatusColor(info.status) : "#9810fa"
                    }
                  />
                </View>
                <View style={styles.infoText}>
                  <Text style={styles.infoLabel}>{info.title}</Text>
                  <Text
                    style={[
                      styles.infoValue,
                      info.status && { color: getStatusColor(info.status) },
                    ]}
                  >
                    {info.value}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Privacy Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>

          <TouchableOpacity style={styles.actionItem} onPress={onDeleteAccount}>
            <View style={styles.actionLeft}>
              <View style={styles.iconContainer}>
                <AntDesign name="deleteuser" size={20} color="#ff6b6b" />
              </View>
              <View style={styles.infoText}>
                <Text style={[styles.infoLabel, { color: "#ff6b6b" }]}>
                  Delete Account
                </Text>
                <Text style={styles.infoDescription}>
                  Permanently delete your account
                </Text>
              </View>
            </View>
            <AntDesign name="right" size={16} color="#71717b" />
          </TouchableOpacity>
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
  profileHeader: {
    alignItems: "center",
    marginVertical: 32,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#9810fa",
    alignItems: "center",
    justifyContent: "center",
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: "#71717b",
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
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#18181b",
    borderRadius: 12,
    marginBottom: 8,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#18181b",
    borderRadius: 12,
    marginBottom: 8,
  },
  infoLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  actionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2a2a2a",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  infoText: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    color: "#71717b",
  },
  infoDescription: {
    fontSize: 14,
    color: "#71717b",
  },
});

export default AccountSettingsScreen;
