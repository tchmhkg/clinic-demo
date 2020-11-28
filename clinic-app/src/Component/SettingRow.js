import React from "react";
import Styled from "styled-components/native";

const Row = Styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  margin: 0 0 10px 0;
  min-height: 50px;
  flex-wrap: wrap;
`;

const ItemLabel = Styled.Text`
  font-size: 16px;
  font-weight: bold;
  flex: 1;
`;

const ItemText = Styled.Text`
  font-size: 16px;
  text-align: right;
  flex: 1;
`;

const SettingRow = ({label ='', value = ''}) => {
  return (
      <Row>
        <ItemLabel>{label}</ItemLabel>
        <ItemText>{value}</ItemText>
      </Row>
  );
};


export default React.memo(SettingRow);
