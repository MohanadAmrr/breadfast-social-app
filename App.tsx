import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import SplashScreen from "./src/screens/SplashScreen";
import PostsScreen from "./src/screens/PostsScreen";
import { RootStackParamList } from "./src/types/types";
import PostDetailsScreen from "./src/screens/PostsDetailsScreen";

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider style={{ backgroundColor: "#fee8f9" }}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Posts" component={PostsScreen} />
            <Stack.Screen name="PostDetails" component={PostDetailsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
