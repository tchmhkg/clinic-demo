import React, { useCallback } from "react";
import { View, Text } from "react-native";
import Styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

import { dollarFormat } from '~/Helper';

const ListItem = Styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const RightCol = Styled.View`
  align-items: flex-end;
`;

const Item = ({ item }) => {
  const navigation = useNavigation();

  const onPressRecord = useCallback(
    (id) => {
      navigation.navigate("Record", { id });
    },
    [navigation]
  );

  return (
    <ListItem key={item.id} onPress={() => onPressRecord(item.id)}>
      <View>
        <Text>Doctor Name: {item?.doctorName}</Text>
        <Text>Patient Name: {item?.patientName}</Text>
      </View>
      <RightCol>
        <Text>{item?.date}</Text>
        <Text>${dollarFormat(item?.consultationFee)}</Text>
      </RightCol>
    </ListItem>
  );
};

export default React.memo(Item);
