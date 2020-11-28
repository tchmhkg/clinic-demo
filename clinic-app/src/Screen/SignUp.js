import React, { useContext, useState } from "react";
import { Alert } from "react-native";
import axios from "axios";
import Styled from "styled-components/native";

import { Button, Input, FormContainer, Spinner } from "~/Component/Common";

import { UserContext } from "~/Context/User";
import { config } from "~/Config";

const Row = Styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ButtonRow = Styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 0 0 10px 0;
`;

const SignUp = () => {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const formSubmit = async () => {
    setLoading(true);
    const res = await axios.post(config.host + "/api/auth/signup", {
      email,
      password,
      clinicName,
      phoneNumber,
      address,
    });
    setLoading(false);
    if (res?.data?.success) {
      const loginRes = await login(email, password);
      if (!loginRes?.success) {
        Alert.alert("login failed,", loginRes?.message);
      }
    } else {
      Alert.alert(res?.data?.message);
    }
  };

  const validateEmail = () => {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      return true;
    }
    return false;
  };

  const validatePassword = () => {
    if (password.length < 8) {
      Alert.alert("Password length must longer than 8 characters!");
      return false;
    }
    if (!password || password !== confirmPassword) {
      Alert.alert("Password & Confirm Password mismatch!");
      return false;
    }
    return true;
  };

  const onPressRegister = () => {
    if (!(email && password && phoneNumber && clinicName && address)) {
      Alert.alert("Please complete all fields.");
      return;
    }
    if (!validateEmail()) {
      Alert.alert("Email format incorrect!");
      return;
    }
    if (!validatePassword()) {
      return;
    }
    if (!password || password !== confirmPassword) {
      Alert.alert("Password & Confirm Password mismatch!");
      return;
    }
    formSubmit();
  };

  return (
    <>
    <FormContainer>
      <Row>
        <Input
          label="Email"
          value={email}
          keyboardType="email-address"
          onChangeText={setEmail}
        />
      </Row>
      <Row>
        <Input
          label="Password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
      </Row>
      <Row>
        <Input
          label="Confirm Password"
          value={confirmPassword}
          secureTextEntry
          onChangeText={setConfirmPassword}
        />
      </Row>
      <Row>
        <Input
          label="Clinic Name"
          value={clinicName}
          onChangeText={setClinicName}
        />
      </Row>
      <Row>
        <Input
          label="Phone Number"
          value={phoneNumber}
          keyboardType="phone-pad"
          onChangeText={setPhoneNumber}
        />
      </Row>
      <Row>
        <Input
          label="Address"
          value={address}
          multiline
          onChangeText={setAddress}
        />
      </Row>
      <ButtonRow>
        <Button label="Submit" onPress={onPressRegister} />
      </ButtonRow>
    </FormContainer>
    {loading ? (
        <Spinner />
      ) : null}
    </>
  );
};

export default SignUp;
