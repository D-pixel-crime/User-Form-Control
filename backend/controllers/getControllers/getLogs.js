import "colors";
import { User } from "../../models/User.js";
import { Log } from "../../models/Log.js";

export const getLogs = async (req, res) => {
  const id = req.user.id;
  const { page } = req.query;
  const { filter } = req.query;
  const logsPerPage = 10;

  try {
    const user = await User.findById(id);
    if (!user.isAdmin) {
      console.log(`User is not an admin`.bgRed);
      return res.status(401).json({ message: "User is not an admin" });
    }

    const skip = (page - 1) * logsPerPage;

    let filterCondition = {};
    if (filter) {
      if (filter === "Others") {
        filterCondition = { action: { $nin: ["Login", "Logout"] } };
      } else {
        filterCondition = { action: filter };
      }
    }

    const totalLogs = await Log.countDocuments(filterCondition);

    const logs = await Log.find(filterCondition)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(logsPerPage)
      .populate("user", "name email");

    const updatedLogs = logs.map((log) => ({
      user: log.user.name,
      email: log.user.email,
      action: log.action,
      date: log.createdAt,
    }));

    return res.status(200).json({
      logs: updatedLogs,
      totalPages: Math.ceil(totalLogs / logsPerPage),
    });
  } catch (error) {
    console.log(`Error during retrieving logs: ${error}`.bgRed);
    return res.status(500).json({ message: error.message });
  }
};
