export const LoginStart = (user) => ({
    type:"LOGIN_START",
    payload: user,
})

export const LoginSuccess = (user) => ({
    type:"LOGIN_SUCCESS",
    payload: user,
})

export const LoginFailure = () => ({
    type:"LOGIN_FAILURE"
})

export const Follow = (userId) => ({
    type: "FOLLOW",
    payload: userId,
})
  
export const Unfollow = (userId) => ({
    type: "UNFOLLOW",
    payload: userId,
})

export const Favourite = (userId) => ({
    type: "FAVOURITE",
    payload: userId,
})

export const Unfavourite = (userId) => ({
    type: "UNFAVOURITE",
    payload: userId,
})