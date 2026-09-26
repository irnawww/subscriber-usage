const express = require("express");

const router = express.Router();

const {
  addUsage,
  getAllUsage,
  getUsageBySubscriber,
} = require("../services/usageService");

router.post("/", (req, res) => {
  const {
    subscriberId,
    callMinutes,
    smsCount,
    dataUsageMB,
  } = req.body;

  // Validate subscriberId
  if (
    typeof subscriberId !== "string" ||
    subscriberId.trim() === ""
  ) {
    return res.status(400).json({
      message: "subscriberId must be a non-empty string",
    });
  }

  // Validate callMinutes
  if (
    typeof callMinutes !== "number" ||
    !Number.isFinite(callMinutes) ||
    callMinutes < 0
  ) {
    return res.status(400).json({
      message: "callMinutes must be a number greater than or equal to 0",
    });
  }

  // Validate smsCount
  if (
    typeof smsCount !== "number" ||
    !Number.isInteger(smsCount) ||
    smsCount < 0
  ) {
    return res.status(400).json({
      message: "smsCount must be a non-negative integer",
    });
  }

  // Validate dataUsageMB
  if (
    typeof dataUsageMB !== "number" ||
    !Number.isFinite(dataUsageMB) ||
    dataUsageMB < 0
  ) {
    return res.status(400).json({
      message: "dataUsageMB must be a number greater than or equal to 0",
    });
  }

  const record = {
    subscriberId: subscriberId.trim(),
    callMinutes,
    smsCount,
    dataUsageMB,
    timestamp: new Date().toISOString(),
  };

  addUsage(record);

  return res.status(201).json(record);
});

router.get("/", (req, res) => {
  return res.status(200).json(getAllUsage());
});

router.get("/:subscriberId", (req, res) => {
  const records = getUsageBySubscriber(req.params.subscriberId);

  return res.status(200).json(records);
});

module.exports = router;