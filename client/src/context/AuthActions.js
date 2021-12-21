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

export const LogOut = () => ({
    type:"LOGOUT"
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

export const AddToRecentlyPlayed = (userId) => ({
    type: "ADDTORECENTLYPLAYED",
    payload: userId,
})

export const RemoveFromRecentlyPlayed = (userId) => ({
    type: "REMOVEFROMRECENTLYPLAYED",
    payload: userId,
})

export const LastPlayed = (userId) => ({
    type: "LASTPLAYED",
    payload: userId,
})

export const UpdateProfile = (user) => ({
    type: "UPDATEPROFILE",
    payload: user,
})

export const UpdatePassword = (password) => ({
    type: "UPDATEPASSWORD",
    payload: password,
})