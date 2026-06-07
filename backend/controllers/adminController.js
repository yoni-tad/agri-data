const User = require('../models/User');
const Batch = require('../models/Batch');
const { Parser } = require('json2csv');

// @desc    Get admin dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalVendors = await User.countDocuments({ role: 'vendor' });
    const totalBatches = await Batch.countDocuments();
    const recentSubmissions = await Batch.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('createdBy', 'name email');

    res.json({
      totalUsers,
      totalVendors,
      totalBatches,
      recentSubmissions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Export batches as CSV
// @route   GET /api/admin/export
// @access  Private/Admin
const exportData = async (req, res) => {
  try {
    const batches = await Batch.find().populate('createdBy', 'name');

    const fields = [
      { label: 'Batch ID', value: 'batchId' },
      { label: 'Vendor Name', value: 'createdBy.name' },
      { label: 'Quantity (Kg)', value: 'quantityKg' },
      { label: 'Notes', value: 'notes' },
      { label: 'Latitude', value: 'latitude' },
      { label: 'Longitude', value: 'longitude' },
      { label: 'Date', value: 'createdAt' },
    ];

    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(batches);

    res.header('Content-Type', 'text/csv');
    res.attachment('agridata-export.csv');
    return res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboardStats,
  exportData,
};
