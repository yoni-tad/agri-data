const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  exportData,
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/auth');

router.get('/dashboard', protect, admin, getDashboardStats);
router.get('/export', protect, admin, exportData);

module.exports = router;
