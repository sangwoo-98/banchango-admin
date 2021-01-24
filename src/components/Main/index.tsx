import React from 'react';
import LogoImage from '../../assets/LOGO.png';
import {Container, 
    Wrapper, 
    LoginContainer, 
    ImageContainer, 
    Image, 
    TextContainer, 
    MainText,
    SubText,
    Input,
    SignInButton} from './styles';

const Main: React.FC = () => {
    return (
        <Container>
            <Wrapper>
                <LoginContainer>
                    <ImageContainer>
                        <Image logoImage={LogoImage}></Image>
                    </ImageContainer>
                    <TextContainer>
                        <MainText>Sign in</MainText>
                        <SubText>Banchangohub Admin Page</SubText>
                        <Input type="text" id="email" placeholder="ID"/>
                        <Input type="password" id="password" placeholder="PASSWORD"/>
                        <SignInButton>Sign in</SignInButton>
                    </TextContainer>
                </LoginContainer>
            </Wrapper>
        </Container>
    )
}

export default Main;