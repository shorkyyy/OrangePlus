import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ErrorModal = ({ isVisible, onCancel }) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Icon name="exclamation-circle" size={40} color="#FF6A63" style={styles.errorIcon} />
          <Text style={styles.modalTitle}>Lỗi</Text>
          <Text style={styles.modalMessage}>
            Vui lòng điền đủ thông tin.
          </Text>
          <TouchableOpacity style={styles.okButton} onPress={onCancel}>
            <Text style={styles.okButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  okButton: {
    backgroundColor: '#FF6A63',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  okButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorIcon: {
    marginBottom: 20,
  },
});

export default ErrorModal;
