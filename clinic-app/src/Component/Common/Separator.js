import React from "react";
import Styled from "styled-components/native";

const Separator = Styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #b0b0b0;
`;

export default React.memo(() => {
  return <Separator />;
});
