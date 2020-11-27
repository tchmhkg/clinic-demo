import React, { useCallback } from "react";
import { View, Text } from "react-native";
import Styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const ListItem = Styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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
      <View>
        <Text>${item?.consultationFee}</Text>
      </View>
    </ListItem>
  );
};

export default Item;
