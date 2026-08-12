const Activity = require("../models/activity.model");

const createLog = async (logData) => {
  try {
    const log = new Activity(logData);
    return await log.save();
  } catch (error) {
    console.error("Error writing activity log:", error.message);
    throw error;
  }
};

const getLogs = async () => {
  try {
    return await Activity.find().sort({ createdAt: -1 });
  } catch (error) {
    console.error("Error retrieving activity logs:", error.message);
    throw error;
  }
};

// const getActivities = async () => {
//   return await Activity.find()
//     .sort({ createdAt: -1 })
//     .limit(10);
// };

module.exports = {
  createLog,
  getLogs,
  // getActivities
};