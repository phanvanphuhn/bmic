import React from "react";
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
import * as ImagePicker from "expo-image-picker";
import { Image as ExpoImage } from "expo-image";

import { ROUTES } from "../../consts/Routes";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore } from "../../stores/authStore";
import AppInfoScreen from "../AppInfoScreen";

const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { currentUser, signOut, updateAvatar } = useAuthStore();

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
      title: "White Paper",
      icon: "lock",
      description:
        "Powering the Decentralized Quantum Cloud for the AI + Crypto Era",
    },
    {
      id: 4,
      title: "Blog",
      icon: "questioncircle",
      description: "Blog",
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
    switch (item.title) {
      case "Account Settings":
        navigation.navigate(ROUTES.ACCOUNT_SETTINGS as never);
        break;
      case "Notifications":
        navigation.navigate(ROUTES.NOTIFICATION_SETTINGS as never);
        break;
      case "About":
        navigation.navigate(ROUTES.APP_INFO as never);
        break;
      case "White Paper":
        void Linking.openURL("https://bmic.gitbook.io/whitepaper/");
        break;
      case "Blog":
        void Linking.openURL("https://bmic.ai/blog/");
        break;
      default:
        console.log(item.title);
        break;
    }
  };

  const onLogout = () => {
    // Trigger logout actions immediately
    signOut();
    navigation.reset({
      index: 0,
      routes: [{ name: ROUTES.AUTH as never }],
    });

    // Show success toast
    Toast.show({
      type: "success",
      text1: "Logged out",
      text2: "You have been successfully logged out",
    });
  };

  const onAvatar = () => {
    Alert.alert("Select Avatar", "Choose how you want to set your avatar", [
      {
        text: "Camera",
        onPress: () => pickImage("camera"),
      },
      {
        text: "Photo Library",
        onPress: () => pickImage("library"),
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  const pickImage = async (source: "camera" | "library") => {
    try {
      let result;

      if (source === "camera") {
        // Request camera permissions
        const cameraPermission =
          await ImagePicker.requestCameraPermissionsAsync();
        if (cameraPermission.status !== "granted") {
          Toast.show({
            type: "error",
            text1: "Permission Required",
            text2: "Camera permission is needed to take photos",
          });
          return;
        }

        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });
      } else {
        // Request media library permissions
        const libraryPermission =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (libraryPermission.status !== "granted") {
          Toast.show({
            type: "error",
            text1: "Permission Required",
            text2: "Photo library permission is needed to select photos",
          });
          return;
        }

        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });
      }

      if (!result.canceled && result.assets[0]) {
        const avatarUri = result.assets[0].uri;
        updateAvatar(avatarUri);
        Toast.show({
          type: "success",
          text1: "Avatar Updated",
          text2: "Your profile picture has been updated",
        });
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to update avatar. Please try again.",
      });
    }
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
          <TouchableOpacity style={styles.avatar} onPress={onAvatar}>
            {currentUser?.avatar ? (
              <ExpoImage
                source={{ uri: currentUser.avatar }}
                style={styles.avatarImage}
                contentFit="cover"
              />
            ) : (
              <AntDesign name="user" size={40} color="#fff" />
            )}
            <View style={styles.avatarEditIcon}>
              <AntDesign name="camera" size={16} color="#fff" />
            </View>
          </TouchableOpacity>
          <Text style={styles.profileName}>
            {currentUser ? currentUser.email.split("@")[0] : "BMIC User"}
          </Text>
          <Text style={styles.profileEmail}>
            {currentUser ? currentUser.email : "user@bmic.ai"}
          </Text>
          {currentUser && (
            <Text style={styles.memberSince}>
              Member since{" "}
              {new Date(currentUser.createdAt).toLocaleDateString()}
            </Text>
          )}
        </View>

        {/* Profile Options */}
        <View style={styles.optionsContainer}>
          {profileData.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.optionItem}
              onPress={() => onItemPress(item)}
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
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#9810fa",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    position: "relative",
  },
  avatarImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
  },
  avatarEditIcon: {
    position: "absolute",
    bottom: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#3fe0c5",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#000",
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
  memberSince: {
    fontSize: 14,
    color: "#3fe0c5",
    marginTop: 8,
    fontWeight: "500",
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
    gap: 8,
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
