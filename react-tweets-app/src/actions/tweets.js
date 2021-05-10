import { saveLikeToggle } from "../utils/api";

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOGGLE_TWEET = 'TOGGLE_TWEET'

export function receiveTweets (tweets) {
    return {
        type: RECEIVE_TWEETS,
        tweets, 
    }
}

export function toggleTweet( {id, authedUser, hasLiked }) {
    return {
        type: TOGGLE_TWEET,
        id,
        authedUser,
        hasLiked
    }
}

export function handleToggleTweet(info) {
    return (dispatch) => {
        dispatch(toggleTweet(info))

        return saveLikeToggle(info) // save info to db
            .catch((e) => {
                console.warn('Error in handleToggleTweet: ', e)
                dispatch(toggleTweet(info)) // reset to what it was
                console.log('There was an error liking the Tweet, try again')
            })
    }
}