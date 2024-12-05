import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity, Image } from "react-native";

const FloatingButtonContainer = styled(TouchableOpacity)`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background-color: #ffffff;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  elevation: 5; /* Android 그림자 효과 */
  z-index: 9999;
`;

const FloatingButton = ({ onPress }) => {
  return (
    <FloatingButtonContainer onPress={onPress}>
      <Image
        source={require("../../assets/images/create_recruit_icon.png")}
        style={{ width: 30, height: 30 }}
        resizeMode="contain"
      />
    </FloatingButtonContainer>
  );
};

export default FloatingButton;
