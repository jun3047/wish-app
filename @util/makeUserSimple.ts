import { SimpleUserType, UserType } from "../@type/user"

const makeUserSimple = (user: UserType): SimpleUserType => {

    return {
        id: user.id,
        phone: user.phone,
        gender: user.gender,
        feedIds: user.feedIds,
        token: user.token,
        name: user.name,
        age: user.age,
        school: user.school,
        schoolLocation: user.schoolLocation,
    }
}

export default makeUserSimple