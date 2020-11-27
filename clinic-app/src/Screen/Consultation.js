import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, View, Text, TouchableOpacity, Alert } from "react-native";
import Styled from "styled-components/native";
import Separator from "~/Component/Separator";

import Button from "~/Component/Button";
import { UserContext } from "../Context/User";
import { config } from "../Config";

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

const Home = ({ navigation }) => {
  const { userInfo, logout } = useContext(UserContext);
  const [consultations, setConsultations] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      try {
        const res = await axios.get(config.host + "/api/consultations", {
          headers: {
            Authorization: "Bearer " + userInfo?.accessToken,
          },
          params: {
            userId: userInfo?.id,
          },
        });
        // console.log(res?.data);
        if (res?.data?.data) {
          setConsultations(res?.data?.data);
        }
      } catch (err) {
        console.log(err);
        Alert.alert(err?.response?.data?.message, '', [
          { text: "OK", onPress: () => err?.response?.status === 401 ? logout() : {}, style:"cancel" }
        ]);
      }
    });
    return unsubscribe;
  }, [userInfo?.id]);

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
      <Label>consultations page</Label>
      <FlatList
        data={consultations}
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

export default Home;
