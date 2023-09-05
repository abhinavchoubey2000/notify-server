const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	title: {
		type: String,
	},
	description: {
		type: String,
	},
	dateTime: {
		type: String,
		required: true,
	},
});

const modal = mongoose.model("mynotes", schema);

module.exports = { modal };
