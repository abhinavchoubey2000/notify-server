const noteObj = [
	{ id: 1, letter: "A" },
	{ id: 2, letter: "B" },
	{ id: 3, letter: "C" },
	{ id: 4, letter: "D" },
	{ id: 5, letter: "E" },
	{ id: 6, letter: "F" },
];

const deleteNote = (Id) => {
	const index = noteObj.indexOf(noteObj.find((note) => note.id === Id));
	noteObj.splice(index, 1);
	return noteObj;
};

const a = 2

const modifyNote = (id, newLetter) => {
	const index = noteObj.indexOf(noteObj.find((note) => note.id === id));
	noteObj.splice(index, 1, { id, letter: newLetter });
	return noteObj;
};

const createNote = (letter) => {
	noteObj.splice(noteObj.length, 0, { id: noteObj.length + 1, letter });
	return noteObj;
};

const newNoteObj = createNote("h");
console.log(newNoteObj)