const webhookService = require("../services/webhook.service");

const verifyWebhook = (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === process.env.WEBHOOK_VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
};

const receiveWebhook = async (req, res) => {
  try {
    // Process the event in webhook service
    await webhookService.processWebhookEvent(req.body);

    // Always acknowledge receipt to Meta immediately
    return res.status(200).send("EVENT_RECEIVED");
  } catch (error) {
    console.error("Webhook processing error:", error.message);
    return res.status(200).send("EVENT_RECEIVED");
  }
};

module.exports = {
  verifyWebhook,
  receiveWebhook,
};