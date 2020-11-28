import React from "react";
import Styled from "styled-components/native";

import * as IconSets from "@expo/vector-icons";

const Container = Styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
`;
const IconButton = ({ iconFamily = 'MaterialIcons', iconName, color = 'black', onPress, size = 24 }) => {
  const IconFamilyComponent = IconSets[iconFamily];
  return (
    <Container onPress={onPress}>
      <IconFamilyComponent name={iconName} color={color} size={size} />
    </Container>
  );
};

export default IconButton;
