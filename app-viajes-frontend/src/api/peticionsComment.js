import axios from "axios";
import { API_URL } from "./constantes";
//"http://localhost:3000/api/";

const URL_COMMENT = `${API_URL}comments/`;
//http://localhost:3000/api/comment/

/*
ENDPOINTS API
http://localhost:3000/api/comment/

MÉTODO GET

/:postId                    =>      getCommentsByPostId         http://localhost:3000/api/comment/:postId

MÉTODO POST
/                           =>      createComment               http://localhost:3000/api/comment/

MÉTODO PUT
/:commentId                 =>      updatePost                  http://localhost:3000/api/comment/:commentId

MÉTODO DELETE
/:commentId                 =>      deletePost                  http://localhost:3000/api/comment/:commentId

*/
//const token = localStorage.getItem("token");

export const getCommentsByPostId = (token, postId) =>
  axios.get(`${URL_COMMENT}${postId}`, {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  });

export const createComment = (token, data) =>
  axios.post(`${URL_COMMENT}`, data, {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  });

export const updateComment = (token, data, commentId) =>
  axios.put(`${URL_COMMENT}${commentId}`, data, {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  });

export const deleteComment = (token, commentId) =>
  axios.delete(`${URL_COMMENT}${commentId}`, {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  });
