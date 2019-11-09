"use strict";

const { ServiceBroker } = require("moleculer");
const TestService = require("../../services/project-management.service");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongod = new MongoMemoryServer();

describe("Test ''project-management' service", () => {
	let broker = new ServiceBroker({ logger: false });
	broker.createService(TestService);
	let projectToTestId = "";
	beforeAll(async () => {
		broker.start();
		mongoose.connect(await mongod.getConnectionString(), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		const projectToTest = {
			title: "TestingUpdate",
			participants: [{ roleId: "abcde", participantId: "abcde" }],
			overview: "The best project",
			content: "The best content",
			imageUrl: "ss",
			createdAt: new Date(),
			areaId: "ABCDE",
		};
		const { _id: projectId } = await broker.call(
			"project-management.createProject",
			{
				project: projectToTest,
			},
		);
		projectToTestId = projectId;
	});
	afterAll(() => broker.stop());

	describe("Test 'project-management.createProject' action", () => {
		const title = "TestTitleCreate";
		const project = {
			title: title,
			participants: [{ roleId: "abcde", participantId: "abcde" }],
			overview: "The best project",
			content: "The best content",
			imageUrl: "ss",
			createdAt: new Date(),
			areaId: "ABCDE",
		};
		it("should return with 'ProjectData'", async () => {
			return expect(
				broker.call("project-management.createProject", {
					project: project,
				}),
			).resolves.toMatchObject({ title: title });
		});

		it("should handleError with 'ProjectData'", async () => {
			return expect(
				broker.call("project-management.createProject", {
					project: project,
				}),
			).rejects.toThrow();
		});
	});

	describe("Test 'project-management.updateProject' action", () => {
		it("should return with '{ nModified:1 }'", async () => {
			return expect(
				broker.call("project-management.updateProject", {
					projectId: projectToTestId,
					project: { overview: "The best project updated" },
				}),
			).resolves.toMatchObject({ nModified: 1 });
		});
	});

	describe("Test 'project-management.addParticipantToProject' action", () => {
		it("should return with 'ProjectData'", async () => {
			return expect(
				broker.call("project-management.addParticipantToProject", {
					projectId: projectToTestId,
					participantId: "PARTICIPANTID",
					projectRoleId: "ROLEID",
				}),
			).resolves.toMatchObject({
				participants: [
					{ roleId: "abcde", participantId: "abcde" },
					{
						participantId: "PARTICIPANTID",
						roleId: "ROLEID",
					},
				],
			});
		});

		it("should throw participation error ", async () => {
			return expect(
				broker.call("project-management.addParticipantToProject", {
					projectId: projectToTestId,
					participantId: "PARTICIPANTID",
					projectRoleId: "ROLEID",
				}),
			).rejects.toThrow("Participant is already en project");
		});
	});

	describe("Test 'project-management.removeParticipantFromProject' action", () => {
		it("should return with 'ProjectData'", async () => {
			return expect(
				broker.call("project-management.removeParticpantFromProject", {
					projectId: projectToTestId,
					participantId: "PARTICIPANTID",
				}),
			).resolves.toMatchObject({
				participants: [{ roleId: "abcde", participantId: "abcde" }],
			});
		});
	});

	let participationRequestId = "";

	describe("Test 'project-management.makeParticipationRequest' action", () => {
		it("should return with 'ProjectData'", async () => {
			const participationRequest = await broker.call(
				"project-management.makeParticipationRequest",
				{
					projectId: projectToTestId.toString(),
					participantProspectId: "PARTICIPANTID",
				},
			);
			participationRequestId = participationRequest._id;

			return expect(participationRequest).toMatchObject({
				participantProspectId: "PARTICIPANTID",
				projectId: projectToTestId.toString(),
				status: 0,
			});
		});
	});

	describe("Test 'project-management.acceptParticipationRequest' action", () => {
		it("should return with 'ProjectData'", async () => {
			return expect(
				broker.call("project-management.acceptParticipationRequest", {
					participationRequestId: participationRequestId,
					projectRoleId: "Role ID",
				}),
			).resolves.toMatchObject({
				participantProspectId: "PARTICIPANTID",
				projectId: projectToTestId.toString(),
				status: 1,
			});
		});
	});

	describe("Test 'project-management.rejectParticipationRequest' action", () => {
		it("should return with 'ProjectData'", async () => {
			return expect(
				broker.call("project-management.rejectParticipationRequest", {
					participationRequestId: participationRequestId,
				}),
			).resolves.toMatchObject({
				nModified: 1,
			});
		});
	});

	describe("Test 'project-management.findProjects' action", () => {
		it("should return with 'ProjectData'", async () => {
			return expect(
				broker.call("project-management.findProjects", {}),
			).resolves.toMatchObject([
				{ title: "TestingUpdate" },
				{ title: "TestTitleCreate" },
			]);
		});
	});

	describe("Test 'project-management.findProject' action", () => {
		it("should return with 'ProjectData'", async () => {
			return expect(
				broker.call("project-management.findProjectById", {
					projectId: projectToTestId,
				}),
			).resolves.toMatchObject({ title: "TestingUpdate" });
		});
	});

	let projectRoleId = "";
	describe("Test 'project-management.createProjectRole' action", () => {
		it("should return with 'ProjectData'", async () => {
			const roleCreated = await broker.call(
				"project-management.createProjectRole",
				{
					projectRole: { name: "Admin" },
				},
			);
			projectRoleId = roleCreated._id;
			return expect(roleCreated).toMatchObject({ name: "Admin" });
		});
	});

	describe("Test 'project-management.updateProjectrole' action", () => {
		it("should return with 'ProjectData'", async () => {
			return expect(
				broker.call("project-management.updateProjectrole", {
					projectRoleId: projectRoleId,
					projectRole: { name: "Administrator" },
				}),
			).resolves.toMatchObject({ nModified: 1 });
		});
	});

	describe("Test 'project-management.findRoles' action", () => {
		it("should return with 'ProjectData'", async () => {
			return expect(
				broker.call("project-management.findProjectRoles", {}),
			).resolves.toMatchObject([{ name: "Administrator" }]);
		});
	});

	describe("Test 'project-management.findProjectRoleById' action", () => {
		it("should return with 'ProjectData'", async () => {
			return expect(
				broker.call("project-management.findProjectRoleById", {
					projectRoleId: projectRoleId,
				}),
			).resolves.toMatchObject({ name: "Administrator" });
		});
	});
});
