/*                     ENDPOINTS AUTH                     */
import { Router } from "express";
import { createPost, deletePost, getAllPost, getPostById, updatePost, getPostByAuthor } from "../controllers/post.controller.js";
import { descriptionValidation, imageValidation, titleValidation } from "../validations/postValidations.js";
import { validateAccessToken } from "../utils/jwt.validate.js";

const postRouter = Router();

postRouter.get("/", getAllPost);
postRouter.get("/author", [validateAccessToken], getPostByAuthor);
postRouter.get("/getPostId/:postId", [validateAccessToken], getPostById);
postRouter.post("/create", [validateAccessToken, descriptionValidation, imageValidation, titleValidation], createPost);
postRouter.put("/:postId", [validateAccessToken, descriptionValidation, imageValidation, titleValidation], updatePost);
postRouter.delete("/:postId", [validateAccessToken], deletePost);

export { postRouter };
