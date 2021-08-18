/* eslint-disable prettier/prettier */
import React from 'react'
import styled from 'styled-components/native'
import {useNavigation} from '@react-navigation/native'

const Area = styled.TouchableOpacity`
background-color: black;
margin-bottom: 20px;
border-radius: 20px;
padding: 15px;
flex-direction: row;

`;
const Avatar = styled.Image`
width: 88px;
height: 88px;
border-radius: 20px;
`;
const InfoArea = styled.View`
margin-left: 20px;
justify-content: space-between;
`;
const FruitName = styled.Text`
font-size: 17px;
font-weight: bold;
color: #ffa214;
`;
const SeeMore = styled.View`
width: 85px;
height: 26px;
border: 1px solid #ffa214;
border-radius: 10px;
justify-content: center;
align-items: center;
`;
const SeeMoreText = styled.Text`
font-size: 13px;
color: #ffa214;
`;
const FruitCategory = styled.Text`
font-size: 15px;
color: #ffa214;
`;

const Card = ({data}) => {
    const navigation = useNavigation();
    return(
        <Area>
            <Avatar source={{uri:data.skill.imageUrl}}/>
            <InfoArea>
                <FruitName>{data.skill.name}</FruitName>
                <FruitCategory>{data.knowledgeLevel}</FruitCategory>
                <SeeMore>
                    <SeeMoreText>Ler Sobre</SeeMoreText>
                </SeeMore>
            </InfoArea>
        </Area>
    );
}

export default Card;