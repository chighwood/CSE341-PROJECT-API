const { handleErrors } = require('./errorController');
const Joi = require('joi');
const Staff = require('../models/staffModel');

// Validation schema for creating an staff
const staffSchema = Joi.object({
  name: Joi.string().min(3).required(),
  job: Joi.string().required(),
});

// Validation schema for updating an staff
const staffSchemaForUpdate = Joi.object({
  name: Joi.string().min(3).optional(),
  job: Joi.string().optional(),
});

// Create a new staff
exports.createStaff = handleErrors(async (req, res) => {

  const { error } = staffSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const staff = new Staff(req.body);
    await staff.save();
    res.status(201).json(staff);
  } catch {
    res.status(500).json({ error: 'Error creating staff.' });
  }
});

// Update a staff
exports.updateStaff = handleErrors(async (req, res) => {

  const { staffId } = req.params;
  const { error } = staffSchemaForUpdate.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const updatedStaff = await Animal.findByIdAndUpdate(staffId, req.body, { new: true });
    if (!updatedStaff) return res.status(404).json({ error: 'Staff not found' });
    res.json(updatedStaff);
  } catch {
    res.status(500).json({ error: 'Error updating staff.' });
  }
});

// Get all staff
exports.getAllStaff = handleErrors(async (req, res) => {

  try {
    const staff = await Staff.find();
    res.status(200).json(staff);
  } catch {
    res.status(500).json({ error: 'Error fetching staff.' });
  }
});

// Get a single staff by ID
exports.getStaffById = handleErrors(async (req, res) => {

  const { staffId } = req.params;
  try {
    const staff = await Staff.findById(staffId);
    if (!staff) {
      return res.status(404).json({ error: 'Staff not found.' });
    }
    res.status(200).json(staff);
  } catch {
    res.status(500).json({ error: 'Error retrieving staff info.' });
  }
});

// Delete an staff by ID
exports.deleteStaff = handleErrors(async (req, res) => {

  const { staffId } = req.params;
  try {
    const staff = await Staff.findByIdAndDelete(staffId);
    if (!staff) {
      return res.status(404).json({ error: 'Staff not found.' });
    }
    res.status(200).json({ message: 'Staff deleted successfully.' });
  } catch {
    res.status(500).json({ error: 'Error deleting staff.' });
  }
});