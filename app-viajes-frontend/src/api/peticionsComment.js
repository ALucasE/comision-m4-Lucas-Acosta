import axios from "axios";
import { API_URL } from "./constantes";
//"http://localhost:3000/api/";

const URL_COMMENT = `${API_URL}comment/`;
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




commentRouter.put("/:commentId", [validateAccessToken, descriptionValidation], updateComment);
commentRouter.delete("/:commentId", [validateAccessToken, descriptionValidation], deleteComment);
*/
const token = localStorage.getItem("token");

export const getCommentsByPostId = (postId) =>
  axios.get(`${URL_COMMENT}${postId}`, {
    headers: {
      Authorization: token,
    },
  });

export const createComment = (data) =>
  axios.post(`${URL_COMMENT}`, data, {
    headers: {
      Authorization: token,
    },
  });

export const updatePost = (data, commentId) =>
  axios.put(`${URL_COMMENT}${commentId}`, data, {
    headers: {
      Authorization: token,
    },
  });

export const deletePost = (commentId) =>
  axios.delete(`${URL_COMMENT}${commentId}`, {
    headers: {
      Authorization: token,
    },
  });
