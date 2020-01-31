"use strict";

const appName = "project-management";


const { projectsApp } = require("../App/projects.app");
const { projectRolesApp } = require("../App/projectRoles.app");
module.exports = {
	name: `rpc.${appName}`,
	settings: {},
	actions: {
		async createProject({ params, broker }) {
			const result = await projectsApp.createProject(params.project);
			broker.emit(`ev.${appName}.projectCreated`, {
				req: params,
				res: result,
			});
			return result;
		},
		async updateProject({ params, broker }) {
			const result = await projectsApp.updateProject(
				params.projectId,
				params.project,
			);
			broker.emit(`ev.${appName}.projectUpdated`, {
				req: params,
				res: result,
			});
			return result;
		},
		async addParticipantToProject({ params, broker }) {
			const result = await projectsApp.addParticipantToProject(
				params.projectId,
				params.participantId,
				params.projectRoleId,
			);
			broker.emit(`ev.${appName}.participantAddedToProject`, {
				req: params,
				res: result,
			});
			return result;
		},
		async removeParticpantFromProject({ params, broker }) {
			const result = await projectsApp.removeParticipantFromProject(
				params.projectId,
				params.participantId,
			);
			broker.emit(`ev.${appName}.participantRemoved`, {
				req: params,
				res: result,
			});
			return result;
		},
		async makeParticipationRequest({ params, broker }) {
			const result = await projectsApp.makeParticipationRequest(
				params.participantProspectId,
				params.projectId,
			);
			broker.emit(`ev.${appName}.participationRequestMade`, {
				req: params,
				res: result,
			});
			return result;
		},
		async acceptParticipationRequest({ params, broker }) {
			const result = await projectsApp.acceptParticipationRequest(
				params.participationRequestId,
				params.projectRoleId,
			);
			broker.emit(`ev.${appName}.participationRequestAccepted`, {
				req: params,
				res: result,
			});
			return result;
		},
		async rejectParticipationRequest({ params, broker }) {
			const result = await projectsApp.rejectParticipationRequest(
				params.participationRequestId,
			);
			broker.emit(`ev.${appName}.participationRequestRejected`, {
				req: params,
				res: result,
			});
			return result;
		},

		async findProjects({ params, broker }) {
			const result = await projectsApp.findProject(params.filter);
			broker.emit(`ev.${appName}.projectsFound`, {
				req: params,
				res: result,
			});
			return result;
		},
		async findProjectById({ params, broker }) {
			const result = await projectsApp.findProjectById(params.projectId);
			broker.emit(`ev.${appName}.projectFound`, {
				req: params,
				res: result,
			});
			return result;
		},
		async createProjectRole({ params, broker }) {
			const result = await projectRolesApp.createProjectRole(
				params.projectRole,
			);
			broker.emit(`ev.${appName}.projectRoleCreated`, {
				req: params,
				res: result,
			});
			return result;
		},
		async updateProjectrole({ params, broker }) {
			const result = await projectRolesApp.updateProjectRole(
				params.projectRoleId,
				params.projectRole,
			);
			broker.emit(`ev.${appName}.projectRoleUpdated`, {
				req: params,
				res: result,
			});
			return result;
		},
		async findProjectRoles({ params, broker }) {
			const result = await projectRolesApp.findProjectRoles(params.filter);
			broker.emit(`ev.${appName}.projectRolesFound`, {
				req: params,
				res: result,
			});
			return result;
		},
		async findProjectRoleById({ params, broker }) {
			const result = await projectRolesApp.findProjectRoleById(
				params.projectRoleId,
			);
			broker.emit(`ev.${appName}.projectRoleFound`, {
				req: params,
				res: result,
			});
			return result;
		},
	},
};
