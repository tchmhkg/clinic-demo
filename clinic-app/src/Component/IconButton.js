import React from "react";
import Styled from "styled-components/native";

import { MaterialIcons } from "@expo/vector-icons";

const Container = Styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
`;
const IconButton = ({ iconName, color = 'white', onPress, size = 24 }) => {
  return (
    <Container onPress={onPress}>
      <MaterialIcons name={iconName} color={color} size={size} />
    </Container>
  );
};

export default IconButton;
