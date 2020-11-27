import React, { useContext, useState } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import Styled from "styled-components/native";

import Button from "~/Component/Button";
import { UserContext } from "~/Context/User";

const Container = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Label = Styled.Text`
  color: #000000;
`;

const ButtonContainer = Styled.View`
  flex-direction: row;
  margin-top: 20px;
`;

const SignIn = ({ navigation }) => {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState("hqclinic@truman.com");
  const [password, setPassword] = useState("hq@1234");

  const onPressLogin = async () => {
    if (email && password) {
      console.log('login');
      const res = await login(email, password);
      console.log(res);
      if (!res?.success) {
        Alert.alert(res?.data?.message);
      }
    }
  };

  return (
    <Container>
      <Label>This is SignIn Screen</Label>
      <View>
        <Text>Email:</Text>
        <TextInput
          style={{ borderWidth: 1, padding: 5 }}
          autoCapitalize="none"
          autoCorrect={false}
          autoCompleteType="off"
          onChangeText={setEmail}
          value={email}
        />
      </View>
      <View>
        <Text>Password:</Text>
        <TextInput
          style={{ borderWidth: 1, padding: 5 }}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          autoCompleteType="off"
          onChangeText={setPassword}
          value={password}
        />
      </View>
      <ButtonContainer>
        <Button label="SignIn" onPress={onPressLogin} />
        <Button label="SignUp" onPress={() => navigation.navigate("SignUp")} />
      </ButtonContainer>
    </Container>
  );
};

export default SignIn;
