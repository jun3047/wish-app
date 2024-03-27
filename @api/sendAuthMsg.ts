import axios from 'axios';
import CryptoJS from 'react-native-crypto-js';

function makeSignature() {
  const timestamp = Date.now().toString();
  const secretKey = process.env.EXPO_PUBLIC_NAVER_SECRET_KEY
  const uri = process.env.EXPO_PUBLIC_SERVICE_ID
  const accessKey = process.env.EXPO_PUBLIC_NAVER_ACCESS_KEY_ID
  const space = ' '; // 한 칸 띄우기
  const newLine = '\n'; // 새로운 줄
  const method = 'GET'; // 메소드
  const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;

  // HMAC SHA256 생성
  
  const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
  hmac.update(method);
  hmac.update(space);
  hmac.update(url);
  hmac.update(newLine);
  hmac.update(timestamp);
  hmac.update(newLine);
  hmac.update(accessKey);

  const hash = hmac.finalize();

  return hash.toString(CryptoJS.enc.Base64);
}

const sendMessage = async (phone: string, authCode: string): Promise<number> => {

  console.log({
    type: 'SMS',
    countryCode: '82',
    from: process.env.EXPO_PUBLIC_PHONE,
    secretKey: process.env.EXPO_PUBLIC_NAVER_SECRET_KEY,
    accessKey: process.env.EXPO_PUBLIC_NAVER_ACCESS_KEY_ID,
    uri: process.env.EXPO_PUBLIC_SERVICE_ID,
  });

  const user_phone_number = phone;
  let resultCode = 404;

  const date = Date.now().toString();
  const uri = process.env.EXPO_PUBLIC_SERVICE_ID;
  const accessKey = process.env.EXPO_PUBLIC_NAVER_ACCESS_KEY_ID;
  const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;

  const signature = makeSignature();

  try {
    await axios.post(
      url,
      {
        type: 'SMS',
        countryCode: '82',
        from: process.env.EXPO_PUBLIC_PHONE,
        content: `[WISH] 인증번호 [${authCode}]를 입력해주세요 :)`,
        messages: [{ to: user_phone_number }],
      },
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'x-ncp-iam-access-key': accessKey,
          'x-ncp-apigw-timestamp': date,
          'x-ncp-apigw-signature-v2': signature,
        },
      }
    );
    resultCode = 200;
  } catch (error) {
    console.error(error.response);
  }

  return resultCode;
};

export default sendMessage;