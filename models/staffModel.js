const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema(
    {
        staffId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Staff',
            required: true
        },
        job: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
