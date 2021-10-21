import request from "supertest";
import { User } from "../models/User";
import app from "../app";

describe("Test for User", () => {
  let mockUserId: string;
  let mockHobbyId: string;

  jest.setTimeout(10000);

  afterAll(async () => {
    await User.deleteMany({});
  });

  it("Should create user", async () => {
    const mockUserInfo = {
      name: "Sidney",
    };

    const response = await request(app)
      .post("/api/v1/users")
      .set({ "Content-Type": "application/json" })
      .send(mockUserInfo);

    mockUserId = response.body._id;
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id");
  });

  it("Should add user hobby", async () => {
    const mockHobbyData = {
      passionLevel: "high",
      name: "programming",
      year: 2015,
    };

    const response = await request(app)
      .post(`/api/v1/users/${mockUserId}/hobbies`)
      .set({ "Content-Type": "application/json" })
      .send(mockHobbyData);

    mockHobbyId = response.body._id;
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id");
  });

  it("Should update user", async () => {
    const mockUserInfo = {
      name: "Sidney Ihunwaeze",
    };

    const response = await request(app)
      .put(`/api/v1/users/${mockUserId}`)
      .set({ "Content-Type": "application/json" })
      .send(mockUserInfo);

    mockUserId = response.body._id;
    expect(response.status).toBe(200);
    expect(response.body.name).toEqual(mockUserInfo.name);
  });

  it("Should update user hobby", async () => {
    const mockHobbyData = {
      passionLevel: "veryHigh",
      name: "programming",
      year: 2015,
    };

    const response = await request(app)
      .put(`/api/v1/users/hobbies/${mockHobbyId}`)
      .set({ "Content-Type": "application/json" })
      .send(mockHobbyData);

    expect(response.status).toBe(200);
    expect(response.body.passionLevel).toBe(mockHobbyData.passionLevel);
  });

  it("Should get all users and include hobbies", async () => {
    const response = await request(app)
      .get(`/api/v1/users/`)
      .set({ "Content-Type": "application/json" });

    expect(response.status).toBe(200);
    expect(response.body[0].hobbies).toHaveProperty("_id");
  });

  it("Should delete hobby", async () => {
    const response = await request(app)
      .delete(`/api/v1/users/${mockUserId}/hobbies/${mockHobbyId}`)
      .set({ "Content-Type": "application/json" });

    expect(response.status).toBe(200);
  });

  it("Should delete user", async () => {
    const response = await request(app)
      .delete(`/api/v1/users/${mockUserId}`)
      .set({ "Content-Type": "application/json" });

    expect(response.status).toBe(200);
  });
});
