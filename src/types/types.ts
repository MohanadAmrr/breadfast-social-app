// src/types/types.ts or src/types/types.d.ts

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type Post = {
    id: number;
    user_id: number;
    title: string;
    body: string;
  };
  
  export type User = {
    id: number;
    name: string;
    email: string;
    gender: string;
    status: string;
  };
  
  export type Comment = {
    id: number;
    post_id: number;
    name: string;
    email: string;
    body: string;
  };
  
  export type RootStackParamList = {
    Splash: undefined;
    Posts: undefined;
    PostDetails: { post: Post; user: User };
  };

export type PostsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Posts'>;
export type PostDetailsRouteProp = RouteProp<RootStackParamList, 'PostDetails'>;