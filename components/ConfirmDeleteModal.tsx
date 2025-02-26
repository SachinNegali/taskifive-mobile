import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import { IconButton, MD3Colors, Title } from "react-native-paper";

interface Props {
  onPressYes: () => void;
  onPressNo: () => void;
  loading: boolean;
}
const ConfirmDeleteModal = ({
  onPressNo,
  onPressYes,
  loading = false,
}: Props) => {
  return (
    <View style={styles.conatiner}>
      <View style={styles.row}>
        <Title style={styles.title}>Are you sure?</Title>
        <IconButton
          icon="close"
          size={24}
          iconColor={MD3Colors.primary0}
          onPress={onPressNo}
          style={{ alignSelf: "center" }}
        />
      </View>
      <Text>This is a child component inside the modal!</Text>
      <View style={styles.buttonRow}>
        <View style={{ flex: 0.3 }}>
          <CustomButton
            label="Yes"
            onPress={onPressYes}
            mode="outlined"
            loading={loading}
          />
        </View>
        <View style={{ flex: 0.7 }}>
          <CustomButton label="No" onPress={onPressNo} />
        </View>
      </View>
    </View>
  );
};

export default ConfirmDeleteModal;

const styles = StyleSheet.create({
  conatiner: {
    gap: 10,
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    alignSelf: "center",
  },
});
