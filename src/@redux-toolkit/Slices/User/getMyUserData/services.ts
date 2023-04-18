import axios from "axios";
import { BACKEND_URL } from "../../../../constants/backend";

const getUser = async ({token}) => 
    axios.get(`${BACKEND_URL}/user/me`, {
        headers: {
            authorization: `Bearer ${token}`,
        }
    });

export default { getUser }