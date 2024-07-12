import { successResponse } from "./src/responsesTeams/successResponseTeams";
import {
  handlePostMethod,
  handleGetMethod,
  handleGetTeamById,
  handleDeleteTeam,
  handleAddPlayerToTeam,
  handlePutTeam,
  handleDeletePlayerFromTeam,
} from "./src/httpMethodHandlers/methodsTeams";

export const handler = async (event) => {
  try {
    if (event.httpMethod === "POST") {
      await handlePostMethod(event);
      return successResponse({ message: "Successfully created a team" });
    } else if (event.httpMethod === "GET") {
      if (event.pathParameters && event.pathParameters.id) {
        const team = await handleGetTeamById(event);
        return successResponse(team);
      } else {
        const teams = await handleGetMethod();
        return successResponse(teams);
      }
    } else if (event.httpMethod === "DELETE") {
      if (event.pathParameters.teamId && event.pathParameters.playerId) {
        const result = await handleDeletePlayerFromTeam(event);
        return successResponse(result);
      } else {
        const result = await handleDeleteTeam(event);
        return successResponse(result);
      }
    } else if (event.httpMethod === "PUT") {
      const result = await handlePutTeam(event);
      return successResponse(result);
    } else if (event.httpMethod === "PATCH") {
      const result = await handleAddPlayerToTeam(event);
      return successResponse(result);
    }
  } catch (e) {
    console.log("Error: ", e);
  }
};
