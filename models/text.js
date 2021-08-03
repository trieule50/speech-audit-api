const mongoose = require("mongoose");

const textSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    }, 
    {
        timestamps: true
    }
)

const Text = mongoose.model('Text', userSchema);

module.exports = Text;