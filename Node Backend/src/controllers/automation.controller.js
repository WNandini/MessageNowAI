const automationService = require("../services/automation.service");

const createAutomation = async (req, res) => {
  try {
    const { keyword, message, isActive } = req.body;

    if (!keyword || !message) {
      return res.status(400).json({
        success: false,
        message: "keyword and message are required."
      });
    }

    const automation = await automationService.createAutomation({
      keyword,
      message,
      isActive
    });

    return res.status(201).json({
      success: true,
      data: automation
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create automation",
      error: error.message
    });
  }
};

const getAutomations = async (req, res) => {
  try {
    const automations = await automationService.getAllAutomations();
    return res.status(200).json({
      success: true,
      data: automations
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch automations",
      error: error.message
    });
  }
};

module.exports = {
  createAutomation,
  getAutomations
};