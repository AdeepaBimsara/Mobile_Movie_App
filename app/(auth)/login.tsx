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
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { icons } from "@/constants/icons";


export default function Login() {

  const [showPassword, setShowPassword] = useState(false);


  return (

    <SafeAreaView
      className="flex-1 bg-slate-950"
      edges={["top"]}
    >

      <KeyboardAvoidingView

        behavior={
          Platform.OS === "ios"
          ? "padding"
          : "height"
        }

        className="flex-1"

      >

        <StatusBar barStyle="light-content" />


        <ScrollView

          showsVerticalScrollIndicator={false}

          keyboardShouldPersistTaps="handled"

          contentContainerStyle={{
            flexGrow:1,
            paddingHorizontal:24,
            paddingTop:60,
            paddingBottom:40
          }}

        >


          {/* Logo */}

          <View className="items-center mb-12">

            <View className="w-24 h-24 rounded-full items-center justify-center">

              <Image
                source={icons.logo}
                className="w-24 h-24"
                resizeMode="contain"
              />

            </View>


            <Text className="text-white text-4xl font-bold mt-5">

              MOVIE HUB

            </Text>


            <Text className="text-slate-400 text-base mt-2">

              Welcome back, enjoy movies

            </Text>


          </View>




          {/* Email */}

          <View className="flex-row items-center bg-slate-900 border border-slate-700 rounded-2xl px-4 h-16 mb-4">


            <Ionicons
              name="mail-outline"
              size={22}
              color="#94A3B8"
            />


            <TextInput

              placeholder="Email"

              placeholderTextColor="#94A3B8"

              keyboardType="email-address"

              autoCapitalize="none"

              className="flex-1 text-white ml-3"

            />


          </View>





          {/* Password */}


          <View className="flex-row items-center bg-slate-900 border border-slate-700 rounded-2xl px-4 h-16 mb-3">


            <Ionicons
              name="lock-closed-outline"
              size={22}
              color="#94A3B8"
            />


            <TextInput

              placeholder="Password"

              placeholderTextColor="#94A3B8"

              secureTextEntry={!showPassword}

              className="flex-1 text-white ml-3"

            />


            <TouchableOpacity

              onPress={() =>
                setShowPassword(!showPassword)
              }

            >

              <Ionicons

                name={
                  showPassword
                  ? "eye-outline"
                  : "eye-off-outline"
                }

                size={22}

                color="#94A3B8"

              />

            </TouchableOpacity>


          </View>





          {/* Forgot Password */}


          <TouchableOpacity

            className="items-end mb-8"

          >

            <Text className="text-violet-400">

              Forgot Password?

            </Text>


          </TouchableOpacity>





          {/* Login Button */}


          <TouchableOpacity

            activeOpacity={0.8}

            style={{
              borderRadius:50,
              overflow:"hidden"
            }}

            onPress={() =>
              router.replace("/(tabs)")
            }

          >

            <LinearGradient

              colors={[
                "#9333EA",
                "#2563EB"
              ]}

              start={{
                x:0,
                y:0
              }}

              end={{
                x:1,
                y:0
              }}

              style={{
                height:60,
                alignItems:"center",
                justifyContent:"center"
              }}

            >

              <Text className="text-white text-lg font-bold">

                Login

              </Text>


            </LinearGradient>


          </TouchableOpacity>





          {/* Register Link */}


          <View className="flex-row justify-center mt-8">


            <Text className="text-slate-400">

              Don't have an account?

            </Text>



            <TouchableOpacity

              onPress={() =>
                router.push("/register")
              }

            >

              <Text className="text-violet-400 font-bold ml-2">

                Create Account

              </Text>

            </TouchableOpacity>


          </View>




        </ScrollView>


      </KeyboardAvoidingView>


    </SafeAreaView>

  );
}