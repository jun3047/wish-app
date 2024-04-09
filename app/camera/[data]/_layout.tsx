import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import useImagePicker from '../../../@hooks/useImagePicker';
import styled from '@emotion/native';
import { uploadImage } from '../../../@api/uploadPic';
import { shareInsta } from '../../../@hooks/instaShare';
import useCapture from '../../../@hooks/useCaptrue';
import useUser from '../../../@hooks/useUser';
import { handleWebPush } from '../../../@hooks/usePushNotifications';
import * as amplitude from '@amplitude/analytics-react-native';

export default function Page() {

  const { pickImage, image, isAutoSelect } = useImagePicker();
  const data = useLocalSearchParams().data as string;

  const [user, setUser] = useUser()
  const {asker, writer, question} = JSON.parse(data);

  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const contentRef = useRef<View>(null);
  const captureComponent = useCapture(contentRef);
  
  const upload = async ()=>{
    const feedData = {
      question: question,
      fileUrl: image,
      asker: asker,
      writer: writer
    }

    setLoading(true);

    const feedId = await uploadImage(feedData)

    if(feedId === null) {
      setLoading(false);
      return alert('업로드에 실패했습니다. 다시 시도해주세요.');
    }

    setUser({
      ...user,
      feedIds: [
        ...user.feedIds,
        feedId
      ]
    })

    handleWebPush([{
      token: asker.token,
      data: {
        title: `내 질문에 ${writer.name}님이 사진을 올렸어요`,
        body: '지금 피드에서 확인해보세요!',
        data: {
          feedId: feedId
        }
      }
    }])

    setLoading(false);
    setUploaded(true);
  }

  return (
    <>
    <Stack.Screen options={{
        title: ' ',
        headerBackTitleVisible: false,
    }} />
    <Container>
      <Content ref={contentRef}>
        <QuestionText>익명에게 받은 질문</QuestionText>
        <Question>Q. {question}</Question>
        <ImageWrapper>
        {
            image === null ?  <EmptyImage /> :
            <StyledImage
              source={{
                uri: image
              }}
            />
        }
        </ImageWrapper>
        <Logo>WISH</Logo>
      </Content>
        {
          uploaded ? 
          <>
          <MainButton onPress={async ()=>{

              const isSameGender = asker.gender === writer.gender
              amplitude.track(`click_share-${ isSameGender ? 'same' : 'other'}`)
              const uri = await captureComponent()
              shareInsta(uri)
            }}>
            <ButtonText>인스타 공유하기</ButtonText>
          </MainButton>
          <SubButton onPress={router.back}>
            알람으로 돌아가기
          </SubButton>
          </>:
          loading ? 
          <MainButton>
              <ActivityIndicator color="#000000" />
          </MainButton>:
          (image === null || isAutoSelect) ?
          <MainButton onPress={pickImage}>
              <ButtonText>갤러리에서 고르기</ButtonText>
          </MainButton>:
          <>
          <MainButton onPress={upload}>
          <ButtonText>바로 올리기</ButtonText>
          </MainButton>
            <SubButton onPress={pickImage}>
              다시 고르기
            </SubButton>
          </>
        }
    </Container>
    </>
  );
}

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
    border-radius: 40px;
    justify-content: start;
    margin-bottom: 20%;
    padding: 25px 15px;
    background-color: #0d0d0d;
`;

const QuestionText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #757575;
  text-align: left;
  width: 100%;
`;

const Question = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: white;
  text-align: left;
  width: 100%;
`;

const ImageWrapper = styled.View`
  width: 100%;
  margin-top: 13px;
`;

const StyledImage = styled.Image`
    height: 300px;
    width: 300px;
    border-radius: 30px;
`;

const EmptyImage = styled.View`
    height: 300px;
    width: 300px;
    border-radius: 30px;
    background-color: #1e1e1e;
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

const ButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: black;
`;

const SubButton = styled.Text`
  position: absolute;
  bottom: 3px;
  font-size: 16px;
  font-weight: bold;
  color: #B3B3B3;
  text-align: center;
`;
