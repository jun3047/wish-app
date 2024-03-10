import axios from 'axios';
import env from '../env.json';

const sendMessage = (phone: string, authCode: string): Promise<number> => {
  const user_phone_number = phone;
  let resultCode: number = 404;

  const date = Date.now().toString();
  const uri = 'your_service_id';
  const secretKey = 'your_secret_key';
  const accessKey = 'your_access_key_id';
  const method = 'POST';
  const space = ' ';
  const newLine = '\n';
  const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
  const url2 = `/sms/v2/services/${uri}/messages`;

  // 이 부분에서는 React Native에서 지원하는 암호화 라이브러리를 사용하거나
  // 네이티브 모듈을 이용하여 처리해야 합니다.
  // crypto 모듈을 직접 사용할 수 없습니다.

  // 암호화 부분은 생략하고 axios로 요청 보내는 부분만 작성합니다.
  return axios
    .post(url, {
      type: 'SMS',
      countryCode: '82',
      from: 'your_phone_number',
      content: `[FIND] 인증번호 [${authCode}]를 입력해주세요 :)`,
      messages: [
        {
          to: user_phone_number,
        },
      ],
    }, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'x-ncp-iam-access-key': accessKey,
        'x-ncp-apigw-timestamp': date,
        'x-ncp-apigw-signature-v2': 'your_signature',
      },
    })
    .then(response => {
      resultCode = 200;
      return resultCode;
    })
    .catch(error => {
      console.error(error.response);
      return resultCode;
    });
};

export default sendMessage;