import React from "react";
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

import { ROUTES } from "../../consts/Routes";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const profileData = [
    {
      id: 1,
      title: "Account Settings",
      icon: "user",
      description: "Manage your account information",
    },
    {
      id: 2,
      title: "Notifications",
      icon: "notification",
      description: "Configure notification preferences",
    },
    {
      id: 3,
      title: "Security",
      icon: "lock",
      description: "Security settings and privacy",
    },
    {
      id: 4,
      title: "Help & Support",
      icon: "questioncircle",
      description: "Get help and contact support",
    },
    {
      id: 5,
      title: "About",
      icon: "infocirlce",
      description: "App version and information",
    },
  ];

  const onItemPress = (item: any) => {
    // Handle item press - you can add navigation logic here
    console.log(`Pressed: ${item.title}`);
  };

  const onLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: ROUTES.AUTH as never }],
    });
  };

  return (
    <SafeAreaView style={[styles.f1, { marginBottom: -insets.bottom }]}>
      <StatusBar style="light" />
      <ScrollView
        style={[styles.container, styles.f1]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.subtitle}>
            Manage your account and preferences
          </Text>
        </View>

        {/* Profile Info */}
        <View style={styles.profileInfo}>
          <View style={styles.avatar}>
            <AntDesign name="user" size={40} color="#fff" />
          </View>
          <Text style={styles.profileName}>BMIC User</Text>
          <Text style={styles.profileEmail}>user@bmic.ai</Text>
        </View>

        {/* Profile Options */}
        <View style={styles.optionsContainer}>
          {profileData.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.optionItem}
              onPress={() => onItemPress(item)}
              disabled
            >
              <View style={styles.optionLeft}>
                <View style={styles.iconContainer}>
                  <AntDesign name={item.icon as any} size={20} color="#fff" />
                </View>
                <View style={styles.optionText}>
                  <Text style={styles.optionTitle}>{item.title}</Text>
                  <Text style={styles.optionDescription}>
                    {item.description}
                  </Text>
                </View>
              </View>
              <AntDesign name="right" size={16} color="#71717b" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <AntDesign name="logout" size={20} color="#FF6B6B" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
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
  header: {
    marginBottom: 32,
    marginTop: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#71717b",
  },
  profileInfo: {
    alignItems: "center",
    marginBottom: 32,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#9810fa",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
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
  optionsContainer: {
    marginBottom: 32,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#18181b",
    borderRadius: 12,
    marginBottom: 12,
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#9810fa",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: "#71717b",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255, 107, 107, 0.1)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FF6B6B",
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF6B6B",
    marginLeft: 8,
  },
});

export default ProfileScreen;
