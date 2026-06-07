const express = require('express');
const router = express.Router();
const {
  createBatch,
  getBatches,
  getBatchById,
  deleteBatch,
} = require('../controllers/batchController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.route('/')
  .post(protect, upload.single('image'), createBatch)
  .get(protect, getBatches);

router.route('/:id')
  .get(protect, getBatchById)
  .delete(protect, deleteBatch);

module.exports = router;
