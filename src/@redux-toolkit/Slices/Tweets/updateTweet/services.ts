import axios from "axios";
import { BACKEND_URL } from "../../../../constants/backend";

const updateTweet = async ({id, text}) => 
    axios.patch(`${BACKEND_URL}/tweets/update/${id}`, {text});

export default { updateTweet }