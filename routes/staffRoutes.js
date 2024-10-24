const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authenticate');
const staffController = require('../controllers/staffController');

router.get('/', staffController.getAllStaff);

router.get('/:staffId', staffController.getStaffById);

router.post('/', isAuthenticated, staffController.createStaff);

router.put('/:staffId', isAuthenticated, staffController.updateStaff);

router.delete('/:staffId', isAuthenticated, staffController.deleteStaff);

module.exports = router;
