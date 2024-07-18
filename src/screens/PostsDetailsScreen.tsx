import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import axios from "axios";
import { RootStackParamList, Post, User, Comment } from "../types/types";
import BreadfastLogo from "../../assets/breadfastlogo.png";

type PostDetailsScreenRouteProp = RouteProp<RootStackParamList, "PostDetails">;

type Props = {
  route: PostDetailsScreenRouteProp;
};

const PostDetailsScreen: React.FC<Props> = ({ route }) => {
  const { post, user } = route.params;
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `https://gorest.co.in/public/v2/posts/${post.id}/comments`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [post.id]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchComments();
  };

  const renderCommentItem = ({ item }: { item: Comment }) => (
    <View style={styles.commentCard} testID="comment-item">
      <View style={styles.commentHeader}>
        <Image
          source={{ uri: `https://i.pravatar.cc/150?u=${item.id}` }}
          style={styles.commentAvatar}
        />
        <Text style={styles.commentName}>{item.name}</Text>
        <Image
          source={BreadfastLogo}
          style={styles.commentLogo}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.commentBody}>{item.body}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#AA0082" />
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={
        <>
          <View style={styles.postContainer}>
            <View style={styles.userInfo}>
              <Image
                source={{ uri: `https://i.pravatar.cc/150?u=${user.id}` }}
                style={styles.avatar}
              />
              <Text style={styles.userName}>{user.name}</Text>
              <Image
                source={BreadfastLogo}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.postTitle}>{post.title}</Text>
            <Text style={styles.postBody}>{post.body}</Text>
          </View>
          <View style={styles.separator}>
            <View style={styles.separatorLine} />
            <View style={styles.separatorCircle} />
            <View style={styles.separatorLine} />
          </View>
        </>
      }
      data={comments}
      renderItem={renderCommentItem}
      keyExtractor={(item) => item.id.toString()}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListEmptyComponent={
        <View style={styles.emptyComments}>
          <Text>No comments yet.</Text>
        </View>
      }
    />
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
    backgroundColor: "#fee8f9",
  },
  postContainer: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 16,
    marginHorizontal: 16,
    marginTop: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  logo: {
    width: 60,
    height: 25,
  },
  postTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  postBody: {
    fontSize: 16,
    marginBottom: 16,
  },
  commentsHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  commentCard: {
    backgroundColor: "#ffffff",
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    marginHorizontal: 16,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  commentName: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  commentLogo: {
    width: 40,
    height: 20,
  },
  commentBody: {
    fontSize: 14,
  },
  emptyComments: {
    padding: 16,
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginHorizontal: 16,
  },
  separator: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 16,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#AA0082",
  },
  separatorCircle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#AA0082",
    marginHorizontal: 10,
  },
});

export default PostDetailsScreen;
