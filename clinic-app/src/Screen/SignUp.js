import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
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

const CloseButtonWrapper = Styled.View`
  align-items: flex-end;
`;

const Header = Styled.View`
  padding: 40px 20px 0 20px;
`;

const HeaderText = Styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0;
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
  const navigation = useNavigation();
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const formSubmit = async () => {
    const res = await axios.post(config.host + "/api/auth/signup", {
      email: email || "rntrumanx@t.com",
      password: password || "12345678",
      clinicName: clinicName || "rn clinic",
      phoneNumber: phoneNumber || "98765678",
      address: address || "fake address",
    });
    if (res?.data?.success) {
      const loginRes = await login("rntrumanx@t.com", "12345678");
      if (!loginRes?.success) {
        Alert.alert("login failed,", loginRes?.message);
      }
    } else {
      Alert.alert(res?.data?.message);
    }
  };

  const onPressSubmit = () => {
    navigation.pop();
    login();
  };

  const onPressRegister = () => {
    if(!(email && password && phoneNumber && clinicName && address)) {
      Alert.alert("Please complete all fields.");
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
              autoCorrect="none"
              autoCompleteType="off"
              onChangeText={setAddress}
              value={address}
              multiline
            />
          </InputWrapper>
        </Row>
        <ButtonRow>
          <Button label="Submit" onPress={onPressRegister} />
        </ButtonRow>
        {/* <Button label="Submit" onPress={onPressSubmit} /> */}
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
