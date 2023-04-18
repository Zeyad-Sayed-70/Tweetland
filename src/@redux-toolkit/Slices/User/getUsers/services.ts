import axios from "axios";
import { BACKEND_URL } from "../../../../constants/backend";

const getUsers = async (token: string) => 
    axios.get(`${BACKEND_URL}/user/all`, {
        headers: {
            authorization: `Bearer ${token}`,
        }
    });

export default { getUsers }