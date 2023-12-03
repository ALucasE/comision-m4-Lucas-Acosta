import axios from "axios";
import { API_URL } from "./constantes";

export const reqRegister = (user) => axios.post(`${API_URL}auth/register`, user);

export const reqLogin = (user) => axios.post(`${API_URL}auth/login`, user);

//Authorization: token,

export const checkUsername = (username) => axios.get(`${API_URL}auth/check-username/${username}`);

export const checkEmail = async (email) => axios.get(`${API_URL}auth/check-email/${email}`);
