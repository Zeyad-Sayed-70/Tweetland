import axios from "axios";
import { BACKEND_URL } from "../../../../constants/backend";

const createTweet = async ({formData, token}) => 
    axios.post(`${BACKEND_URL}/tweets/create`, formData, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });

export default { createTweet }