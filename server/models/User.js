const mongoose = require("mongoose");
const {
    Schema
} = mongoose;

const userSchema = newSchema({
    googleId: String
});

mongoose.model('users', userSchema);