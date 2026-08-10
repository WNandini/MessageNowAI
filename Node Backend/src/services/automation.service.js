const Automation = require("../models/automation.model");

const createAutomation = async (data) => {
  try {
    const automation = new Automation(data);
    return await automation.save();
  } catch (error) {
    console.error("Error creating automation:", error.message);
    throw error;
  }
};

const findAutomationByKeyword = async (keyword) => {
  try {
    if (!keyword) return null;
    const normalizedKeyword = keyword.trim().toLowerCase();
    return await Automation.findOne({ keyword: normalizedKeyword });
  } catch (error) {
    console.error("Error finding automation by keyword:", error.message);
    throw error;
  }
};

const getAllAutomations = async () => {
  try {
    return await Automation.find().sort({ createdAt: -1 });
  } catch (error) {
    console.error("Error fetching automations:", error.message);
    throw error;
  }
};

module.exports = {
  createAutomation,
  findAutomationByKeyword,
  getAllAutomations
};