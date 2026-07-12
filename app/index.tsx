import { useEffect } from "react";
import { router } from "expo-router";
import { getCurrentUser } from "@/services/authService";

export default function Index() {

  useEffect(() => {

    const checkUser = async () => {

      const user = await getCurrentUser();

      if (user) {
        router.replace("/(tabs)");
      } else {
        router.replace("/welcome");
      }

    };

    checkUser();

  }, []);

  return null;
}