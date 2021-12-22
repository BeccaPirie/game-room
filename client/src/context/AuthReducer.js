const AuthReducer = (state, action) => {
    switch(action.type){
        case "LOGIN_START":
            return{
                user: null,
                isFetching: true,
                error: false,
            };
        case "LOGIN_SUCCESS":
            return{
                user: action.payload,
                isFetching: false,
                error: false,
            };
        case "LOGIN_FAILURE":
            return{
                user: null,
                isFetching: false,
                error: true,
            };
        case "LOGOUT":
          return {
            user: null,
            isFetching: false,
            error: false,
          };
        case "FOLLOW":
            return {
              ...state,
              user: {
                ...state.user,
                following: [...state.user.following, action.payload],
              },
            };
          case "UNFOLLOW":
            return {
              ...state,
              user: {
                ...state.user,
                following: state.user.following.filter(
                  (following) => following !== action.payload
                ),
              },
            };
          case "FAVOURITE":
            return {
              ...state,
              user: {
                ...state.user,
                favGames: [...state.user.favGames, action.payload],
              }
            };
          case "UNFAVOURITE":
            return {
              ...state,
              user: {
                ...state.user,
                favGames: state.user.favGames.filter(
                  (favGame) => favGame !== action.payload
                )
              }
            };
          case "ADDTORECENTLYPLAYED":
            return {
              ...state,
              user: {
                ...state.user,
                recentGames: [...state.user.recentGames, action.payload]
              }
            };
          case "REMOVEFROMRECENTLYPLAYED":
            return {
              ...state,
              user: {
                ...state.user,
                recentGames: state.user.recentGames.filter(
                  (recentGame) => recentGame !== action.payload
                )
              }
            };
            case "LASTPLAYED":
              return {
                ...state,
                user: {
                  ...state.user,
                  lastPlayed: action.payload
                }
              };
            case "UPDATEPROFILE":
              return {
                user: action.payload,
                isFetching: false,
                error: false,
              };
              case "UPDATEPASSWORD":
                return {
                  ...state,
                  user: {
                    ...state.user,
                    password: action.payload
                  }
                };
                case "DELETEACCOUNT":
                  return {
                    user: null,
                    isFetching: false,
                    error: false,
                  }
            default:
            return state;
    }
}

export default AuthReducer;