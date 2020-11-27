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

import Button from "~/Component/Button";
import IconButton from "~/Component/IconButton";
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

const Input = Styled.TextInput`
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
`;

const DateTimeText = Styled.Text`
  font-size: 16px;
`;

const Row = Styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const InputWrapper = Styled.View`
  flex: 1;
  margin-left: ${(props) => (props.needMarginLeft ? "5px" : 0)};
  margin-right: ${(props) => (props.needMarginRight ? "5px" : 0)};
  margin-bottom: 10px;
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

  useEffect(() => {
    const getConsultation = async () => {
      try {
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
      } catch (err) {
        console.log(err);
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
    if(!(doctorName && patientName && diagnosis && medication && consultationFee && dateString && time)) {
      Alert.alert('Please complete all fields');
      return;
    }
    submitForm();
  }

  const submitForm = async () => {
    try {
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
      Alert.alert(res?.data?.message, "", [
        {
          text: "OK",
          onPress: () => (res?.data?.success ? navigation.pop() : {}),
          style: "cancel",
        },
      ]);
    } catch (err) {
      console.log(err);
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
    const currentDate = selectedDate || date
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
          <InputWrapper needMarginRight pointerEvents={readOnly ? 'none' : 'auto'}>
            <Label>Doctor Name</Label>
            <Input
              onChangeText={setDoctorName}
              value={doctorName}
            />
          </InputWrapper>
          <InputWrapper needMarginLeft pointerEvents={readOnly ? 'none' : 'auto'}>
            <Label>Patient Name</Label>
            <Input
              onChangeText={setPatientName}
              value={patientName}
            />
          </InputWrapper>
        </Row>
        <Row>
          <InputWrapper pointerEvents={readOnly ? 'none' : 'auto'}>
            <Label>Diagnosis</Label>
            <Input
              value={diagnosis}
              onChangeText={setDiagnosis}
              multiline
              textAlignVertical="top"
            />
          </InputWrapper>
        </Row>
        <Row>
          <InputWrapper pointerEvents={readOnly ? 'none' : 'auto'}>
            <Label>Medication</Label>
            <Input
              value={medication}
              onChangeText={setMedication}
              multiline
              textAlignVertical="top"
              // editable={!readOnly}
            />
          </InputWrapper>
        </Row>
        <Row>
          <InputWrapper pointerEvents={readOnly ? 'none' : 'auto'}>
            <Label>Consultation Fee</Label>
            <Input
              value={consultationFee}
              onChangeText={setConsultationFee}
              // editable={!readOnly}
              keyboardType="decimal-pad"
            />
          </InputWrapper>
        </Row>
        <Row>
          <InputWrapper needMarginRight pointerEvents={readOnly ? 'none' : 'auto'}>
            <Label>Date</Label>
            {readOnly ? (
              <Input value={dateString} />
            ) : (
              <DateTimeWrapper onPress={showDatepicker}>
                <DateTimeText>{dateString}</DateTimeText>
              </DateTimeWrapper>
            )}
          </InputWrapper>
          <InputWrapper needMarginLeft pointerEvents={readOnly ? 'none' : 'auto'}>
            <Label>Time</Label>
            {readOnly ? (
              <Input value={moment(time, 'HH:mm:ss').format('HH:mm')} />
            ) : (
              <DateTimeWrapper onPress={showTimepicker}>
                <DateTimeText>{time}</DateTimeText>
              </DateTimeWrapper>
            )}
          </InputWrapper>
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
  );
};

const styles = StyleSheet.create({
  scrollView: {
    padding: 15,
  },
});

export default Record;
