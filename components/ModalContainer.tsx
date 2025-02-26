import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";
import { Modal, Portal } from "react-native-paper";

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  children: ReactNode;
}
const ModalContainer = ({ open, handleClose, children }: ModalProps) => {
  return (
    <Portal>
      <Modal
        visible={open}
        onDismiss={handleClose}
        contentContainerStyle={styles.modal}
      >
        <View style={styles.thumb} />
        {children}
      </Modal>
    </Portal>
  );
};

export default ModalContainer;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    padding: 16,
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  thumb: {
    width: 24,
    height: 4,
    backgroundColor: "grey",
    borderRadius: 6,
    alignSelf: "center",
    marginBottom: 16,
  },
});
