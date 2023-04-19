import axios from "axios";
import { BACKEND_URL } from "../../../constants/backend";

const register = async (data) => 
    axios.post(`${BACKEND_URL}/authentication/register`, data);

const login = async (data) => 
    axios.post(`${BACKEND_URL}/authentication/login`, data);

export default { register, login }