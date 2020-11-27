import React, { useContext, useState } from "react";
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import axios from "axios";
import Styled from "styled-components/native";
import Button from "~/Component/Button";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "~/Context/User";
import { config } from "../Config";

const Container = Styled(KeyboardAvoidingView)`
  flex: 1;
`;

const Form = Styled.ScrollView`
  flex: 1;
`;

const Label = Styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
`;

const Input = Styled.TextInput`
  border: 1px solid #b0b0b0;
  padding: 5px;
  min-height: ${(props) => (props.multiline ? "80px" : "40px")};
  font-size: 16px;
`;

const Row = Styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const InputWrapper = Styled.View`
  flex: 1;
  margin-left: ${(props) => (props.needMarginLeft ? "5px" : 0)};
  margin-right: ${(props) => (props.needMarginRight ? "5px" : 0)};
  margin-bottom: 10px;
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

  const formSubmit = async () => {
    const res = await axios.post(config.host + "/api/auth/signup", {
      email,
      password,
      clinicName,
      phoneNumber,
      address,
    });
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
    if(password.length < 8) {
      Alert.alert("Password length must longer than 8 characters!");
      return false;
    }
    if (!password || password !== confirmPassword) {
      Alert.alert("Password & Confirm Password mismatch!");
      return false;
    }
    return true;
  }

  const onPressRegister = () => {
    if (!(email && password && phoneNumber && clinicName && address)) {
      Alert.alert("Please complete all fields.");
      return;
    }
    if (!validateEmail()) {
      Alert.alert("Email format incorrect!");
      return;
    }
    if(!validatePassword()) {
      return;
    }
    if (!password || password !== confirmPassword) {
      Alert.alert("Password & Confirm Password mismatch!");
      return;
    }
    formSubmit();
  };

  return (
    <Container behavior={Platform.OS == "ios" ? "padding" : "height"}>
      <Form contentContainerStyle={styles.scrollView}>
        <Row>
          <InputWrapper>
            <Label>Email</Label>
            <Input
              returnKeyType="done"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
            />
          </InputWrapper>
        </Row>
        <Row>
          <InputWrapper>
            <Label>Password</Label>
            <Input
              returnKeyType="done"
              secureTextEntry
              onChangeText={setPassword}
              value={password}
            />
          </InputWrapper>
        </Row>
        <Row>
          <InputWrapper>
            <Label>Confirm Password</Label>
            <Input
              secureTextEntry
              returnKeyType="done"
              onChangeText={setConfirmPassword}
              value={confirmPassword}
            />
          </InputWrapper>
        </Row>
        <Row>
          <InputWrapper>
            <Label>Clinic Name</Label>
            <Input
              returnKeyType="done"
              onChangeText={setClinicName}
              value={clinicName}
            />
          </InputWrapper>
        </Row>
        <Row>
          <InputWrapper>
            <Label>Phone Number</Label>
            <Input
              returnKeyType="done"
              keyboardType="phone-pad"
              onChangeText={setPhoneNumber}
              value={phoneNumber}
            />
          </InputWrapper>
        </Row>
        <Row>
          <InputWrapper>
            <Label>Address</Label>
            <Input
              autoCompleteType="off"
              onChangeText={setAddress}
              value={address}
              multiline
              textAlignVertical="top"
            />
          </InputWrapper>
        </Row>
        <ButtonRow>
          <Button label="Submit" onPress={onPressRegister} />
        </ButtonRow>
      </Form>
    </Container>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    padding: 15,
  },
});

export default SignUp;
