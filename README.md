# WISH


## DB

### user

```
interface UserType {
    id: number;
    token: string;
    name: string;
    age: number;
    phone: string;
    gender: "boy" | "girl";
    school: string;
    friendIds: string[];
    requestFriendIds: string[];
    feedIds: number[];
}
```

### feed

```
interface FeedType {
    id: number;
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
```
interface PoolType {
    id: number;
    question: string;
}
```

## API

### /register (user)

#### rep
```
{
    token: string;
    name: string;
    age: number;
    phone: string;
    gender: "boy" | "girl";
    school: string;
    friendIds: string[];
    requestFriendIds: string[];
}
```

#### res
```
{
    id: number
}
```


### /geUserProfile (user)

유저의 프로필을 조회합니다.

#### rep
```
{
    id: number;
}
```

#### res
```
{
    id: number;
    name: string;
    age: number;
    school: string;
    friendIds: string[];
}
```

### /getFeeds (feed)

추천 피드를 받습니다.

#### rep
```
{
    phone: string;
    school: string;
    friendIds: string[];
}
```

#### res
```
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


### /writeFeed (feed)
피드를 씁니다.

#### rep
```
{
    question: string;
    imgUrl: string;
    writerId: number;
    writerName: string;
    askerId: number;
    askerName: string;
}
```

#### res
```
{
    id: number;
}
```


### /warnFeed (feed)

#### req
```
{
    userId: number;
    feedId: number;
}
```

#### res
```
{
    success: boolean;
}
```



### /sendPoll (poll)

투표합니다.

#### req
```
{
    question: string;
    id: number;
    targetId: number;
}
```

#### res
```
{
    success: boolean;
}
```


### /requesteFriend (friend)

#### req
```
{
    id: number;
    targetId: number;
}
```

#### res
```
{
    success: boolean
}
```

### /beFriend (friend)

#### req
```
{
    id: number;
    targetId: number;
}
```

#### res
```
{
    success: boolean
}
```

### /getRecommendFriends (friend)

#### req
```
{
    phone: string;
    school: string;
    friendIds?: string[];
}
```

#### res
```
{
    id: number;
    name: string;
    age: number;
    gender: "boy" | "girl";
    school: string;
    friendIds?: string[];
}[]
```


### /getSchoolList (school)

#### req
```
{}
```

#### res
```
{
    school: string;
}[]
```
