const automationService = require("./automation.service");
const instagramService = require("./instagram.service");
const activityService = require("./activity.service");
const InstagramUser = require("../models/instagramUser.model");

const processWebhookEvent = async (body) => {
  try {
    const entry = body.entry?.[0];
    const change = entry?.changes?.[0];
    const value = change?.value;

    if (!value || change.field !== "comments") {
      return;
    }

    // Instagram Business Account ID receiving the comment
    const instagramBusinessAccountId = entry.id;
    const commentId = value.id;
    const instagramUserId = value.from?.id;
    const commentText = value.text;

    // Find the Instagram account that owns the automation
    const instagramAccount = await InstagramUser.findOne({
      webhookAccountId: instagramBusinessAccountId,
    });

    if (!instagramAccount || !instagramAccount.accessToken) {
      return;
    }

    // Match keyword
    const matchedAutomation =
      await automationService.findAutomationByKeyword(commentText);

    if (!matchedAutomation) {
      return;
    }

    const dmResult = await instagramService.sendDirectMessage(
      commentId,
      matchedAutomation.message,
      instagramAccount.accessToken
    );

    if (dmResult.success) {
      await activityService.createLog({
        automationId: matchedAutomation._id,
        instagramUserId,
        commentId,
        commentText,
        keyword: matchedAutomation.keyword,
        messageSent: matchedAutomation.message,
        status: "SUCCESS",
        error: null,
      });
    } else {
      await activityService.createLog({
        automationId: matchedAutomation._id,
        instagramUserId,
        commentId,
        commentText,
        keyword: matchedAutomation.keyword,
        messageSent: matchedAutomation.message,
        status: "FAILED",
        error: dmResult.error,
      });
    }

  } catch (error) {
    console.error("Error processing webhook payload:", error);
  }
};

module.exports = {
  processWebhookEvent
};