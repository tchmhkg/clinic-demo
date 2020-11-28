import React from "react";
import { StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import Styled from "styled-components/native";
const Container = Styled(KeyboardAvoidingView)`
  flex: 1;
`;

const Form = Styled.ScrollView`
  flex: 1;
`;

const isIOS = Platform.OS === "ios";

const FormContainer = ({ children }) => {
  return (
    <Container behavior={isIOS ? "padding" : "height"}>
      <Form contentContainerStyle={styles.scrollView}>{children}</Form>
    </Container>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    padding: 15,
  },
});

export default FormContainer;
