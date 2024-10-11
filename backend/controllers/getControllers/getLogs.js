import "colors";
import { User } from "../../models/User.js";
import { Log } from "../../models/Log.js";

export const getLogs = async (req, res) => {
  const id = req.user.id;
  const { page } = req.params;
  const logsPerPage = 10;

  try {
    const user = await User.findById(id);
    if (!user.isAdmin) {
      console.log(`User is not an admin`.bgRed);
      return res.status(401).json({ message: "User is not an admin" });
    }

    const skip = (page - 1) * logsPerPage;
    const totalLogs = await Log.countDocuments();
    const logs = await Log.find()
      .sort({ date: -1 })
      .skip(skip)
      .limit(logsPerPage)
      .populate("user", "name email");

    const updatedLogs = logs.map((log) => {
      return {
        user: log.user.name,
        email: log.user.email,
        action: log.action,
        date: log.createdAt,
      };
    });

    console.log(updatedLogs);

    return res.status(200).json({
      logs: updatedLogs,
      totalPages: Math.ceil(totalLogs / logsPerPage),
    });
  } catch (error) {
    console.log(`Error during retrieving logs: ${error}`.bgRed);
    return res.status(500).json({ message: error.message });
  }
};
