import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import AntDesign from "@expo/vector-icons/AntDesign";

const { width } = Dimensions.get("window");

// BMIC Roadmap events based on https://bmic.ai/
// We anchor events at representative dates within roadmap quarters.
const ROADMAP_EVENTS: Array<{
  id: string;
  title: string;
  description: string;
  date: Date;
}> = [
  {
    id: "p1-alpha-infra",
    title: "Phase 1: Build core AI & QML infrastructure",
    description: "Foundation work for AI and quantum ML infrastructure.",
    date: new Date(2024, 9, 15), // Oct 15, 2024 (Q4 2024)
  },
  {
    id: "p1-alpha-testnet",
    title: "Alpha testnet launch - compute jobs",
    description: "Alpha testnet enabling compute jobs is available.",
    date: new Date(2024, 11, 10), // Dec 10, 2024
  },
  {
    id: "p1-whitepaper-token",
    title: "Whitepaper v1 and token launch",
    description: "Initial whitepaper and token launch in early 2025.",
    date: new Date(2025, 0, 20), // Jan 20, 2025 (Q1 2025)
  },
  {
    id: "p1-seed-funding",
    title: "Arrangement of seed funding rounds",
    description: "Seed rounds arranged to support growth.",
    date: new Date(2025, 2, 5), // Mar 5, 2025
  },
  {
    id: "p2-dev-onboarding",
    title: "Phase 2: Developer onboarding",
    description: "Onboard developers to expand the ecosystem.",
    date: new Date(2025, 3, 15), // Apr 15, 2025 (Q2 2025)
  },
  {
    id: "p2-beta-marketplace",
    title: "Beta compute marketplace live",
    description: "Beta marketplace for compute goes live.",
    date: new Date(2025, 5, 20), // Jun 20, 2025
  },
  {
    id: "p2-partners",
    title: "Expand partner networking",
    description: "Strategic partner network expansion.",
    date: new Date(2025, 6, 25), // Jul 25, 2025 (Q3 start)
  },
  {
    id: "p2-nft-access",
    title: "NFT-based access live",
    description: "NFTs enable priority job scheduling on nodes.",
    date: new Date(2025, 8, 1), // Sep 1, 2025 (late Q3)
  },
  {
    id: "p3-mainnet-launch",
    title: "Phase 3: Mainnet launch",
    description: "Mainnet compute nodes and staking come online.",
    date: new Date(2025, 10, 15), // Nov 15, 2025 (Q4 2025)
  },
  {
    id: "p3-governance",
    title: "Decentralized governance integration",
    description: "On-chain governance integrated into the protocol.",
    date: new Date(2026, 0, 20), // Jan 20, 2026 (Q1 2026)
  },
  {
    id: "p3-staking",
    title: "Mainnet compute nodes are staking",
    description: "Staking enabled for mainnet compute nodes.",
    date: new Date(2026, 2, 5), // Mar 5, 2026
  },
  {
    id: "p4-optimization",
    title: "Phase 4: Optimization & global expansion",
    description: "Global node expansion and hybrid AI-quantum services.",
    date: new Date(2026, 4, 1), // May 1, 2026 (ongoing anchor)
  },
];

const CalendarScreen = () => {
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);
  const [ui, setUi] = useState({
    currentYear: new Date().getFullYear(),
    isInitialLoad: true,
    modalVisible: false,
    selectedEventIndex: -1,
    pendingScrollMonth: -1,
    selectedModalDateKey: "",
  });

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
    setUi((prev) => ({ ...prev, currentYear: prev.currentYear - 1 }));
  };

  const goToNextYear = () => {
    setUi((prev) => ({ ...prev, currentYear: prev.currentYear + 1 }));
  };

  const scrollToMonth = (monthIndex: number) => {
    const month = Math.max(0, Math.min(11, monthIndex));
    const monthHeight = 280; // Approximate height of each month container
    const headerHeight = 80; // Approximate height of header
    const scrollPosition = month * monthHeight + headerHeight;

    setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        y: scrollPosition + 50,
        animated: true,
      });
    }, 100);
  };

  const scrollToCurrentMonth = () => {
    scrollToMonth(new Date().getMonth());
  };

  const events = useMemo(() => {
    return [...ROADMAP_EVENTS].sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
  }, []);

  const eventDayMap = useMemo(() => {
    const map = new Map<string, number[]>();
    events.forEach((evt, idx) => {
      const key = `${evt.date.getFullYear()}-${evt.date.getMonth()}-${evt.date.getDate()}`;
      const arr = map.get(key) ?? [];
      arr.push(idx);
      map.set(key, arr);
    });
    return map;
  }, [events]);

  const findNearestUpcomingEventIndex = () => {
    const now = Date.now();
    const idx = events.findIndex((e) => e.date.getTime() >= now);
    return idx === -1 ? events.length - 1 : idx;
  };

  useEffect(() => {
    if (ui.isInitialLoad) {
      const nextIdx = findNearestUpcomingEventIndex();
      const nextEvent = events[nextIdx];
      setUi((prev) => ({
        ...prev,
        isInitialLoad: false,
        currentYear: nextEvent
          ? nextEvent.date.getFullYear()
          : new Date().getFullYear(),
        selectedEventIndex: nextIdx,
        pendingScrollMonth: nextEvent
          ? nextEvent.date.getMonth()
          : new Date().getMonth(),
      }));
    }
  }, [ui.isInitialLoad, events]);

  useEffect(() => {
    if (ui.pendingScrollMonth >= 0) {
      scrollToMonth(ui.pendingScrollMonth);
      setUi((prev) => ({ ...prev, pendingScrollMonth: -1 }));
    }
  }, [ui.pendingScrollMonth]);

  const renderMonth = (monthIndex: number) => {
    const monthName = months[monthIndex];
    const daysInMonth = getDaysInMonth(ui.currentYear, monthIndex);
    const firstDay = getFirstDayOfMonth(ui.currentYear, monthIndex);

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.dayCell} />);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        ui.currentYear === new Date().getFullYear() &&
        monthIndex === new Date().getMonth() &&
        day === new Date().getDate();

      const key = `${ui.currentYear}-${monthIndex}-${day}`;
      const eventIndexes = eventDayMap.get(key) ?? [];
      const hasEvent = eventIndexes.length > 0;
      const isSelectedEventDay =
        ui.selectedEventIndex >= 0 &&
        events[ui.selectedEventIndex] &&
        events[ui.selectedEventIndex].date.getFullYear() === ui.currentYear &&
        events[ui.selectedEventIndex].date.getMonth() === monthIndex &&
        events[ui.selectedEventIndex].date.getDate() === day;

      const onPress = () => {
        if (!hasEvent) return;
        // default to first event that day
        setUi((prev) => ({
          ...prev,
          modalVisible: true,
          selectedEventIndex: eventIndexes[0],
          selectedModalDateKey: key,
        }));
      };

      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.dayCell,
            hasEvent && styles.eventCell,
            isSelectedEventDay && styles.selectedEventCell,
            isToday && styles.todayCell,
          ]}
          onPress={onPress}
          activeOpacity={hasEvent ? 0.7 : 1}
        >
          <Text
            style={[
              styles.dayText,
              hasEvent && styles.eventText,
              isSelectedEventDay && styles.selectedEventText,
              isToday && styles.todayText,
            ]}
          >
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

        <Text style={styles.yearTitle}>{ui.currentYear}</Text>

        <TouchableOpacity style={styles.navButton} onPress={goToNextYear}>
          <AntDesign name="right" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Event navigation */}
      <View style={styles.eventNavBar}>
        <TouchableOpacity
          style={[styles.eventNavButton, { marginRight: 8 }]}
          onPress={() => {
            if (events.length === 0) return;
            setUi((prev) => {
              const nextIdx =
                prev.selectedEventIndex <= 0
                  ? events.length - 1
                  : prev.selectedEventIndex - 1;
              const evt = events[nextIdx];
              const needsYearChange =
                evt.date.getFullYear() !== prev.currentYear;
              return {
                ...prev,
                selectedEventIndex: nextIdx,
                currentYear: evt.date.getFullYear(),
                pendingScrollMonth: evt.date.getMonth(),
                modalVisible: true,
                selectedModalDateKey: `${evt.date.getFullYear()}-${evt.date.getMonth()}-${evt.date.getDate()}`,
              };
            });
          }}
        >
          <Text style={styles.eventNavText}>Prev Event</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.eventNavButton}
          onPress={() => {
            if (events.length === 0) return;
            setUi((prev) => {
              const nextIdx =
                prev.selectedEventIndex >= events.length - 1
                  ? 0
                  : prev.selectedEventIndex + 1;
              const evt = events[nextIdx];
              return {
                ...prev,
                selectedEventIndex: nextIdx,
                currentYear: evt.date.getFullYear(),
                pendingScrollMonth: evt.date.getMonth(),
                modalVisible: true,
                selectedModalDateKey: `${evt.date.getFullYear()}-${evt.date.getMonth()}-${evt.date.getDate()}`,
              };
            });
          }}
        >
          <Text style={styles.eventNavText}>Next Event</Text>
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

      {/* Event modal */}
      <Modal
        visible={ui.modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() =>
          setUi((prev) => ({ ...prev, modalVisible: false }))
        }
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            {(() => {
              if (ui.selectedEventIndex < 0) return null;
              const focusedEvent = events[ui.selectedEventIndex];
              const [year, month, day] = [
                focusedEvent.date.getFullYear(),
                focusedEvent.date.getMonth(),
                focusedEvent.date.getDate(),
              ];
              const key = `${year}-${month}-${day}`;
              const indexes = eventDayMap.get(key) ?? [ui.selectedEventIndex];
              return (
                <View>
                  <Text style={styles.modalTitle}>
                    {`${year}-${String(month + 1).padStart(2, "0")}-${String(
                      day
                    ).padStart(2, "0")}`}
                  </Text>
                  {indexes.map((idx) => (
                    <View key={events[idx].id} style={styles.modalEventItem}>
                      <Text style={styles.modalEventTitle}>
                        {events[idx].title}
                      </Text>
                      <Text style={styles.modalEventDesc}>
                        {events[idx].description}
                      </Text>
                    </View>
                  ))}
                </View>
              );
            })()}

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#18181b" }]}
                onPress={() =>
                  setUi((prev) => ({ ...prev, modalVisible: false }))
                }
              >
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#3fe0c5" }]}
                onPress={() => {
                  if (events.length === 0) return;
                  setUi((prev) => {
                    const nextIdx =
                      prev.selectedEventIndex >= events.length - 1
                        ? 0
                        : prev.selectedEventIndex + 1;
                    const evt = events[nextIdx];
                    return {
                      ...prev,
                      selectedEventIndex: nextIdx,
                      currentYear: evt.date.getFullYear(),
                      pendingScrollMonth: evt.date.getMonth(),
                      selectedModalDateKey: `${evt.date.getFullYear()}-${evt.date.getMonth()}-${evt.date.getDate()}`,
                    };
                  });
                }}
              >
                <Text style={[styles.modalButtonText, { color: "#000" }]}>
                  Next
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  eventNavBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },
  eventNavButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#18181b",
    borderRadius: 8,
  },
  eventNavText: {
    color: "#fff",
    fontWeight: "600",
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
  eventCell: {
    backgroundColor: "#0f172a",
    borderRadius: 8,
  },
  selectedEventCell: {
    backgroundColor: "#1e293b",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#3fe0c5",
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
  eventText: {
    color: "#cbd5e1",
  },
  selectedEventText: {
    color: "#d1fae5",
    fontWeight: "700",
  },
  todayText: {
    color: "#000",
    fontWeight: "bold",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalCard: {
    width: "100%",
    backgroundColor: "#111827",
    borderRadius: 12,
    padding: 16,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },
  modalEventItem: {
    marginBottom: 12,
    backgroundColor: "#0b1220",
    borderRadius: 8,
    padding: 12,
  },
  modalEventTitle: {
    color: "#3fe0c5",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  modalEventDesc: {
    color: "#cbd5e1",
    fontSize: 14,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  modalButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 8,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
});

export default CalendarScreen;
