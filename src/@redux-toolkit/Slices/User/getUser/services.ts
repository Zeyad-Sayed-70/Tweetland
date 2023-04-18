import axios from "axios";
import { BACKEND_URL } from "../../../../constants/backend";

const getUser = async ({token, tagName}) => 
    axios.get(`${BACKEND_URL}/user/specific/${tagName}`, {
        headers: {
            authorization: `Bearer ${token}`,
        }
    });

export default { getUser }