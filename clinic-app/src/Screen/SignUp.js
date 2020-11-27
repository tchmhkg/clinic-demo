import React, { useContext, useState } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import axios from "axios";
import Styled from "styled-components/native";
import Button from "~/Component/Button";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "~/Context/User";
import { config } from "../Config";

const Container = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Label = Styled.Text``;

const SignUp = () => {
  const navigation = useNavigation();
  const { login } = useContext(UserContext);

  const formSubmit = async () => {
    const res = await axios.post(config.host + '/api/auth/signup', {
        email: 'rntrumanx@t.com',
        password: '12345678',
        clinicName: 'rn clinic',
        phoneNumber: '98765678',
        address: 'fake address',
    });
    // console.log(res?.data);
    console.log(res?.data?.message);
    if(res?.data?.success) {
        const loginRes = await login('rntrumanx@t.com', '12345678');
        if(!loginRes?.success) {
            Alert.alert('login failed,',loginRes?.message);
        }
    } else {
        Alert.alert(res?.data?.message);
    }
  }

  const onPressSubmit = () => {
    navigation.pop();
    login();
  };

  const onPressRegister = () => {
      formSubmit();
  }

  return (
    <Container>
      <Label>This is SignUp Screen</Label>
      <Button label="Register" onPress={onPressRegister} />
      <Button label="Submit" onPress={onPressSubmit} />
    </Container>
  );
};

export default SignUp;
