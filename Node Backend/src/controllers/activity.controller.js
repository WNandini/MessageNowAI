const activityService = require("../services/activity.service");

const getActivityLogs = async (req, res) => {
  try {
    const logs = await activityService.getLogs();
    return res.status(200).json({
      success: true,
      data: logs
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch activity logs",
      error: error.message
    });
  }
};

module.exports = {
  getActivityLogs
};