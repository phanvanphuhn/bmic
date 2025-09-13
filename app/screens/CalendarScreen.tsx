import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import AntDesign from "@expo/vector-icons/AntDesign";

const { width } = Dimensions.get("window");

const CalendarScreen = () => {
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const goToPreviousYear = () => {
    setCurrentYear((prev) => prev - 1);
  };

  const goToNextYear = () => {
    setCurrentYear((prev) => prev + 1);
  };

  const scrollToCurrentMonth = () => {
    const currentMonth = new Date().getMonth();
    const monthHeight = 280; // Approximate height of each month container
    const headerHeight = 80; // Approximate height of header
    const scrollPosition = currentMonth * monthHeight + headerHeight;

    setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        y: scrollPosition + 200,
        animated: true,
      });
    }, 100);
  };

  useEffect(() => {
    if (isInitialLoad && currentYear === new Date().getFullYear()) {
      scrollToCurrentMonth();
      setIsInitialLoad(false);
    }
  }, [isInitialLoad, currentYear]);

  const renderMonth = (monthIndex: number) => {
    const monthName = months[monthIndex];
    const daysInMonth = getDaysInMonth(currentYear, monthIndex);
    const firstDay = getFirstDayOfMonth(currentYear, monthIndex);

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.dayCell} />);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        currentYear === new Date().getFullYear() &&
        monthIndex === new Date().getMonth() &&
        day === new Date().getDate();

      days.push(
        <TouchableOpacity
          key={day}
          style={[styles.dayCell, isToday && styles.todayCell]}
        >
          <Text style={[styles.dayText, isToday && styles.todayText]}>
            {day}
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <View key={monthIndex} style={styles.monthContainer}>
        <Text style={styles.monthTitle}>{monthName}</Text>

        {/* Days of week header */}
        <View style={styles.weekHeader}>
          {daysOfWeek.map((day) => (
            <Text key={day} style={styles.weekDayText}>
              {day}
            </Text>
          ))}
        </View>

        {/* Calendar grid */}
        <View style={styles.calendarGrid}>{days}</View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { marginBottom: -insets.bottom }]}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.navButton} onPress={goToPreviousYear}>
          <AntDesign name="left" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.yearTitle}>{currentYear}</Text>

        <TouchableOpacity style={styles.navButton} onPress={goToNextYear}>
          <AntDesign name="right" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Calendar for each month */}
        {months.map((_, index) => renderMonth(index))}
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
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#18181b",
    alignItems: "center",
    justifyContent: "center",
  },
  yearTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  monthContainer: {
    marginBottom: 32,
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
    textAlign: "center",
  },
  weekHeader: {
    flexDirection: "row",
    marginBottom: 8,
  },
  weekDayText: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
    color: "#71717b",
    paddingVertical: 8,
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#18181b",
    borderRadius: 12,
    padding: 8,
  },
  dayCell: {
    width: (width - 48) / 7, // 7 days per week, accounting for padding
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 2,
  },
  todayCell: {
    backgroundColor: "#3fe0c5",
    borderRadius: 20,
  },
  dayText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
  todayText: {
    color: "#000",
    fontWeight: "bold",
  },
});

export default CalendarScreen;
