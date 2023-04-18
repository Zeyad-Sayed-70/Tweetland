import axios from "axios";
import { BACKEND_URL } from "../../../../constants/backend";

const getTweets = async ({token, SKIP}) => 
    axios.post(`${BACKEND_URL}/tweets`, {SKIP}, {
        headers: {
            Authorization: "Bearer " + token
        }
    });

const getTweet = async ({id, token, SKIP}) => 
    axios.post(`${BACKEND_URL}/tweets/fetch/${id}`, {SKIP}, {
        headers: {
            Authorization: "Bearer " + token
        }
    });

export default { getTweets, getTweet };