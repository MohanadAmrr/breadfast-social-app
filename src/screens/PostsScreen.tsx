import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Post, User, PostsScreenNavigationProp } from "../types/types";
import BreadfastLogo from "../../assets/breadfastlogo.png";

const PostsScreen: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<PostsScreenNavigationProp>();

  const fetchData = async () => {
    try {
      const [postsResponse, usersResponse] = await Promise.all([
        axios.get("https://gorest.co.in/public/v2/posts"),
        axios.get("https://gorest.co.in/public/v2/users"),
      ]);

      setPosts(postsResponse.data);
      setUsers(usersResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const renderPostCard = ({ item }: { item: Post }) => {
    const randomUser = users[Math.floor(Math.random() * users.length)];

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate("PostDetails", { post: item, user: randomUser })
        }
      >
        <View style={styles.userInfo}>
          <Image
            source={{ uri: `https://i.pravatar.cc/150?u=${item.user_id}` }}
            style={styles.avatar}
          />
          <Text style={styles.userName}>
            {randomUser ? randomUser.name : "User"}
          </Text>
          <View style={styles.logoContainer}>
            <Image
              source={BreadfastLogo}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.content} numberOfLines={2}>
          {item.body}
        </Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#AA0082" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPostCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fee8f9",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  logoContainer: {
    marginLeft: "auto",
  },
  logo: {
    width: 60,
    height: 25,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    color: "#666",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fee8f9",
  },
});

export default PostsScreen;
