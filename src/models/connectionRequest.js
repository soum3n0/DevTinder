const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"    // refers to the user collection
    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    status : {
        type : String,
        enum : {
            values : ["pass", "like", "accepted", "rejected"],
            message : `{VALUE} is not supported`
        }
    }
}, {
    timestamps : true
});

connectionRequestSchema.index({fromUserId : 1, toUserId : 1});  // compound index for better fast searching

connectionRequestSchema.pre("save", function (next) {
    if(this.fromUserId.equals(this.toUserId)){
        throw new Error("You cannot send connection to yourself");
    }
    next();
});

const ConnectionRequestModel = new mongoose.model("ConnectionRequest", connectionRequestSchema);
module.exports = ConnectionRequestModel;