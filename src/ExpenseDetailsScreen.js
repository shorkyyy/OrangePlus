import React, { useState }  from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Change 'FontAwesome5' to the desired icon set
import DeleteConfirmationModal from './DeleteConfirmationModal';

const ExpenseDetailsScreen = ({ route, navigation }) => {
  const { expense, handleUpdateExpense} = route.params; // get handleUpdateExpense from params
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  
  const iconMap = {
    'Mua Sắm': 'shopping-basket',
    'Mua Hàng Online': 'globe',
    'Ăn Uống': 'utensils',
    'Thú Cưng': 'paw',
    'Khác' : 'ellipsis-h',
    // Add more descriptions and icons as needed...
  };

  // Function to format the amount with "." as a thousand separator and add "đ" for VND
  function formatAmount(amount) {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }

  // Function to format the date to "dd/mm/yyyy" format
  function formatDate(date) {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }

  const descriptionIcon = iconMap[expense.description] || 'question-circle';

  // Function to handle the edit button press
  const handleEditExpense = () => {
    navigation.navigate('EditExpenseScreen', {
      expense,
      handleUpdateExpense, // Pass the handleUpdateExpense function to EditExpenseScreen
      icon: descriptionIcon, // Pass the icon to EditExpenseScreen
    });
  };

  // Function to handle the delete button press
  const handleDeleteButton = () => {
     setShowDeleteModal(true);
  };

  const handleDelete = () => {
    setShowDeleteModal(false);
    navigation.navigate('MainScreen', { expenseId: expense.id });
 };
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {/* Icon for expense */}
        <FontAwesome5 name={descriptionIcon} size={40} color="#fff" />
      </View>
      <Text style={styles.expenseTitle}>{expense.title}</Text>
      <Text style={styles.expenseDescription}>{expense.description}</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.detailsRow}>
          <FontAwesome5 name="money-bill-wave" size={20} color="#77b777" />
          <Text style={styles.detailsLabel}>Số Tiền:</Text>
          <Text style={styles.detailsValue}>{formatAmount(expense.amount)}</Text>
        </View>
        <View style={styles.detailsRow}>
          <FontAwesome5 name="calendar" size={20} color="#77b777" />
          <Text style={[styles.detailsLabel, styles.detailsLabelText]}>Ngày:</Text>
          <Text style={[styles.detailsValue, styles.detailsValueText]}>{formatDate(expense.date)}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={handleEditExpense}>
          <FontAwesome5 name="edit" size={20} color="#fff" />
          <Text style={styles.buttonText}>Sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteButton}>
          <FontAwesome5 name="trash" size={20} color="#fff" />
          <Text style={styles.buttonText}>Xoá</Text>
        </TouchableOpacity>
      </View>
      <DeleteConfirmationModal
        isVisible={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onDelete={handleDelete}
        expense={expense}
        error={null} // Pass null as the error prop since we don't have an error here
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f4f0',
    padding: 16,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#77b777',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
  },
  expenseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#77b777',
    marginBottom: 8,
    textAlign: 'center',
  },
  expenseDescription: {
    fontSize: 18,
    marginBottom: 16,
    color: '#777',
    textAlign: 'center',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
    marginTop: 7,
  },
  detailsLabel: {
    marginLeft: 8,
    fontSize: 18,
    color: '#555',
  },
  detailsLabelText: {
    lineHeight: 18, // Set the line height to match the font size
  },
  detailsValue: {
    fontSize: 18,
    marginTop: 10,
    marginLeft: 'auto', // Push the value to the right side of the row
  },
  detailsValueText: {
    lineHeight: 18, // Set the line height to match the font size
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  editButton: {
    backgroundColor: '#77b777',
    paddingHorizontal: 57,
    paddingVertical: 16,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,

  },
  deleteButton: {
    backgroundColor: '#FF6A63',
    paddingHorizontal: 57,
    paddingVertical: 16,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',

  },
  buttonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ExpenseDetailsScreen;
