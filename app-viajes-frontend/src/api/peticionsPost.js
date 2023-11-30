import axios from "axios";
import { API_URL } from "./constantes";

/*
ENDPOINTS API

MÉTODO GET
/post/                      =>      getAllPost
/post/author                =>      getPostByAuthor
/post/getPostId/:postId     =>      getPostById

MÉTODO POST
/post/create                =>      createPost

MÉTODO PUT
/post/:postId               =>      updatePost

MÉTODO DELETE
/post/:postId               =>      deletePost
*/

export const getAllpost = () => axios.get(`${API_URL}post`);

export const getPostByAuthor = (token) =>
  axios.get(`${API_URL}post/author/`, {
    headers: {
      Authorization: token,
    },
  });

export const getPostById = (token, postId) =>
  axios.get(`${API_URL}post/getPostId/${postId}`, {
    headers: {
      Authorization: token,
    },
  });

export const createPost = (token, data) =>
  axios.post(`${API_URL}post/create/`, data, {
    headers: {
      Authorization: token,
    },
  });

export const updatePost = (token, data, postId) =>
  axios.put(`${API_URL}post/${postId}`, data, {
    headers: {
      Authorization: token,
    },
  });

export const deletePost = (token, postId) =>
  axios.delete(`${API_URL}post/${postId}`, {
    headers: {
      Authorization: token,
    },
  });
