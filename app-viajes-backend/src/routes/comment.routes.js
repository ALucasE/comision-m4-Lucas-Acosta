import { Router } from "express";
import { createComment, getCommentsByPostId, updateComment, deleteComment } from "../controllers/comment.controller.js";
import { validateAccessToken } from "../utils/jwt.validate.js";
import { descriptionValidation } from "../validations/commentValidations.js";
const commentRouter = Router();

commentRouter.post("/", [validateAccessToken, descriptionValidation], createComment);
// commentRouter.get("/", [validateAccessToken], getCommentById);
commentRouter.get("/:postId", [validateAccessToken], getCommentsByPostId);
commentRouter.put("/:commentId", [validateAccessToken, descriptionValidation], updateComment);
commentRouter.delete("/:commentId", [validateAccessToken, descriptionValidation], deleteComment);

export { commentRouter };
