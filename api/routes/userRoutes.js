import express from "express"
import { getUser, updateUser, searchUser } from "../controllers/userController.js"

const router = express.Router()

router.get("/find/:userId", getUser)
router.put("/", updateUser)
router.get("/search", searchUser)

export default router

