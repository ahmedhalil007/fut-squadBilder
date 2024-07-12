import {
  handlePostMethod,
  handleGetMethod,
  handleDeletePlayer,
  handleGetPlayerById,
  handleUpdatePlayer,
} from "./src/httpMethodHandlers/methods";
import { successResponse } from "./src/responses/successResponse";

export const handler = async (event) => {
  try {
    if (event.httpMethod === "POST") {
      await handlePostMethod(event);
      return successResponse({ message: "Successfully created a player" });
    } else if (event.httpMethod === "GET") {
      if (event.pathParameters && event.pathParameters.id) {
        const player = await handleGetPlayerById(event);
        return successResponse(player);
      } else {
        const players = await handleGetMethod();
        return successResponse(players);
      }
    } else if (event.httpMethod === "DELETE") {
      const result = await handleDeletePlayer(event);
      return successResponse(result);
    } else if (event.httpMethod === "PUT") {
      const result = await handleUpdatePlayer(event);
      return successResponse(result);
    }
  } catch (e) {
    console.log("Error: ", e);
  }
};
