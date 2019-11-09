const Project = require("../models/Project.model");
class ProjectsRepository {
	async create(projectDto) {
		const project = new Project(projectDto);
		await project.save();
		return project;
	}
	async update(id, projectDto) {
		return await Project.update(
			{
				_id: id,
			},
			projectDto,
		);
	}

	async find(filter) {
		return await Project.find(filter);
	}

	async findById(id) {
		return await Project.findById(id);
	}
}

module.exports = {
	ProjectsRepository,
	projectRepository: new ProjectsRepository(),
};
