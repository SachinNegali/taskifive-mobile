import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { IconButton, MD3Colors, TextInput, Title } from "react-native-paper";
import CustomButton from "./CustomButton";
import { resetPassword } from "../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useSelector } from "react-redux";

interface Props {
  onComplete: () => void;
}
const ResetPassword = ({ onComplete }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);
  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: "",
    newPassword: "",
    reNewPassword: "",
  });

  const handleResetPassword = async () => {
    await dispatch(resetPassword(passwordInfo)).unwrap();
    onComplete();
  };
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Title style={styles.title}>Reset Password</Title>
        <IconButton
          icon="close"
          size={24}
          iconColor={MD3Colors.primary0}
          onPress={onComplete}
          style={{ alignSelf: "center" }}
        />
      </View>
      <TextInput
        label="Old Password"
        value={passwordInfo.currentPassword}
        mode="outlined"
        secureTextEntry
        onChangeText={(text) =>
          setPasswordInfo({ ...passwordInfo, currentPassword: text })
        }
      />
      <TextInput
        label="New Password"
        value={passwordInfo.newPassword}
        mode="outlined"
        secureTextEntry
        onChangeText={(text) =>
          setPasswordInfo({ ...passwordInfo, newPassword: text })
        }
      />

      <TextInput
        label="Confirm New Password"
        value={passwordInfo.reNewPassword}
        mode="outlined"
        secureTextEntry
        onChangeText={(text) =>
          setPasswordInfo({ ...passwordInfo, reNewPassword: text })
        }
      />
      <CustomButton
        label="Reset Password"
        onPress={handleResetPassword}
        loading={loading}
      />
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  title: {
    fontWeight: "bold",
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
