import axios from "axios";
import { BACKEND_URL } from "../../../../constants/backend";

const deleteTweet = async ({id, token}) => 
    axios.delete(`${BACKEND_URL}/tweets/delete/${id}`, {
        headers: {
            Authorization: "Bearer " + token,
        }
    });

export default { deleteTweet }