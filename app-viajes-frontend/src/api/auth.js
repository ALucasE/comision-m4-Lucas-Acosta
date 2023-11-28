import axios from "axios";
import { API_URL } from "./constantes";

export const reqRegister = (user) => axios.post(`${API_URL}auth/register`, user);

export const reqLogin = (user) => axios.post(`${API_URL}auth/login`, user);

//Authorization: token,
