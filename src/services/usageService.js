const usageRecords = [];

function addUsage(record) {
  usageRecords.push(record);

  return record;
}

function getAllUsage() {
  return usageRecords;
}

function getUsageBySubscriber(subscriberId) {
  return usageRecords.filter(
    (record) => record.subscriberId === subscriberId
  );
}

module.exports = {
  addUsage,
  getAllUsage,
  getUsageBySubscriber,
};