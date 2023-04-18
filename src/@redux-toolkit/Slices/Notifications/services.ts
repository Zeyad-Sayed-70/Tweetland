import axios from "axios";
import { BACKEND_URL } from "../../../constants/backend";

const getNotifications = async ({id, token}) => 
    axios.get(`${BACKEND_URL}/notifications/${id}`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });

export default { getNotifications }