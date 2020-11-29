import React, { useContext, useState } from "react";
import { Alert } from "react-native";
import Styled from "styled-components/native";

import { Button, Input, FormContainer, Spinner } from "~/Component/Common";
import { UserContext } from "~/Context/User";

const Label = Styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onPressLogin = async () => {
    if (email && password) {
      setLoading(true);
      const res = await login(email, password);
      // console.log(res);
      if (!res?.success) {
        Alert.alert(res?.message);
      }
      setLoading(false);
    } else {
      Alert.alert("Email & Password cannot empty.");
    }
  };

  return (
    <>
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
    {loading ? (
      <Spinner />
    ) : null}
    </>
  );
};

export default SignIn;
