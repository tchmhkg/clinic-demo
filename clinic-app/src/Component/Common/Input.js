import React from "react";
import Styled from "styled-components/native";

const Label = Styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
`;

const StyledInput = Styled.TextInput`
  border: 1px solid #b0b0b0;
  padding: 5px;
  min-height: ${(props) => (props.multiline ? "80px" : "40px")};
  font-size: 16px;
  background-color: #ffffff;
`;

const InputWrapper = Styled.View`
  flex: 1;
  margin-left: ${(props) => (props.needMarginLeft ? "5px" : 0)};
  margin-right: ${(props) => (props.needMarginRight ? "5px" : 0)};
  margin-bottom: 10px;
`;

const Input = ({
  label = "",
  value = "",
  multiline = false,
  secureTextEntry = false,
  keyboardType = "default",
  onChangeText = () => {},
  readOnly = false,
  containerOptions = {},
  inputOptions = {},
  children,
}) => {
  return (
    <InputWrapper
      pointerEvents={readOnly ? "none" : "auto"}
      {...containerOptions}
    >
      <Label>{label}</Label>
      {children ? (
        children
      ) : (
        <StyledInput
          onChangeText={onChangeText}
          value={value}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
          autoCorrect={false}
          autoCompleteType="off"
          keyboardType={keyboardType}
          multiline={multiline}
          textAlignVertical={multiline ? "top" : "auto"}
          returnKeyType={multiline ? "default" : "done"}
          {...inputOptions}
        />
      )}
    </InputWrapper>
  );
};

export default Input;
