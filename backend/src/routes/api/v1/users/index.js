import { Router } from "express";
import { getAllUsers, getOneUser, createOneUser, uploadAvatar } from "./handlers.js";

const router = Router();
router.get('/', getAllUsers);
router.post('/', createOneUser);
router.get('/profile', getOneUser);
router.post('/profile', uploadAvatar);
export default router;
