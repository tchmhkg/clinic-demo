import React, { useContext } from "react";
import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Styled from "styled-components/native";
import Button from "../Component/Button";
import { UserContext } from "../Context/User";

const Container = Styled.View`
  flex: 1;
  justify-content: center;
  background-color: #fafafa;
`;

const Row = Styled.View`
  flex: 1;
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

const ButtonRow = Styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 0 0 10px 0;
  min-height: 50px;
`;

const Setting = () => {
  const { userInfo, logout } = useContext(UserContext);
  return (
    <Container>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Row>
          <ItemLabel>Clinic Name:</ItemLabel>
          <ItemText>{userInfo?.clinicName}</ItemText>
        </Row>
        <Row>
          <ItemLabel>Email:</ItemLabel>
          <ItemText>{userInfo?.email}</ItemText>
        </Row>
        <Row>
          <ItemLabel>Phone Number:</ItemLabel>
          <ItemText>{userInfo?.phoneNumber}</ItemText>
        </Row>
        <Row>
          <ItemLabel>Address:</ItemLabel>
          <ItemText>{userInfo?.address}</ItemText>
        </Row>
        <ButtonRow>
          <Button label="Logout" onPress={logout} />
        </ButtonRow>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  settingItemRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scrollView: {
    padding: 15,
  },
});

export default Setting;
