const { Mongoose } = require("mongoose");

const userSchema = new Mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {

        },
    }, 
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (_doc, ret) => {
                delete ret.password;
                return ret;
            }
        }
    }
)

module.exports = mongoose.model('User', userSchema)