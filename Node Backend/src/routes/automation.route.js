const express = require("express");
const router = express.Router();
const { createAutomation, getAutomations } = require("../controllers/automation.controller");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * /automation:
 *   post:
 *     summary: Create a new automation
 *     tags: [Automation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - keyword
 *               - message
 *             properties:
 *               keyword:
 *                 type: string
 *               message:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Automation created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 *   get:
 *     summary: Fetch all automations
 *     tags: [Automation]
 *     responses:
 *       200:
 *         description: List of automations
 *       500:
 *         description: Server error
 */
router.post("/", authMiddleware, createAutomation);
router.get("/", authMiddleware, getAutomations);

module.exports = router;