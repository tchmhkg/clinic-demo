import React from "react";
import Styled from "styled-components/native";

const Container = Styled.TouchableOpacity`
  border-radius: 50px;
  padding: 10px 16px;
  margin: 5px 8px;
  justify-content: center;
  align-items: center;
  align-self: center;
  background-color: #0ECD9D;
`;
const Label = Styled.Text`
  font-size: 16px;
  color: #ffffff;
`;

const Button = ({ label, onPress, style }) => {
  return (
    <Container onPress={onPress} style={style}>
      <Label>{label}</Label>
    </Container>
  );
};

export default Button;
