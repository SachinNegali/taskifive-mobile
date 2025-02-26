import { StyleSheet } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

interface ButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
  mode?: "contained" | "outlined" | "text";
  disabled?: boolean;
}
const CustomButton = ({
  label,
  onPress,
  mode = "contained",
  loading = false,
  disabled = false,
}: ButtonProps) => {
  return (
    <Button
      onPress={() => !loading && onPress()}
      mode={mode}
      style={[styles.btn, mode == "text" && styles.btnTxt]}
      loading={loading}
      disabled={disabled}
    >
      {label}
    </Button>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btn: {
    borderRadius: 10,
    paddingVertical: 2,
  },
  btnTxt: {
    paddingVertical: 0,
    margin: 0,
  },
});
