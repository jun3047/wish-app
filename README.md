# WISH


## DB

### user
```ts
interface UserType {
    id: number;
    token: string;
    name: string;
    age: number;
    phone: string;
    gender: "boy" | "girl";
    friendIds: string[];
    requestFriendIds: string[];
    feedIds: number[];
    alarms: Alarm[];
    school?: string;
    schoolLocation?: string;
}
```

### alarm
```ts
interface AlarmType {
    id: number;
    question: string;
    token: string;
    name: string;
    age: number;
    gender: "boy" | "girl";
    school?: string;
    schoolLocation?: string;
    friendIds: string[];
}
```

### feed
```ts
interface FeedType {
    id: number;
    token: string;
    question: string;
    imgUrl: string;
    warnUserIds: number[];
    writerId: number;
    writerName: string;
    askerId: number;
    askerName: string;
    time: string;
}
```

### poll
```ts
interface PollType {
    id: number;
    question: string;
}
```



## API

### 요청

**user**  
회원가입: ```POST/user```  
프로필 조회: 🔐 ```GET/user/{id}```
  
**feed**  
피드 작성하기: 🔐 ```POST/feed```  
피드 가져오기: 🔐 ```GET/feeds```  
글 신고하기: 🔐 ```PUT/feed/warn```  
  
**poll**  
투표하기: 🔐 ```PUT/poll```  
  
**friend**  
친구 요청: 🔐 ```PUT/friend/request```  
친구 수락: 🔐 ```POST/friend```  
추천 친구: 🔐 ```GET/friends```  



### POST/user

가입합니다.

#### rep
```ts
{
    token: string;
    name: string;
    age: number;
    phone: string;
    gender: "boy" | "girl";
    school?: string;
    schoolLocation?: string;
    requestFriendIds?: string[];
}
```

#### res
```ts
{
    id: number
}
```


### GET/user/{id}

유저의 프로필을 조회합니다.

#### res
```ts
{
    id: number;
    name: string;
    age: number;
    school?: string;
    schoolLocation?: string;
    friendIds: string[];
}
```


### GET/feeds

추천 피드를 가져옵니다.

#### rep
```ts
{
    phone: string;
    school?: string;
    schoolLocation?: string;
    friendIds: string[];
}
```

#### res
```ts
{
    id: number;
    question: string;
    imgUrl: string;
    warnUserIds: number[]
    writerId: number;
    writerName: string;
    askerId: number;
    askerName: string;
    time: string;
}[]
```


### POST/feed
피드를 씁니다.

#### rep
```ts
{
    token: string;
    question: string;
    writerId: number;
    writerName: string;
    askerId: number;
    askerName: string;
}
```

#### res
```ts
{
    id: number;
    imgUrl: string;
}
```


### PUT/feed/warn

신고합니다.

#### req
```ts
{
    userId: number;
    feedId: number;
}
```

#### res
```ts
{
    success: boolean;
}
```



### PUT/poll

투표합니다.

#### req
```ts
{
    question: string;
    id: number;
    token: number;
    targetId: number;
    targetToken: string;
}
```

#### res
```ts
{
    success: boolean;
}
```

### PUT/friend/request

친구요청합니다.

#### req
```ts
{
    id: number;
    name: string;
    age: number;
    school?: string;
    schoolLocation?: string;
    
    friendIds: string[]
    targetId: number;
    targetToken: string;
}
```

#### res
```ts
{
    success: boolean
}
```

### POST/friend
친구 요청을 수락합니다.

#### req
```ts
{
    id: number;
    targetId: number;
    targetToken: number;
}
```

#### res
```ts
{
    success: boolean
}
```

### GET/friends

#### req
```ts
{
    phoneList: string[];
    school?: string;
    schoolLocation?: string;
    friendIds?: string[];
}
```

#### res
```ts
{
    id: number;
    name: string;
    age: number;
    gender: "boy" | "girl";
    school?: string;
    schoolLocation?: string
    friendIds?: string[];
}[]
```
