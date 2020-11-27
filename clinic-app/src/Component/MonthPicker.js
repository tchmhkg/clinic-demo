import React from "react";
import Styled from "styled-components/native";
import moment from "moment";
import IconButton from "~/Component/IconButton";

const Container = Styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

const MonthText = Styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const MonthPicker = ({
  date,
  onPressPrev = () => {},
  onPressNext = () => {},
}) => {
  return (
    <Container>
      <IconButton
        iconFamily="SimpleLineIcons"
        iconName="arrow-left"
        onPress={onPressPrev}
        size={16}
      />
      <MonthText>{moment(date, 'YYYY-MM').format('MMMM YYYY')}</MonthText>
      <IconButton
        iconFamily="SimpleLineIcons"
        iconName="arrow-right"
        onPress={onPressNext}
        size={16}
      />
    </Container>
  );
};

export default MonthPicker;
