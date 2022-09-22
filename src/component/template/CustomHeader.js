import React from 'react';
import {Image, Text, TouchableOpacity, View} from "react-native";
import styled from "styled-components"
import moreButtonImagePath from "../../img/more.png";

function CustomHeader({content, handleMoreButtonPress}) {
    return (
        <StyledHeader>
            <StyledTitle>{content}</StyledTitle>
            <TouchableOpacity onPress={handleMoreButtonPress}>
                <Image
                    style={{height: 30, width: 30}}
                    source={moreButtonImagePath}
                />
            </TouchableOpacity>
        </StyledHeader>

    );
}

export default CustomHeader;

const StyledHeader = styled(View)`
  width: 100%;
  height: 50px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 25px;
  border-bottom-color: rgb(248, 248, 248);
  border-bottom-width: 5px;

`
const StyledTitle = styled(Text)`
  font-size: 20px;
  font-weight: 800;
  color: rgb(71, 67, 72);
`