import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Image as ExpoImage } from "expo-image";
import { useForm, Controller } from "react-hook-form";
import Toast from "react-native-toast-message";
import AppIcon from "../../assets/appIcon.png";
import QuantumMp4 from "../../assets/quanTum.mp4";
import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";
import * as Notifications from "expo-notifications";
import { ROUTES } from "../consts/Routes";
import { useAuthStore } from "../stores/authStore";
import { VideoView, useVideoPlayer } from "expo-video";
import { useEvent } from "expo";

const { width, height } = Dimensions.get("window");

interface AuthScreenProps {
  navigation: any;
}

interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

export default function AuthScreen({ navigation }: AuthScreenProps) {
  const { isSignUp, setSignUpMode, signIn, signUp, emailExists } =
    useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<AuthFormData>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Video player state management
  const videoPlayer = useVideoPlayer(QuantumMp4, (player) => {
    player.loop = true;
    player.muted = true; // Start muted for better UX
  });

  // Track video playing state
  const { isPlaying } = useEvent(videoPlayer, "playingChange", {
    isPlaying: videoPlayer.playing,
  });

  const password = watch("password");

  const handleLetBMIC = () => {
    navigation.replace(ROUTES.MAIN_TABS);
  };

  const onSubmit = (data: AuthFormData) => {
    if (isSignUp) {
      // Sign up logic
      if (data.password !== data.confirmPassword) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Passwords do not match",
        });
        return;
      }

      if (emailExists(data.email)) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Email already exists",
        });
        return;
      }

      const success = signUp(data.email, data.password);
      if (success) {
        // Trigger actions immediately
        setSignUpMode(false);
        reset();
        navigation.replace(ROUTES.MAIN_TABS);

        // Show success toast
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Account created successfully!",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to create account",
        });
      }
    } else {
      // Sign in logic
      const success = signIn(data.email, data.password);
      if (success) {
        // Navigate immediately
        navigation.replace(ROUTES.MAIN_TABS);

        // Show success toast
        Toast.show({
          type: "success",
          text1: "Welcome back!",
          text2: "Sign in successful",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Invalid email or password",
        });
      }
    }
  };

  const toggleAuthMode = () => {
    setSignUpMode(!isSignUp);
    reset();
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

  useEffect(() => {
    videoPlayer.play();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 16 : 20}
      >
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
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
          <View style={styles.videoContainer}>
            <VideoView
              player={videoPlayer}
              style={styles.quantumImage}
              contentFit="contain"
              allowsFullscreen
              allowsPictureInPicture
            />
          </View>

          {/* Auth Form */}
          <View style={styles.authForm}>
            <Text style={styles.authTitle}>
              {isSignUp ? "Create Account" : "Sign In"}
            </Text>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.textInput}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter your email"
                    placeholderTextColor="#666"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                )}
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              )}
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <Controller
                control={control}
                name="password"
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 9,
                    message: "Password must be at least 9 characters",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.textInput}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter your password"
                    placeholderTextColor="#666"
                    secureTextEntry
                  />
                )}
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password.message}</Text>
              )}
            </View>

            {/* Confirm Password Input (only for sign up) */}
            {isSignUp && (
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Confirm Password</Text>
                <Controller
                  control={control}
                  name="confirmPassword"
                  rules={{
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.textInput}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Confirm your password"
                      placeholderTextColor="#666"
                      secureTextEntry
                    />
                  )}
                />
                {errors.confirmPassword && (
                  <Text style={styles.errorText}>
                    {errors.confirmPassword.message}
                  </Text>
                )}
              </View>
            )}

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.letBMICButton}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.buttonText}>
                {isSignUp ? "Sign Up" : "Sign In"}
              </Text>
            </TouchableOpacity>

            {/* Toggle Auth Mode */}
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() => navigation.replace(ROUTES.MAIN_TABS)}
            >
              <Text style={styles.toggleText}>Continue as guest</Text>
            </TouchableOpacity>

            {/* Toggle Auth Mode */}
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={toggleAuthMode}
            >
              <Text style={styles.toggleText}>
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 24,
  },
  logoContainer: {
    alignItems: "center",
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
    height: 200,
    borderRadius: 16,
  },
  authForm: {
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  authTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 8,
    fontWeight: "600",
  },
  textInput: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#333",
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 14,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: "#3fe0c5",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    shadowColor: "#3fe0c5",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  toggleButton: {
    alignItems: "center",
    marginTop: 16,
  },
  toggleText: {
    color: "#3fe0c5",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  descriptionContainer: {},
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
    letterSpacing: 1,
  },
  videoContainer: {
    position: "relative",
    marginVertical: 8,
  },
});
