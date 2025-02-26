import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native-paper";
import { getUser, getUserToken } from "../../helpers/secureStorage";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setCredentials } from "../../store/slices/authSlice";
import { AppDispatch } from "../../store/store";
import { ScreenNavigationProp } from "../../types/navigationTypes";

const SplashScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<ScreenNavigationProp>();

  const getUserInfo = async () => {
    try {
      const user = await getUser();
      const token = await getUserToken();
      if (user && token) {
        dispatch(setCredentials({ user: user, token }));
        navigation.navigate("Home");
      } else {
        navigation.navigate("Signup");
      }
    } catch (error) {
      console.log("Error fetching user info:", error);
      navigation.navigate("Signup");
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size={"small"} />
      {/* <Text>...</Text> */}
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
