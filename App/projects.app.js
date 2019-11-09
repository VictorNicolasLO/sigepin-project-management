const { projectRepository } = require("../repositories/Projects.repository");
const {
	projectRequestRepository,
} = require("../repositories/projectRequests.repository");

const { PARTICIPANT_ALREADY_IN_PROJECT } = require("./projects.const");

const REQUEST_CREATED = 0;
const REQUEST_ACCEPTED = 1;
const REQUEST_REJECTED = 2;

class ProjectsApp {
	constructor() {
		this.createProject = projectRepository.create;
		this.updateProject = projectRepository.update;
		this.findProject = projectRepository.find;
		this.findProjectById = projectRepository.findById;
	}

	async addParticipantToProject(projectId, participantId, roleId) {
		const project = await projectRepository.findById(projectId);
		const existParticipant = project.participants
			? project.participants.find(
				(participant) => participant.participantId === participantId,
			)
			: false;
		if (existParticipant) throw Error(PARTICIPANT_ALREADY_IN_PROJECT);
		project.participants.push({ participantId, roleId });
		await project.save();
		return project.toJSON();
	}

	async removeParticipantFromProject(id, participantId) {
		const project = await projectRepository.findById(id);
		const participants = project.participants.filter(
			(participant) => participant.participantId !== participantId,
		);
		project.participants = participants;
		await project.save();
		return project.toJSON();
	}

	async makeParticipationRequest(participantProspectId, projectId) {
		return await projectRequestRepository.create({
			participantProspectId,
			projectId,
			status: REQUEST_CREATED,
		});
	}

	async acceptParticipationRequest(requestId, roleId) {
		const projectRequest = await projectRequestRepository.findById(requestId);
		projectRequest.status = REQUEST_ACCEPTED;
		await projectRequest.save();
		await this.addParticipantToProject(
			projectRequest.projectId,
			projectRequest.participantProspectId,
			roleId,
		);
		return projectRequest;
	}

	async rejectParticipationRequest(requestId) {
		return await projectRequestRepository.update(
			{ _id: requestId },
			{
				status: REQUEST_REJECTED,
			},
		);
	}
}

module.exports = { ProjectsApp, projectsApp: new ProjectsApp() };
