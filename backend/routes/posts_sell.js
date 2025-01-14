import express from "express";
import { createPost,readFeed,readSpec,update,deletePost } from "../controllers/posts_buy.js";
import {verify}  from "../middlewares/auth.js";

const router = express.Router();

//creation
router.post("/newPosts",verify,createSellPost);

//finding
router.get("/",verify,readFeed); //feed
router.get("/:postid",verify,readSpec);//specific

//updating-commenting and adding new comments
router.patch("/comments/:postid",verify,update);

//deletion
router.delete("/delete/:postid",verify,deletePost)

export default router;
