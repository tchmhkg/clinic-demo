import React, { useContext, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import Styled from "styled-components/native";

import Button from "~/Component/Common/Button";
import Input from "~/Component/Common/Input";
import FormContainer from "~/Component/Common/FormContainer";
import { UserContext } from "~/Context/User";

const Label = Styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
`;

const Row = Styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SignUpRemarkWrapper = Styled.View`
  border-top-width: 1px;
  border-color: #b0b0b0;
  padding: 10px 15px 0 15px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const SignIn = ({ navigation }) => {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState("hqclinic@truman.com");
  const [password, setPassword] = useState("hq@1234");

  const onPressLogin = async () => {
    if (email && password) {
      const res = await login(email, password);
      // console.log(res);
      if (!res?.success) {
        Alert.alert(res?.message);
      }
    }
  };

  return (
    <FormContainer>
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button label="Login" onPress={onPressLogin} />
      <SignUpRemarkWrapper>
        <Label>Don't have an account?</Label>
      </SignUpRemarkWrapper>
      <Button
        label="Register Now"
        onPress={() => navigation.navigate("SignUp")}
      />
    </FormContainer>
  );
};

export default SignIn;
