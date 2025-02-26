import { getUser, getUserToken } from "@/helpers/secureStorage";
import { setCredentials } from "@/store/slices/authSlice";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useDispatch } from "react-redux";

export default function CustomSplashScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const checkUserInfo = async () => {
    try {
      const user = await getUser();
      const token = await getUserToken();
      if (user && token) {
        dispatch(setCredentials({ user, token }));
        router.push("/(stack)/home");
      } else {
        router.push("/(stack)/signup");
      }
    } catch (error) {
      console.log("Error fetching user info:", error);
      router.push("/(stack)/signup");
    }
  };
  useEffect(() => {
    checkUserInfo();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={"small"} />
    </View>
  );
}
