import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { icons } from "@/constants/icons";
import { registerUser } from "@/services/authService";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      await registerUser(name, email, password);
      console.log("save register");

      router.push("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-950" edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}

        className="flex-1"
      >
        <StatusBar barStyle="light-content" />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
            paddingTop: 40,
            paddingBottom: 40,
          }}
        >
          {/* Logo */}
          <View className="items-center mb-10">
            <View className="w-24 h-24 rounded-full items-center justify-center">
              <Image source={icons.logo} />
            </View>

            <Text className="text-white text-4xl font-bold mt-5">
              MOVIE HUB
            </Text>

            <Text className="text-slate-400 text-base mt-2">
              Create your account
            </Text>
          </View>

          {/* Full Name */}
          <View className="flex-row items-center bg-slate-900 border border-slate-700 rounded-2xl px-4 h-16 mb-4">
            <Ionicons name="person-outline" size={22} color="#94A3B8" />

            <TextInput
              placeholder="Full Name"
              placeholderTextColor="#94A3B8"
              className="flex-1 text-white ml-3"
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Email */}
          <View className="flex-row items-center bg-slate-900 border border-slate-700 rounded-2xl px-4 h-16 mb-4">
            <Ionicons name="mail-outline" size={22} color="#94A3B8" />

            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#94A3B8"
              keyboardType="email-address"
              autoCapitalize="none"
              className="flex-1 text-white ml-3"
            />
          </View>

          {/* Password */}
          <View className="flex-row items-center bg-slate-900 border border-slate-700 rounded-2xl px-4 h-16 mb-4">
            <Ionicons name="lock-closed-outline" size={22} color="#94A3B8" />

            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#94A3B8"
              secureTextEntry={!showPassword}
              className="flex-1 text-white ml-3"
            />

            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={22}
                color="#94A3B8"
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password */}
          <View className="flex-row items-center bg-slate-900 border border-slate-700 rounded-2xl px-4 h-16 mb-8">
            <Ionicons
              name="shield-checkmark-outline"
              size={22}
              color="#94A3B8"
            />

            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#94A3B8"
              secureTextEntry={!showConfirm}
              className="flex-1 text-white ml-3"
            />

            <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
              <Ionicons
                name={showConfirm ? "eye-outline" : "eye-off-outline"}
                size={22}
                color="#94A3B8"
              />
            </TouchableOpacity>
          </View>

          {/* Register Button */}

          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              borderRadius: 50,
              overflow: "hidden",
            }}
            onPress={handleRegister}
          >
            <LinearGradient
              colors={["#9333EA", "#2563EB"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                height: 70,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* <Text className="text-white text-lg font-bold">
                Create Account
              </Text> */}

              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text className="text-white text-lg font-bold">
                  Create Account
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Login Link */}
          <View className="flex-row justify-center mt-8">
            <Text className="text-slate-400">Already have an account?</Text>

            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text className="text-violet-400 font-bold ml-2">Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
