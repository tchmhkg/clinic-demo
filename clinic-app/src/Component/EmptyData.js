import React from "react";
import Styled from "styled-components/native";

const EmptyDataContainer = Styled.View`
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

const EmptyDataText = Styled.Text`
  font-size: 20px;
`;
export default React.memo(() => {
  return (
    <EmptyDataContainer>
      <EmptyDataText>No Data</EmptyDataText>
    </EmptyDataContainer>
  );
});
