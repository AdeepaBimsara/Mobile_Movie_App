import { View, Text, ImageBackground, TouchableOpacity } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Animated, Easing } from "react-native";

import { useEffect, useRef } from "react";

export default function Home() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),

      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View className="flex-1">
      <ImageBackground
        source={require("../assets/images/home.png")}
        resizeMode="cover"
        style={{
          flex: 1,
        }}
      >
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.7)", "rgba(0,0,0,1)"]}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 30,
          }}
        >
          <Animated.Text
            style={{
              color: "white",
              fontSize: 45,
              fontWeight: "bold",
              letterSpacing: 4,

              opacity: fadeAnim,

              transform: [
                {
                  translateY: slideAnim,
                },
              ],
            }}
          >
            MOVIE HUB
          </Animated.Text>

          <View
            style={{
              width: 80,
              height: 4,
              backgroundColor: "#9333EA",
              borderRadius: 20,
              marginTop: 15,
            }}
          />

          <Animated.Text
            style={{
              color: "#ddd",
              textAlign: "center",
              fontSize: 16,
              marginTop: 25,
              lineHeight: 24,

              opacity: fadeAnim,

              transform: [
                {
                  translateY: slideAnim,
                },
              ],
            }}
          >
            Discover thousands of movies, explore amazing stories and enjoy your
            favorite cinema experience.
          </Animated.Text>

          <Animated.View
            style={{
              width: "100%",
              marginTop: 40,
              transform: [
                {
                  scale: scaleAnim,
                },
              ],
            }}
          >
            <TouchableOpacity
              onPress={() => router.push("/(tabs)")}

              style={{
                width: "100%",
                marginTop: 40,
                borderRadius: 50,
                overflow: "hidden",
              }}

              className="top-60"
            >
              <LinearGradient
                colors={["#9333EA", "#2563EB"]}

                style={{
                  height: 65,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: "700",
                  }}
                >
                  Explore Cinema
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}
