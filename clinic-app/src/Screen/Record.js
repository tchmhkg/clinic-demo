import axios from "axios";
import moment from "moment";
import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  Switch,
  Platform,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import Styled from "styled-components/native";
import { useNavigation, useRoute } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";

import Button from "~/Component/Common/Button";
import Input from "~/Component/Common/Input";
import IconButton from "~/Component/Common/IconButton";
import Spinner from "~/Component/Common/Spinner";

import { UserContext } from "~/Context/User";
import { config } from "~/Config";

const Container = Styled(KeyboardAvoidingView)`
  flex: 1;
`;

const Form = Styled.ScrollView`
  flex: 1;
`;

const CloseButtonWrapper = Styled.View`
  align-items: flex-end;
`;

const Header = Styled.View`
  padding: 40px 20px 0 20px;
`;

const HeaderText = Styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0;
`;

const Label = Styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
`;

const StyledInput = Styled.TextInput`
  border: 1px solid #b0b0b0;
  padding: 5px;
  min-height: ${(props) => (props.multiline ? "80px" : "40px")};
  font-size: 16px;
`;

const DateTimeWrapper = Styled(TouchableOpacity)`
  border: 1px solid #b0b0b0;
  padding: 5px;
  min-height: 40px;
  justify-content: center;
  background-color: #ffffff;
`;

const DateTimeText = Styled.Text`
  font-size: 16px;
`;

const Row = Styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ButtonRow = Styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 0 0 10px 0;
`;

const Record = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id: consultationId } = route?.params || "";
  const { userInfo, logout } = useContext(UserContext);
  const [doctorName, setDoctorName] = useState("");
  const [patientName, setPatientName] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [medication, setMedication] = useState("");
  const [consultationFee, setConsultationFee] = useState("");
  const [date, setDate] = useState(new Date());
  const [dateString, setDateString] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [time, setTime] = useState(moment().format("HH:mm"));
  const [followUp, setFollowUp] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getConsultation = async () => {
      try {
        setLoading(true);
        const res = await axios.get(config.host + "/api/consultations", {
          headers: {
            Authorization: "Bearer " + userInfo?.accessToken,
          },
          params: {
            id: consultationId,
            userId: userInfo?.id,
          },
        });
        if (res?.data?.data) {
          const record = res?.data?.data;
          setReadOnly(true);
          setDoctorName(record?.doctorName);
          setPatientName(record?.patientName);
          setDiagnosis(record?.diagnosis);
          setMedication(record?.medication);
          setConsultationFee(record?.consultationFee?.toString());
          setDateString(record?.date);
          setTime(record?.time);
          setFollowUp(record?.followUp);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        Alert.alert(err?.response?.data?.message, "", [
          {
            text: "OK",
            onPress: () =>
              err?.response?.status === 401 ? logout() : navigation.pop(),
            style: "cancel",
          },
        ]);
      }
    };
    if (consultationId) {
      getConsultation();
    }
  }, [consultationId]);

  const toggleFollowUp = () => setFollowUp((prev) => !prev);

  const onPressSubmit = () => {
    if (
      !(
        doctorName &&
        patientName &&
        diagnosis &&
        medication &&
        consultationFee &&
        dateString &&
        time
      )
    ) {
      Alert.alert("Please complete all fields");
      return;
    }
    submitForm();
  };

  const submitForm = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        config.host + "/api/consultations",
        {
          userId: userInfo?.id,
          doctorName,
          patientName,
          diagnosis,
          medication,
          consultationFee,
          date: dateString,
          time,
          followUp,
        },
        {
          headers: {
            Authorization: "Bearer " + userInfo?.accessToken,
          },
        }
      );
      setLoading(false);
      Alert.alert(res?.data?.message, "", [
        {
          text: "OK",
          onPress: () => (res?.data?.success ? navigation.pop() : {}),
          style: "cancel",
        },
      ]);
    } catch (err) {
      console.log(err);
      setLoading(false);
      Alert.alert(err?.response?.data?.message, "", [
        {
          text: "OK",
          onPress: () => (err?.response?.status === 401 ? logout() : {}),
          style: "cancel",
        },
      ]);
    }
  };
  const onPressClose = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  const onChangeDateTime = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    if (mode === "date") {
      setDateString(moment(currentDate).format("YYYY-MM-DD"));
    } else {
      setTime(moment(currentDate).format("HH:mm"));
    }
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    if (mode === "date" && show) {
      setShow(false);
      return;
    }
    showMode("date");
  };

  const showTimepicker = () => {
    if (mode === "time" && show) {
      setShow(false);
      return;
    }
    showMode("time");
  };

  return (
    <>
    <Container behavior={Platform.OS == "ios" ? "padding" : "height"}>
      {Platform.OS === "ios" ? (
        <Header>
          <CloseButtonWrapper>
            <IconButton
              iconName="close"
              size={32}
              color="#000"
              onPress={onPressClose}
            />
          </CloseButtonWrapper>
          <HeaderText>Record</HeaderText>
        </Header>
      ) : null}
      <Form contentContainerStyle={styles.scrollView}>
        <Row>
          <Input
            containerOptions={{
              needMarginRight: true,
            }}
            readOnly={readOnly}
            label="Doctor Name"
            value={doctorName}
            onChangeText={setDoctorName}
          />
          <Input
            containerOptions={{
              needMarginLeft: true,
            }}
            readOnly={readOnly}
            label="Patient Name"
            value={patientName}
            onChangeText={setPatientName}
          />
        </Row>
        <Row>
          <Input
            readOnly={readOnly}
            label="Diagnosis"
            value={diagnosis}
            onChangeText={setDiagnosis}
            multiline
          />
        </Row>
        <Row>
          <Input
            readOnly={readOnly}
            label="Medication"
            value={medication}
            onChangeText={setMedication}
            multiline
          />
        </Row>
        <Row>
          <Input
            readOnly={readOnly}
            label="Consultation Fee"
            value={consultationFee}
            onChangeText={setConsultationFee}
            keyboardType="decimal-pad"
          />
        </Row>
        <Row>
          <Input
            containerOptions={{
              needMarginRight: true,
            }}
            readOnly={readOnly}
            label="Date"
          >
            {readOnly ? (
              <StyledInput value={dateString} />
            ) : (
              <DateTimeWrapper onPress={showDatepicker}>
                <DateTimeText>{dateString}</DateTimeText>
              </DateTimeWrapper>
            )}
          </Input>
          <Input
            containerOptions={{
              needMarginLeft: true,
            }}
            readOnly={readOnly}
            label="Time"
          >
            {readOnly ? (
              <StyledInput value={moment(time, "HH:mm:ss").format("HH:mm")} />
            ) : (
              <DateTimeWrapper onPress={showTimepicker}>
                <DateTimeText>{time}</DateTimeText>
              </DateTimeWrapper>
            )}
          </Input>
        </Row>
        {show && (
          <DateTimePicker
            value={date}
            mode={mode}
            is24Hour
            display="default"
            onChange={onChangeDateTime}
          />
        )}

        <Row>
          <Label>Follow Up</Label>
          <Switch
            onValueChange={toggleFollowUp}
            value={followUp}
            disabled={readOnly}
          />
        </Row>
        {!readOnly ? (
          <ButtonRow>
            <Button label="Submit" onPress={onPressSubmit} />
          </ButtonRow>
        ) : null}
      </Form>
    </Container>
    {loading ? (
        <Spinner />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    padding: 15,
  },
});

export default Record;
