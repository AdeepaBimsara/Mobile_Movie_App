import { View, Text, TouchableOpacity, Alert } from "react-native";

import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { getCurrentUser, logoutUser } from "@/services/authService";
import { router } from "expo-router";

const Profile = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    console.log("loadUser called");

    const currentUser = await getCurrentUser();

    console.log("PROFILE USER:", currentUser);

    setUser(currentUser);
  };

  const getInitials = (name: string) => {
    const words = name.split(" ");

    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }

    return words[0][0].toUpperCase();
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          try {
            await logoutUser();
            router.replace("/welcome");
          } catch (error) {
            console.log(error);
            Alert.alert("Error", "Logout failed");
          }
        },
      },
    ]);
  };

  return (
    <View className="flex-1 bg-slate-950 px-6 pt-14">
      {/* Profile Card */}

      <LinearGradient
        colors={["#1e1b4b", "#0f172a"]}

        style={{
          marginTop: 32,
          borderRadius: 24,
          padding: 24,
          borderWidth: 1,
          borderColor: "#1e293b",
        }}
      >
        {/* Logout Button */}

        <TouchableOpacity
          activeOpacity={0.8}

          style={{
            position: "absolute",
            right: 20,
            top: 10,
            width: 45,
            height: 45,
            borderRadius: 25,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={24} color="white" />
        </TouchableOpacity>

        <View className="items-center">
          {/* Avatar */}

          <View className="w-28 h-28 rounded-full bg-violet-600 items-center justify-center border-4 border-purple-400">
            {/* <Ionicons name="person" size={55} color="white" /> */}
            <Text className="text-white text-4xl font-bold">
              {user?.name ? getInitials(user.name) : "U"}
            </Text>
          </View>

          <Text className="text-white text-2xl font-bold mt-5">
            {user?.name || "Movie Lover"}
          </Text>

          <Text className="text-slate-400 mt-1">
            {user?.email || "Loading..."}
          </Text>

          {/* Premium Badge */}

          <View className="flex-row items-center bg-purple-500/20 px-5 py-2 rounded-full mt-5">
            <Ionicons name="star" size={18} color="#facc15" />

            <Text className="text-purple-300 ml-2 font-semibold">
              Cinema Member
            </Text>
          </View>
        </View>

        {/* Edit Button */}

        <TouchableOpacity className="mt-6 bg-slate-800 rounded-full h-14 items-center justify-center flex-row bottom-2">
          <Ionicons name="create-outline" size={20} color="#c084fc" />

          <Text className="text-white font-semibold ml-2 ">Edit Profile</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Settings Section */}

      <Text className="text-white text-xl font-bold mt-8 mb-4">Settings</Text>

      <View>
        {/* Account */}

        <TouchableOpacity className="flex-row items-center bg-slate-900 rounded-2xl p-5 mb-3">
          <View className="w-12 h-12 bg-purple-500/20 rounded-full items-center justify-center">
            <Ionicons name="person-outline" size={24} color="#c084fc" />
          </View>

          <View className="ml-4">
            <Text className="text-white text-lg font-semibold">Account</Text>

            <Text className="text-slate-400">Personal information</Text>
          </View>

          <Ionicons
            name="chevron-forward"

            size={22}

            color="#64748b"

            style={{
              marginLeft: "auto",
            }}
          />
        </TouchableOpacity>

        {/* Notifications */}

        <TouchableOpacity className="flex-row items-center bg-slate-900 rounded-2xl p-5 mb-3">
          <View className="w-12 h-12 bg-blue-500/20 rounded-full items-center justify-center">
            <Ionicons name="notifications-outline" size={24} color="#60a5fa" />
          </View>

          <View className="ml-4">
            <Text className="text-white text-lg font-semibold">
              Notifications
            </Text>

            <Text className="text-slate-400">Movie updates and alerts</Text>
          </View>

          <Ionicons
            name="chevron-forward"

            size={22}

            color="#64748b"

            style={{
              marginLeft: "auto",
            }}
          />
        </TouchableOpacity>

        {/* Privacy */}

        <TouchableOpacity className="flex-row items-center bg-slate-900 rounded-2xl p-5">
          <View className="w-12 h-12 bg-green-500/20 rounded-full items-center justify-center">
            <Ionicons
              name="shield-checkmark-outline"
              size={24}
              color="#4ade80"
            />
          </View>

          <View className="ml-4">
            <Text className="text-white text-lg font-semibold">Privacy</Text>

            <Text className="text-slate-400">
              Security and privacy settings
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"

            size={22}

            color="#64748b"

            style={{
              marginLeft: "auto",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
