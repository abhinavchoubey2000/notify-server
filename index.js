//Importing server libraries
const express = require("express");
const app = express();
const cors = require("cors");

//Importing database
const { connectDatabase } = require("./db/database");
connectDatabase();
const { modal } = require("./db/schema");

//Setting port number
const port = 4000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(express.static(__dirname+"/renderer"))

// Server
app.listen(port, () => {
	console.log(`http://localhost:${4000}`);
});

// Routes
app.get('/', (req, res)=>{
	res.sendFile('/index.html')
})

app.get("/rendernotes", async(req, res) => {
	const allNotes = await modal.find({});
	
	if (allNotes.length === 0) {
		return res
			.status(200)
			.json({ success: true, message: "Notes fetched", allNotes: [] });
	}
	try {
		res.status(200).json({ success: true, message: "Notes fetched", allNotes });
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
});

app.post("/createnote", async (req, res) => {
	const { title, description } = req.body;
	const time = new Date();
	const formattedTime = time.toLocaleTimeString("en-IN", {
		hour12: true,
		hour: "2-digit",
		minute: "2-digit",
	});

	const date = new Date();
	const formattedDate = date.toLocaleDateString("en-IN", {
		weekday: "short",
		day: "2-digit",
		month: "short",
		year: "2-digit",
	});
	try {
		const createdNote = await modal.create({
			title:title===""?"":title,
			description:description===""?"":description,
			dateTime: `${formattedTime} ${formattedDate}`,
		});

		res.status(200).json({
			success: true,
			message: "Note created",
			createdNote,
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
});

app.post("/modifynote", async (req, res) => {
	const { id, newTitle, newDescription } = req.body;
	const noteToBeModified = modal.findById(id);

	const time = new Date();
	const formattedTime = time.toLocaleTimeString("en-IN", {
		hour12: true,
		hour: "2-digit",
		minute: "2-digit",
	});

	const date = new Date();
	const formattedDate = date.toLocaleDateString("en-IN", {
		weekday: "short",
		day: "2-digit",
		month: "2-digit",
		year: "2-digit",
	});

	try {
		if (!noteToBeModified) {
			return res.status(404).json({
				success: false,
				message: "ID not found. Enter the ID that exists.",
			});
		}

		await modal.findByIdAndUpdate(id, {
			title: newTitle,
			description: newDescription,
			dateTime: `${formattedTime} ${formattedDate} (Modified)`,
		});

		res.status(200).json({
			success: true,
			message: "Note modified",
			modifiedNote: {
				id: id,
				title: newTitle,
				description: newDescription,
			},
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
});

app.post("/deletenote", async (req, res) => {
	const { id } = req.body;
	const noteToBeDeleted = await modal.findById(id);

	try {
		if (!noteToBeDeleted) {
			return res.status(404).json({
				success: false,
				message: "ID not found. Enter the ID that exists.",
			});
		}

		const deletedNote = await modal.deleteOne({ _id: id });

		res.status(200).json({
			success: true,
			message: "Note deleted",
			deletedNote,
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
});
