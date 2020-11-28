import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
} from "react-native";
import Styled from "styled-components/native";

import Button from "~/Component/Button";
import { UserContext } from "~/Context/User";

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
    <Container behavior={Platform.OS == "ios" ? "padding" : "height"}>
      <Form contentContainerStyle={styles.scrollView}>
        <InputWrapper>
          <Label>Email:</Label>
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="off"
            onChangeText={setEmail}
            value={email}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>Password:</Label>
          <Input
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="off"
            onChangeText={setPassword}
            value={password}
          />
        </InputWrapper>
        <Button label="Login" onPress={onPressLogin} />
        <SignUpRemarkWrapper>
          <Label>Don't have an account?</Label>
        </SignUpRemarkWrapper>
        <Button label="Register Now" onPress={() => navigation.navigate("SignUp")} />
      </Form>
    </Container>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    padding: 15,
    justifyContent: "center",
  },
});

export default SignIn;
