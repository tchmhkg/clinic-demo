import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {createNativeStackNavigator} from 'react-native-screens/native-stack';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { UserContext } from "~/Context/User";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ResetPassword from "./ResetPassword";
import Consultation from "./Consultation";
import Setting from "./Setting";
import Record from "./Record";
import IconButton from "../Component/IconButton";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const LoginStackNavi = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#0ECD9D",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerBackTitleVisible: false }}
      />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
};

const ConsultationStackNavi = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#0ECD9D",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >   
      <Stack.Screen
        name="Consultation"
        component={Consultation}
        options={{
          headerLeft: () => (
            <IconButton iconName="add" onPress={() => navigation.push('Record')} />
          ),
        }}
      />
      <Stack.Screen
        name="Record"
        component={Record}
        options={{ stackPresentation: "fullScreenModal" }}
      />
    </Stack.Navigator>
  );
};

const SettingStackNavi = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#0ECD9D",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{
          headerTitle: "Setting",
        }}
      />
    </Stack.Navigator>
  );
};

const TabNavi = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#0ECD9D",
      }}
    >
      <Tab.Screen
        name="Consultation"
        component={ConsultationStackNavi}
        options={{
          tabBarLabel: "Consultation",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingStackNavi}
        options={{
          tabBarLabel: "Setting",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="settings" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const MainNavi = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabNavi"
        component={TabNavi}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default () => {
  const { userInfo } = useContext(UserContext);

  return (
    <NavigationContainer>
      {userInfo ? <MainNavi /> : <LoginStackNavi />}
    </NavigationContainer>
  );
};
