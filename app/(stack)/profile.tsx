import { SafeAreaView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Paragraph, Title } from "react-native-paper";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import CustomButton from "../../components/CustomButton";
import { removeUser, removeUserToken } from "../../helpers/secureStorage";
import { logout } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";
import ModalContainer from "../../components/ModalContainer";
import ResetPassword from "../../components/ResetPassword";
import ConfirmLogoutModal from "../../components/ConfirmLogoutModal";
import { useRouter } from "expo-router";

const Profile = () => {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openLogoutModal, setOpenLogoutModa] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const onPressLogout = async () => {
    try {
      setLoading(true);
      await removeUserToken();
      await removeUser();
      await dispatch(logout());
      router.push("/(stack)/signup");
      setLoading(false);
      setOpenLogoutModa(false);
    } catch (error) {
      console.log("error Logging out");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.details}>
        <Title style={{ fontWeight: "bold" }}>Profile</Title>
        <Paragraph>{user?.name}</Paragraph>
        <Paragraph>{user?.email}</Paragraph>
      </View>

      <View style={styles.btnWrap}>
        <View style={{ flex: 0.3 }}>
          <CustomButton
            label="Logout"
            onPress={() => setOpenLogoutModa(true)}
            mode="outlined"
            loading={loading}
          />
        </View>
        <View style={{ flex: 0.7 }}>
          <CustomButton label="Reset Password" onPress={() => setOpen(true)} />
        </View>
      </View>
      <ModalContainer open={open} handleClose={() => setOpen(false)}>
        <ResetPassword onComplete={() => setOpen(false)} />
      </ModalContainer>
      <ModalContainer
        open={openLogoutModal}
        handleClose={() => setOpenLogoutModa(false)}
      >
        <ConfirmLogoutModal
          onPressNo={() => setOpenLogoutModa(false)}
          onPressYes={onPressLogout}
          loading={loading}
        />
      </ModalContainer>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  details: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  btnWrap: {
    flexDirection: "row",
    gap: 10,
    margin: 10,
  },
});
