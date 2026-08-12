const express = require("express");
const router = express.Router();

const { getPosts } = require("../controllers/instagram.controller");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/posts", authMiddleware, getPosts);

module.exports = router;