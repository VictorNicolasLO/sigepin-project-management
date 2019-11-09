const mongoose = require("mongoose");
/**
 * Status :
 * 0 : CREATED
 * 1 : ACCEPTED
 * 2 : REJECTED
 */
const ProjectRequestsSchema = new mongoose.Schema({
	participantProspectId: { type: String },
	projectId: { type: String },
	status: { type: Number },
});
module.exports = mongoose.model("projectRequests", ProjectRequestsSchema);
