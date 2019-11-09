const ProjectRole = require("../models/ProjectRole.model");
class ProjectRolesRepository {
	async create(projectRoleDto) {
		const projectRequest = new ProjectRole(projectRoleDto);
		await projectRequest.save();
		return projectRequest.toJSON();
	}
	async update(id, projectRoleDto) {
		return await ProjectRole.update(
			{
				_id: id,
			},
			projectRoleDto,
		);
	}

	async find(filter) {
		return await ProjectRole.find(filter);
	}

	async findById(id) {
		return await ProjectRole.findById(id);
	}
}

module.exports = {
	ProjectRolesRepository,
	projectRolesRepository: new ProjectRolesRepository(),
};
