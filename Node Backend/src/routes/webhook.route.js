const express = require("express");
const router = express.Router();
const { verifyWebhook, receiveWebhook } = require("../controllers/webhook.controller");

/**
 * @swagger
 * /webhook:
 *   get:
 *     summary: Verify Meta Webhook
 *     tags: [Webhook]
 *     parameters:
 *       - in: query
 *         name: hub.mode
 *         schema:
 *           type: string
 *       - in: query
 *         name: hub.verify_token
 *         schema:
 *           type: string
 *       - in: query
 *         name: hub.challenge
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Webhook verified successfully
 *
 *   post:
 *     summary: Receive Instagram Webhook Events
 *     tags: [Webhook]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               object: "instagram"
 *               entry:
 *                 - id: "17841400000000000"
 *                   time: 1712345678
 *                   changes:
 *                     - field: "comments"
 *                       value:
 *                         from:
 *                           id: "232323232"
 *                           username: "test"
 *                         media:
 *                           id: "123123123"
 *                           media_product_type: "FEED"
 *                         id: "17865799348089039"
 *                         parent_id: "1231231234"
 *                         text: "guide"
 *     responses:
 *       200:
 *         description: EVENT_RECEIVED
 */

router.get("/webhook", verifyWebhook);
router.post("/webhook", receiveWebhook);

module.exports = router;