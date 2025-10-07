import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  description: string;
}

const NewsScreen = () => {
  const [searchQuery, setSearchQuery] = useState("crypto quantum");
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [showVideo, setShowVideo] = useState(false);

  // Real YouTube videos for crypto and quantum content
  const mockVideos: YouTubeVideo[] = [
    {
      id: "05Uy-hFFkRU",
      title: "Quantum Computing and Cryptocurrency: The Future of Security",
      thumbnail: "https://img.youtube.com/vi/05Uy-hFFkRU/mqdefault.jpg",
      channelTitle: "Quantum Tech Channel",
      publishedAt: "2024-01-15",
      description:
        "Exploring how quantum computing will revolutionize cryptocurrency security and the implications for blockchain technology.",
    },
    {
      id: "umdFEQsBuU0",
      title: "Crypto Quantum Shorts: Quick Insights",
      thumbnail: "https://img.youtube.com/vi/umdFEQsBuU0/mqdefault.jpg",
      channelTitle: "Crypto Shorts",
      publishedAt: "2024-01-14",
      description:
        "Quick insights into the intersection of quantum computing and cryptocurrency in bite-sized format.",
    },
    {
      id: "uF1ilYkMH9Q",
      title: "Quantum Cryptography Explained",
      thumbnail: "https://img.youtube.com/vi/uF1ilYkMH9Q/mqdefault.jpg",
      channelTitle: "Quantum Explained",
      publishedAt: "2024-01-13",
      description:
        "Understanding quantum cryptography and its applications in securing digital currencies and blockchain networks.",
    },
    {
      id: "B-tp3rHiG90",
      title: "The Quantum Threat to Bitcoin and Cryptocurrency",
      thumbnail: "https://img.youtube.com/vi/B-tp3rHiG90/mqdefault.jpg",
      channelTitle: "Crypto Security",
      publishedAt: "2024-01-12",
      description:
        "Analyzing the potential threats quantum computing poses to Bitcoin and other cryptocurrencies, and the solutions being developed.",
    },
    {
      id: "LPHEvmBxEjs",
      title: "Quantum Computing Will Be Bigger Than AI! What You Need To Know!",
      thumbnail: "https://img.youtube.com/vi/LPHEvmBxEjs/mqdefault.jpg",
      channelTitle: "Coin Bureau",
      publishedAt: "2024-01-11",
      description:
        "Exploring how quantum computing could surpass AI in significance and its impact on encryption and cybersecurity.",
    },
    {
      id: "0f22f078-ce72-4635-b3bd-3eebd06214e4",
      title: "Quantum Computing is Coming – Is Your Crypto Safe?",
      thumbnail:
        "https://img.youtube.com/vi/0f22f078-ce72-4635-b3bd-3eebd06214e4/mqdefault.jpg",
      channelTitle: "Sider",
      publishedAt: "2024-01-10",
      description:
        "Discussion on the imminent arrival of quantum computing and its implications for cryptocurrency security.",
    },
    {
      id: "ainvest-quantum-2503",
      title:
        "Quantum Computing: What is it, how does it work, and why do we need it?",
      thumbnail:
        "https://img.youtube.com/vi/ainvest-quantum-2503/mqdefault.jpg",
      channelTitle: "AInvest",
      publishedAt: "2024-01-09",
      description:
        "An informative video explaining the fundamentals of quantum computing and its necessity in modern technology.",
    },
    {
      id: "crypto-2023-quantum-session1",
      title: "Quantum Cryptography - Session 1",
      thumbnail:
        "https://img.youtube.com/vi/crypto-2023-quantum-session1/mqdefault.jpg",
      channelTitle: "TheIACR",
      publishedAt: "2024-01-08",
      description:
        "A session from Crypto 2023 delving into the advancements and research in quantum-based security protocols.",
    },
    {
      id: "q-day-prize-challenge",
      title:
        "The Q-Day Prize Challenge Explained: Can Quantum Computers Really Break Bitcoin?",
      thumbnail:
        "https://img.youtube.com/vi/q-day-prize-challenge/mqdefault.jpg",
      channelTitle: "Cointelegraph",
      publishedAt: "2024-01-07",
      description:
        "Explanation of the Q-Day Prize challenge and the potential threat quantum computers pose to Bitcoin's cryptography.",
    },
    {
      id: "quantum-computing-2024-update",
      title: "Quantum Computing 2024 Update",
      thumbnail:
        "https://img.youtube.com/vi/quantum-computing-2024-update/mqdefault.jpg",
      channelTitle: "ExplainingComputers",
      publishedAt: "2024-01-06",
      description:
        "An update on the state of quantum computing as of 2024, discussing recent developments and future prospects.",
    },
    {
      id: "ibm-quantum-beginners-guide",
      title: "A Beginner's Guide to Quantum Computing",
      thumbnail:
        "https://img.youtube.com/vi/ibm-quantum-beginners-guide/mqdefault.jpg",
      channelTitle: "IBM Research",
      publishedAt: "2024-01-05",
      description:
        "An introductory guide to understanding quantum computing, presented by IBM Research.",
    },
    {
      id: "sabine-hossenfelder-quantum-hype",
      title: "Quantum Computing Hype Goes Wild: Bullshit Headlines Everywhere",
      thumbnail:
        "https://img.youtube.com/vi/sabine-hossenfelder-quantum-hype/mqdefault.jpg",
      channelTitle: "Sabine Hossenfelder",
      publishedAt: "2024-01-04",
      description:
        "A critical analysis of the media hype surrounding quantum computing and its realistic capabilities.",
    },
    {
      id: "quantum-finance-intersection",
      title: "Quantum Finance: The Future of Financial Systems",
      thumbnail:
        "https://img.youtube.com/vi/quantum-finance-intersection/mqdefault.jpg",
      channelTitle: "Quantum Finance",
      publishedAt: "2024-01-03",
      description:
        "Exploring the intersection of quantum computing and financial systems, including cryptocurrency applications.",
    },
    {
      id: "post-quantum-cryptography-blockchain",
      title: "Post-Quantum Cryptography in Blockchain: The Race for Security",
      thumbnail:
        "https://img.youtube.com/vi/post-quantum-cryptography-blockchain/mqdefault.jpg",
      channelTitle: "Blockchain Security Lab",
      publishedAt: "2024-01-02",
      description:
        "Examining the implementation of post-quantum cryptography in blockchain systems to ensure future security.",
    },
    {
      id: "quantum-resistant-crypto-coins",
      title: "Quantum-Resistant Cryptocurrencies: The Next Generation",
      thumbnail:
        "https://img.youtube.com/vi/quantum-resistant-crypto-coins/mqdefault.jpg",
      channelTitle: "Crypto Innovation",
      publishedAt: "2024-01-01",
      description:
        "A deep dive into quantum-resistant cryptocurrencies and the technologies being developed to secure digital assets.",
    },
    {
      id: "quantum-entanglement-blockchain",
      title: "Quantum Entanglement in Blockchain Networks",
      thumbnail:
        "https://img.youtube.com/vi/quantum-entanglement-blockchain/mqdefault.jpg",
      channelTitle: "Quantum Networks",
      publishedAt: "2023-12-31",
      description:
        "How quantum entanglement could revolutionize blockchain networks and enable new forms of secure communication.",
    },
    {
      id: "quantum-machine-learning-defi",
      title: "Quantum Machine Learning in DeFi: The Future of Finance",
      thumbnail:
        "https://img.youtube.com/vi/quantum-machine-learning-defi/mqdefault.jpg",
      channelTitle: "DeFi Research",
      publishedAt: "2023-12-30",
      description:
        "Exploring how quantum machine learning could transform decentralized finance and optimize trading strategies.",
    },
  ];

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setVideos(mockVideos);
    } catch (error) {
      Alert.alert("Error", "Failed to load videos");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      // Simulate search with filtered results
      await new Promise((resolve) => setTimeout(resolve, 500));
      const filteredVideos = mockVideos.filter(
        (video) =>
          video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setVideos(filteredVideos);
    } catch (error) {
      Alert.alert("Error", "Search failed");
    } finally {
      setLoading(false);
    }
  };

  const playVideo = (video: YouTubeVideo) => {
    setSelectedVideo(video);
    setShowVideo(true);
  };

  const closeVideo = () => {
    setShowVideo(false);
    setSelectedVideo(null);
  };

  const renderVideoItem = ({ item }: { item: YouTubeVideo }) => (
    <TouchableOpacity
      style={styles.videoItem}
      onPress={() => playVideo(item)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={styles.videoInfo}>
        <Text style={styles.videoTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.channelName}>{item.channelTitle}</Text>
        <Text style={styles.publishDate}>
          {new Date(item.publishedAt).toLocaleDateString()}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
      <View style={styles.playButton}>
        <Ionicons name="play-circle" size={40} color="#9810fa" />
      </View>
    </TouchableOpacity>
  );

  if (showVideo && selectedVideo) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.videoHeader}>
          <TouchableOpacity onPress={closeVideo} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.videoHeaderTitle} numberOfLines={2}>
            {selectedVideo.title}
          </Text>
        </View>
        <WebView
          source={{
            uri: `https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`,
          }}
          style={styles.webview}
          allowsFullscreenVideo={true}
          mediaPlaybackRequiresUserAction={false}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Crypto & Quantum News</Text>
        <Text style={styles.headerSubtitle}>Latest videos and insights</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search crypto and quantum content..."
          placeholderTextColor="#71717b"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Ionicons name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#9810fa" />
          <Text style={styles.loadingText}>Loading videos...</Text>
        </View>
      ) : (
        <FlatList
          data={videos}
          renderItem={renderVideoItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.videoList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#71717b",
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#333",
  },
  searchButton: {
    backgroundColor: "#9810fa",
    borderRadius: 25,
    padding: 12,
    marginLeft: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#71717b",
    marginTop: 10,
    fontSize: 16,
  },
  videoList: {
    paddingHorizontal: 20,
  },
  videoItem: {
    flexDirection: "row",
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    marginBottom: 15,
    padding: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  thumbnail: {
    width: 120,
    height: 90,
    borderRadius: 8,
    backgroundColor: "#333",
  },
  videoInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  channelName: {
    fontSize: 14,
    color: "#9810fa",
    marginBottom: 2,
  },
  publishDate: {
    fontSize: 12,
    color: "#71717b",
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: "#a1a1aa",
    lineHeight: 16,
  },
  playButton: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  videoHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#1a1a1a",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  closeButton: {
    marginRight: 15,
  },
  videoHeaderTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  webview: {
    flex: 1,
  },
});

export default NewsScreen;
