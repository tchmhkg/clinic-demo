import React from "react";
import { StyleSheet } from "react-native";
import Styled from "styled-components/native";

const StyledContainer = Styled.View`
  flex: 1;
  justify-content: center;
  background-color: #fafafa;
`;

const StyledScrollContainer = Styled.ScrollView`
  flex: 1;
  background-color: #fafafa;
`;

const Container = ({ canScroll = false, children }) => {
  if (canScroll) {
    return (
      <StyledScrollContainer contentContainerStyle={styles.scrollView}>
        {children}
      </StyledScrollContainer>
    );
  }
  return <StyledContainer>{children}</StyledContainer>;
};

const styles = StyleSheet.create({
  scrollView: {
    padding: 15,
    justifyContent: "center",
  },
});

export default Container;
