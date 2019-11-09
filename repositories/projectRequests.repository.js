const ProjectRequest = require("../models/ProjectRequest.model");
class ProjectRequestRepository {
	async create(projectRequestDto) {
		const projectRequest = new ProjectRequest(projectRequestDto);
		await projectRequest.save();
		return projectRequest.toJSON();
	}
	async update(id, projectRequestDto) {
		return await ProjectRequest.update(
			{
				_id: id,
			},
			projectRequestDto,
		);
	}

	async find(filter) {
		return await ProjectRequest.find(filter);
	}

	async findById(id) {
		return await ProjectRequest.findById(id);
	}
}

module.exports = {
	ProjectRequestRepository,
	projectRequestRepository: new ProjectRequestRepository(),
};
