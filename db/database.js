const mongoose = require("mongoose");

exports.connectDatabase = async () => {
	try {
		await mongoose.connect(
			"mongodb+srv://test:cooldudeabhinav@cluster0.htcid.mongodb.net/Notify?"
		);
		console.log("Successfully connected to database.");
	} catch (error) {
		console.log(error.message);
	}
};
