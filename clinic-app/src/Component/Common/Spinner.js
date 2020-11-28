import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import Styled from 'styled-components/native';

const Container = Styled.View`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const SpinnerWrapper = Styled.View`
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 15px;
`;

const Spinner = () => {
  return (
    <Container>
      <SpinnerWrapper>
        <ActivityIndicator size="large" color="#0ECD9D"/>
      </SpinnerWrapper>
    </Container>
  )
}

export default Spinner;