import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './src/MainScreen';
import AddExpenseScreen from './src/AddExpenseScreen';
import ExpenseDetailsScreen from './src/ExpenseDetailsScreen';
import EditExpenseScreen from './src/EditExpenseScreen';
import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';

const Stack = createStackNavigator();

const screenTitles = {
  MainScreen: 'Tổng Chi Tiêu',
  AddExpenseScreen: 'Thêm Mới',
  ExpenseDetailsScreen: 'Thông Tin',
  EditExpenseScreen: 'Chỉnh Sửa',
};

StatusBar.setBackgroundColor('#f7f4f0');

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });

  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // Set up the notification handler
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
  }, []);

  const loadCustomFonts = async () => {
    try {
      await Font.loadAsync({
        'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
      });
      setFontsLoaded(true);
    } catch (error) {
      console.error('Error loading custom fonts:', error);
      // Handle font loading error if needed
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f7f4f0' }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="MainScreen"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#f7f4f0', // Set the background color of the header
            },
            headerTitleStyle: {
              fontFamily: 'Roboto-Bold', // Set the font family for the header title
              fontSize: 20,
              color: '#000',
              fontWeight: 'bold',
              textAlign: 'center',
            },
            headerTitleAlign: 'center', // Center align the header title
            headerBackTitleVisible: false, // Hide the back button title
            headerTintColor: '#000', // Set the color of the back button icon and title
          }}
        >
          <Stack.Screen name="MainScreen" component={MainScreen} options={{ title: 'Tổng chi tiêu' }} />
          <Stack.Screen name="AddExpenseScreen" component={AddExpenseScreen} options={{ title: 'Thêm mới' }} />
          <Stack.Screen name="ExpenseDetailsScreen" component={ExpenseDetailsScreen} options={{ title: 'Thông tin' }} />
          <Stack.Screen name="EditExpenseScreen" component={EditExpenseScreen} options={{ title: 'Chỉnh sửa' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: '#f7f4f0',
  },
});
