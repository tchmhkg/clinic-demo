import React, { useContext } from "react";
import Styled from "styled-components/native";
import Button from "~/Component/Common/Button";
import Container from "~/Component/Common/Container";
import SettingRow from "~/Component/SettingRow";
import { UserContext } from "~/Context/User";

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
    <Container canScroll>
      <SettingRow label="Clinic Name" value={userInfo?.clinicName} />
      <SettingRow label="Email" value={userInfo?.email} />
      <SettingRow label="Phone Number" value={userInfo?.phoneNumber} />
      <SettingRow label="Address" value={userInfo?.address} />
      <ButtonRow>
        <Button label="Logout" onPress={logout} />
      </ButtonRow>
    </Container>
  );
};

export default Setting;
