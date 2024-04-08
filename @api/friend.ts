import { AxiosResponse } from "axios";
import { SimpleUserType } from "../@type/user";
import { request } from "./request";

interface FriendApiType {
  beFriend: (
    user: SimpleUserType, 
    targetUser: SimpleUserType
  ) => Promise<AxiosResponse>;
  getRecommendFriends: (
    userInfo:{
      phoneList: string[],
      school?: string,
      schoolLocation?: string,
      friendIds?: number[],
  }) => Promise<AxiosResponse<SimpleUserType[]>>;
}

const friendApi: FriendApiType = {
  beFriend: (user, targetUser) => {

    //TODO: validation
    return request.post('/friend', {user, targetUser})
  },
  getRecommendFriends: userInfo => request.post(`/friend/recommend`, userInfo)
};

export default friendApi;