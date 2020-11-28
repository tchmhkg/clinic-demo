import React, { useContext } from "react";
import { Platform } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MaterialIcons } from "@expo/vector-icons";
import Styled from "styled-components/native";

import { UserContext } from "~/Context/User";

import { SignIn, SignUp, Consultation, Setting, Record } from "~/Screen";

import { IconButton } from "~/Component/Common";

const HeaderLeftButton = Styled.View`
  flex-direction: row;
  align-items: center;
`;

const HeaderLeftTitle = Styled.Text`
  margin-left: 30px;
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
`;

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
      <Stack.Screen name="Login" component={SignIn} />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerBackTitleVisible: false, headerTitle: "Registration" }}
      />
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
            <HeaderLeftButton>
              <IconButton
                iconName="add"
                color="#ffffff"
                onPress={() => navigation.push("Record")}
              />
              {Platform.OS === "android" ? (
                <HeaderLeftTitle>Consultation</HeaderLeftTitle>
              ) : null}
            </HeaderLeftButton>
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
