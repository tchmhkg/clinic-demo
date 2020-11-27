import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, View, Text, TouchableOpacity, Alert } from "react-native";
import Styled from "styled-components/native";
import CalendarStrip from "react-native-calendar-strip";
import { useNavigation } from "@react-navigation/native";

import Separator from "~/Component/Separator";
import { UserContext } from "~/Context/User";

const Container = Styled.View`
  flex: 1;
  justify-content: center;
  background-color: #fafafa;
`;

const Label = Styled.Text``;

const ListItem = Styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Weekly = ({ data }) => {
  const navigation = useNavigation();
  const { userInfo, logout } = useContext(UserContext);
  const onPressRecord = (id) => {
    navigation.navigate("Record", { id });
  };

  const renderItem = ({ item }) => {
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

  const renderSeparator = () => {
    return <Separator />;
  };

  const renderKeyExtractor = React.useCallback(
    (item) => item?.id?.toString(),
    []
  );

  return (
    <Container>
      <Label>Weekly </Label>
      <CalendarStrip style={{ height: 100 }} />
      <FlatList
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        keyExtractor={renderKeyExtractor}
        // refreshControl={
        //   <RefreshControl
        //     colors={[theme.colors.text]}
        //     refreshing={isRefreshing}
        //     onRefresh={handleRefresh}
        //     tintColor={theme.colors.text}
        //   />
        // }
      />
    </Container>
  );
};

export default Weekly;
