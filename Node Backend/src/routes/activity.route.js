const express = require("express");
const router = express.Router();
const { getActivityLogs } = require("../controllers/activity.controller");

/**
 * @swagger
 * /activity:
 *   get:
 *     summary: Fetch all activity logs sorted by latest
 *     tags: [Activity]
 *     responses:
 *       200:
 *         description: List of activity logs
 *       500:
 *         description: Server error
 */
router.get("/", getActivityLogs);

module.exports = router;