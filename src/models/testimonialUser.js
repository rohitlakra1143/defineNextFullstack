const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
    testimonialId: { type: Number,required: true, },
    name: { type: String, required: true, minlength: 3 },
    lastname: String,
    description: { type: String },
    image: { type: String },
    post: {
        type: String, required: true,
       // enum: ['CEO', 'CTO']
    },
    isActive: { type: Boolean, default: true },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }

});

const User = mongoose.model('TestimonialUser', TestimonialSchema);
module.exports = User;