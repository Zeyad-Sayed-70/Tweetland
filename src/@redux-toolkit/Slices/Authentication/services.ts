import axios from "axios";

const register = async (data) => 
    axios.post('http://localhost:5000/authentication/register', data);

const login = async (data) => 
    axios.post('http://localhost:5000/authentication/login', data);

export default { register, login }