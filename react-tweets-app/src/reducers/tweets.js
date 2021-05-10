import { RECEIVE_TWEETS, TOGGLE_TWEET } from '../actions/tweets'

export default function tweets (state = {}, action) {
    switch(action.type) {
        case RECEIVE_TWEETS:
            return {
                ...state,
                ...action.tweets
            }
        case TOGGLE_TWEET: // add id of user to likes array
            return { // return brand new obj, inmutable states
                ...state,
                [action.id] : { // tweet we are toggling
                    ...state[action.id],
                    likes: action.hasLiked === true
                    ? state[action.id].likes.filter((uid)=> uid !== action.authedUser)// add or remove user name from likes array
                    : state[action.id].likes.concat([action.authedUser]) // adding user if not liked
                }
            }
        default :
            return state
    }
}