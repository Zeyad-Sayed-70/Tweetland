import axios from "axios";
import { BACKEND_URL } from "../../../../constants/backend";

const getMessages = async ({chatId, userData, token}) => 
    axios.post(`${BACKEND_URL}/chats`, {chatId, userData}, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });

export default { getMessages }