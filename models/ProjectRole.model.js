const mongoose = require("mongoose");

const ProjectRolesSchema = new mongoose.Schema({
	name: { type: String, unique: true },
});
module.exports = mongoose.model("projectRoles", ProjectRolesSchema);
