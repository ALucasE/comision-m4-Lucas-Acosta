import axios from "axios";
import { API_URL } from "./constantes";

/*
ENDPOINTS API

MÉTODO GET
/post/                      =>      getAllPost

MÉTODO POST
/post/author                =>      getPostByAuthor
/post/getPostId/:postId     =>      getPostById
/post/create                =>      createPost

MÉTODO PUT
/post/:postId               =>      updatePost

MÉTODO DELETE
/post/:postId               =>      deletePost
*/

export const getAllpost = () => axios.get(`${API_URL}post`);

export const getPostById = (data, postId) => axios.post(`${API_URL}post/getPostId/${postId}`, data);
