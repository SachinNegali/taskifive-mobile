import {
  BackHandler,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Text, TextInput, Title } from "react-native-paper";
import { useDispatch } from "react-redux";
import { signin, signup } from "../../store/slices/authSlice";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useFocusEffect } from "@react-navigation/native";
import CustomButton from "../../components/CustomButton";
import ModalContainer from "../../components/ModalContainer";
import ExitAppModal from "../../components/ExitAppModal";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../helpers/formValidation";
import { useRouter } from "expo-router";

const Signup = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
  });
  const [signInMode, setSignInMode] = useState(false);
  const { loading, token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    token && router.push("/(stack)/home");
  }, [token]);

  const checkFormIsValid = () => {
    const { name, password, email, rePassword } = user;
    if (
      !validateName(name) &&
      !validateEmail(email) &&
      !validatePassword(password) &&
      rePassword == password
    ) {
      setIsFormValid(true);
    } else setIsFormValid(false);
  };

  useEffect(() => {
    checkFormIsValid();
  }, [user]);

  const handleSignIn = () => {
    const { name, password, email, rePassword } = user;
    if (signInMode) {
      const invalidEmail = validateEmail(email);
      if (invalidEmail) {
        ToastAndroid.show(invalidEmail, ToastAndroid.SHORT);
        return;
      }
      const invalidPass = validatePassword(password);
      if (invalidPass) {
        ToastAndroid.show(invalidPass, ToastAndroid.SHORT);
        return;
      }
      dispatch(signin(user));
    } else {
      const invalidName = validateName(name);
      console.log("seee", invalidName);

      if (invalidName) {
        ToastAndroid.show(invalidName, ToastAndroid.SHORT);
        return;
      }
      const invalidEmail = validateEmail(email);
      if (invalidEmail) {
        ToastAndroid.show(invalidEmail, ToastAndroid.SHORT);
        return;
      }
      const invalidPass = validatePassword(password);
      if (invalidPass) {
        ToastAndroid.show(invalidPass, ToastAndroid.SHORT);
        return;
      }
      if (password !== rePassword) {
        ToastAndroid.show(
          "Password and Confirm Password doesn't match",
          ToastAndroid.SHORT
        );
        return;
      }
      dispatch(signup(user));
    }
  };

  const handleBackPress = () => {
    setOpen(true);
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", handleBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
      };
    }, [])
  );

  return (
    <KeyboardAvoidingView
      style={styles.conatiner}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Title style={styles.title}>
        {signInMode ? "Welcome Back" : "Create Account"}
      </Title>
      {!signInMode && (
        <TextInput
          label="Name"
          value={user.name}
          mode="outlined"
          onChangeText={(text) => setUser({ ...user, name: text })}
        />
      )}
      <TextInput
        label="Email"
        value={user.email}
        mode="outlined"
        onChangeText={(text) => setUser({ ...user, email: text })}
      />
      <TextInput
        label="Password"
        value={user.password}
        mode="outlined"
        secureTextEntry
        onChangeText={(text) => setUser({ ...user, password: text })}
      />

      {!signInMode && (
        <TextInput
          label="Confirm Password"
          value={user.rePassword}
          mode="outlined"
          secureTextEntry
          onChangeText={(text) => setUser({ ...user, rePassword: text })}
        />
      )}

      <CustomButton
        label={signInMode ? "Sign in" : "Sign up"}
        loading={loading}
        onPress={handleSignIn}
        // disabled={!isFormValid}
      />
      <Text style={{ alignSelf: "center", marginTop: 10 }}>
        {signInMode ? "Create an account" : "Already have an account"}
      </Text>
      <CustomButton
        onPress={() => setSignInMode(!signInMode)}
        label={signInMode ? "Create Account" : "Sign In"}
        mode="text"
      />
      <ModalContainer open={open} handleClose={() => setOpen(false)}>
        <ExitAppModal
          onPressYes={() => {
            setOpen(false);
            BackHandler.exitApp();
          }}
          onPressNo={() => setOpen(false)}
        />
      </ModalContainer>
    </KeyboardAvoidingView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  conatiner: {
    margin: 20,
    justifyContent: "flex-end",
    flex: 1,
    gap: 12,
  },
  title: {
    fontWeight: "bold",
    alignSelf: "center",
  },
});
