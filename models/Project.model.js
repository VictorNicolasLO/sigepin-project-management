const mongoose = require("mongoose");

const Participant = new mongoose.Schema(
	{
		roleId: String,
		participantId: String,
	},
	{
		_id: false,
	},
);

const ProjectsSchema = new mongoose.Schema({
	title: { type: String, required: true, unique: true },
	participants: { type: [Participant], required: true },
	overview: { type: String, required: true },
	content: { type: String, required: true },
	imageUrl: { type: String, required: true },
	createdAt: { type: Date, required: true },
	areaId: { type: String, required: true },
});

module.exports = mongoose.model("projects", ProjectsSchema);
