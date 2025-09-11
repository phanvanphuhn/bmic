import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

interface HeaderProps {
  title: string;
  onBackPress: () => void;
  titleColor?: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  onBackPress,
  titleColor = "#fff",
}) => {
  return (
    <View style={[styles.row, styles.spaceBetween, { margin: 16 }]}>
      <TouchableOpacity onPress={onBackPress}>
        <AntDesign name="left" size={24} color="white" />
      </TouchableOpacity>

      <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
      <View style={{ width: 24 }} />
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Header;
