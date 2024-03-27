import { Stack, useLocalSearchParams } from 'expo-router'
import React, { useRef, useState } from 'react';
import styled from '@emotion/native';
import useCapture from '../../../@hooks/useCaptrue';
import { View, Text, ActivityIndicator } from 'react-native';
import { shareInsta } from '../../../@hooks/instaShare';

export default () => {

    const {id} = useLocalSearchParams()
    const [question, askerSchool, askerAge, gender] = id.toString().split(',')

    const [loading, setloading] = useState(false)

    const contentRef = useRef<View>(null);
    const captureComponent = useCapture(contentRef);

    const myName = '정준';
  
    return (
        <>
            <Stack.Screen options={{
                title: ' ',
                headerBackTitleVisible: false,
            }} />
            <Container>
                <Content ref={contentRef}>
                    <InfoText>{askerSchool}</InfoText>
                    <InfoText>{askerAge}살 {gender}<Light>에게</Light></InfoText>
                    <Question question={question} />
                    <FriendListContainer myName={myName}/>
                    <Logo>WISH</Logo>
                </Content>
                <MainButton onPress={async ()=>{
                    setloading(true)
                    const uri = await captureComponent()
                    shareInsta(uri)
                    setloading(false)
                }}>
                {
                    loading ? 
                    <ActivityIndicator color="#000000" />:
                    <MainButtonText>
                        인스타 공유하기
                    </MainButtonText>
                }
                </MainButton>
            </Container>
        </>
    );
}


  const FriendListContainer = ({ myName }) => {

    const FriendList = getRandomNames(myName)

    const index = FriendList.indexOf(myName);

    return (
        <GridContainer>
            {FriendList.map((friendName, index) => (
                    <PollButton
                        key={index}
                        name={friendName}
                        active={friendName === myName}
                    />
                )
            )}
            <Finger
                rotate={
                index === 0 ? -45 :
                index === 1 ? 55 :
                index === 2 ? -135 : 145
            }>👆</Finger>
        </GridContainer>
    )
  };
  

  const getRandomNames = (myName: string) => {

    const koreanSurnames = [ '김', '이', '박', '최', '정', '강', '조', '윤', '장', '임','오', '한', '신', '서', '권', '황', '안', '송', '류', '전','홍', '구', '문', '양', '손','배', '조', '백', '허', '남','심', '노', '정', '하', '곽','성', '차', '유', '전', '맹', '공', '하', '곽', '변', '임'];

    const shuffledSurnames = [...koreanSurnames.map((성)=>성 + "**")].sort(() => 0.5 - Math.random());
    const selectedSurnames = shuffledSurnames.slice(0, 3);
    const namesWithAnonymous = [...selectedSurnames, myName];

    return namesWithAnonymous.sort(() => 0.5 - Math.random());  
  }

  const GridContainer = styled.View`
    justify-content: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
`
  

interface FingerProps { rotate: number }

const Finger = styled.Text<FingerProps>`
  font-size: 40px;
  position: absolute;
  top: 50px;
  transform: ${({ rotate }) => `rotate(${rotate}deg)`};
`;

interface PollButtonProps { active: boolean }

const ButtonContainer = styled.View<PollButtonProps>(({ active }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 16,
  paddingHorizontal: 28,
  backgroundColor: '#292828',
  borderRadius: 20,
  opacity: active ? 1 : 0.5,
}));

const Circle = styled.View({
  height: 30,
  width: 30,
  backgroundColor: '#D9D9D9',
  borderRadius: 15,
  marginRight: 20,
});

const ButtonText = styled.Text({
  fontSize: 18,
  fontWeight: 'bold',
  color: 'white',
});

const PollButton = ({ name, active }) => {
    
  return (
    <ButtonContainer active={active}>
      <Circle />
      <ButtonText>{name}</ButtonText>
    </ButtonContainer>
  );
};


const Light = styled.Text`
    font-weight: 300;
    color: white;
`

const Question = ({question}) => {


    const divideQuestionIntoTwoLines = (question: string) => {
        const words = question.split(' ');
        let line1: string[] = [];
        let line2: string[] = [];
        let totalLength = question.length;
        let currentLength = 0;
    
        for (let i = 0; i < words.length; i++) {
            if (currentLength + words[i].length <= totalLength / 2) {
                line1.push(words[i]);
                currentLength += words[i].length + 1; // 공백 포함 길이 계산
            } else {
                line2 = words.slice(i);
                break;
            }
        }

            return [line1.join(' '), line2.join(' ')];
        };
    
    const lines = divideQuestionIntoTwoLines(question);

    return (
        <QuestionView>
            <QuestionText>{lines[0]}</QuestionText>
            <QuestionText>{lines[1]}</QuestionText>
        </QuestionView>
    )
}

const QuestionView = styled.View`   
    margin-top: 20px;
    margin-bottom: 20px;
    align-items: center;
    justify-content: center;
`

const QuestionText = styled.Text`
    font-size: 26px;
    font-weight: bold;
    color: white;
    text-align: center;
`

const InfoText = styled.Text`
    text-align: center;
    font-size: 16px;
    color: white;
    font-weight: bold;
`


const Logo = styled.Text`
    margin-top: 20px;
    font-size: 20px;
    font-weight: 900;
    color: white;
    text-align: center;
`

const Container = styled.View`
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: black;
`;

const Content = styled.View`
    width: 100%;
    border-radius: 40px;
    justify-content: center;
    margin-bottom: 20%;
    padding: 25px 15px;
    background-color: black;
`;

const MainButton = styled.TouchableOpacity`
    margin: 10px;
    position: absolute;
    bottom: 20px;
    background-color: white;
    border-radius: 30px;
    align-items: center;
    justify-content: center;
    padding: 14px;
    min-width: 260px;
`;

const MainButtonText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: black;
`;