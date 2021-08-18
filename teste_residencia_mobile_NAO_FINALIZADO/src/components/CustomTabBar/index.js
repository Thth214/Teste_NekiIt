/* eslint-disable prettier/prettier */
import React from 'react';
import styled from 'styled-components';
import HomeIcon from '../../assets/home.svg'
import OutIcon from '../../assets/out.svg'

const TabArea = styled.View`
    height: 60px;
    background-color: #233653;
    flex-direction:row;
`;
const TabItem = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const TabBar = ({state ,navigation}) =>{

    const goTo = (screenName) =>{
        navigation.navigate(screenName)
    }

    return(
        <TabArea>
            <TabItem onPress={() => goTo('Home')}>
                <HomeIcon style={{opacity: state.index===0? 1 : 0.5}} fill='#ffffff'/>
            </TabItem>
            <TabItem onPress={() => goTo('SignOut')}>
                <OutIcon style={{opacity: state.index===4? 1 : 0.5}} fill='#ffffff'/>
            </TabItem>
        </TabArea>
    );
}

export default TabBar;
