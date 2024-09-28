const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const filmSchema = new Schema({
    film: {
        name: {type: String, required: true},
        id: {type: String, required: true},
        release: {type: Date, required: true},
        runtime: {type: Number, required: true},
        budget: {type: Number, required: true},
        revenue: {type: Number, required: true},
        vote_average: {type: Number, required: true},
        votes_count: {type: Number, required: true}
    },
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],  
    cast: [{ type: Schema.Types.ObjectId, ref: "Cast" }]            
});

module.exports = mongoose.model("Movie", filmSchema);