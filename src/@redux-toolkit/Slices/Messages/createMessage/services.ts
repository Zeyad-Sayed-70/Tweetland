import axios from "axios";
import { BACKEND_URL } from "../../../../constants/backend";

const createMessage = async ({chatId, message, token}) => 
    axios.post(`${BACKEND_URL}/chats/message`, {chatId, message}, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });

export default { createMessage }