/*                     ENDPOINTS AUTH                     */
import { Router } from "express";
import { signUp, signIn, logout, changePassword, getUserById } from "../controllers/user.controller.js";
import { avatarValidation, emailValidation, passwordValidation, usernameValidation, newPasswordValidation } from "../validations/userValidations.js";
import { validateAccessToken } from "../utils/jwt.validate.js";

const authRouter = Router();

authRouter.post("/register", [avatarValidation, emailValidation, passwordValidation, usernameValidation], signUp);
authRouter.post("/login", signIn);
authRouter.post("/logout", logout);
authRouter.put("/change-password", [newPasswordValidation], changePassword);
authRouter.get("/profile", [validateAccessToken], getUserById);

export { authRouter };
