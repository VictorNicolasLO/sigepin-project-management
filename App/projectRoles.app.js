const {
	projectRolesRepository,
} = require("../repositories/projectRoles.repository");

class ProjectRolesApp {
	constructor() {
		this.createProjectRole = projectRolesRepository.create;
		this.updateProjectRole = projectRolesRepository.update;
		this.findProjectRoles = projectRolesRepository.find;
		this.findProjectRoleById = projectRolesRepository.findById;
	}
}

module.exports = { ProjectRolesApp, projectRolesApp: new ProjectRolesApp() };
