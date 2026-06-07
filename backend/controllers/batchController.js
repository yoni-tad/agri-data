const Batch = require('../models/Batch');

// @desc    Create new batch
// @route   POST /api/batches
// @access  Private/Vendor
const createBatch = async (req, res) => {
  try {
    const { quantityKg, notes, latitude, longitude } = req.body;
    let imageUrl = '';

    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    } else {
      return res.status(400).json({ message: 'Image is required' });
    }

    if (!quantityKg) {
      return res.status(400).json({ message: 'Quantity is required' });
    }

    const batchId = `BATCH-${Date.now()}`;

    const batch = new Batch({
      batchId,
      imageUrl,
      quantityKg,
      notes,
      latitude: latitude && latitude !== 'null' ? parseFloat(latitude) : null,
      longitude: longitude && longitude !== 'null' ? parseFloat(longitude) : null,
      createdBy: req.user._id,
    });

    const createdBatch = await batch.save();
    res.status(201).json(createdBatch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all batches for logged in user
// @route   GET /api/batches
// @access  Private
const getBatches = async (req, res) => {
  try {
    // Admins see all, Vendors see theirs
    const query = req.user.role === 'admin' ? {} : { createdBy: req.user._id };
    const batches = await Batch.find(query).sort({ createdAt: -1 }).populate('createdBy', 'name email');
    res.json(batches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get batch by ID
// @route   GET /api/batches/:id
// @access  Private
const getBatchById = async (req, res) => {
  try {
    const batch = await Batch.findById(req.params.id).populate('createdBy', 'name email');

    if (batch) {
      // Check if user is owner or admin
      if (batch.createdBy._id.toString() === req.user._id.toString() || req.user.role === 'admin') {
        res.json(batch);
      } else {
        res.status(403).json({ message: 'Not authorized to view this batch' });
      }
    } else {
      res.status(404).json({ message: 'Batch not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete batch
// @route   DELETE /api/batches/:id
// @access  Private
const deleteBatch = async (req, res) => {
  try {
    const batch = await Batch.findById(req.params.id);

    if (batch) {
      if (batch.createdBy.toString() === req.user._id.toString() || req.user.role === 'admin') {
        await Batch.deleteOne({ _id: batch._id });
        res.json({ message: 'Batch removed' });
      } else {
        res.status(403).json({ message: 'Not authorized to delete this batch' });
      }
    } else {
      res.status(404).json({ message: 'Batch not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBatch,
  getBatches,
  getBatchById,
  deleteBatch,
};
