import axios from "axios";
import { BACKEND_URL } from "../../../../constants/backend";

const addLike = async ({ token, pid, uid, type, me, oid }) => 
    axios.patch(`${BACKEND_URL}/tweets/like`, {pid, uid, type, me, oid});

export default { addLike }