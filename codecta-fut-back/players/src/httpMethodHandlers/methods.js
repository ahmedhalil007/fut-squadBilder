import {
  putItemCommand,
  getAllPlayers,
  getPlayerById,
  deletePlayer,
  updatePlayer,
} from "../dynamo/dynamo";

export const handlePostMethod = async (event) => {
  const playerItem = playerObjectMapper(JSON.parse(event.body));

  try {
    await putItemCommand(process.env.DYNAMO_DB_PLAYERS_TABLE, playerItem);
  } catch (e) {
    console.log("Error: ", e);
  }
};

export const handleGetMethod = async () => {
  try {
    return await getAllPlayers(process.env.DYNAMO_DB_PLAYERS_TABLE);
  } catch (e) {
    console.log("Error: ", e);
  }
};

export const handleGetPlayerById = async (event) => {
  try {
    const playerId = event.pathParameters.id;
    const player = await getPlayerById(
      process.env.DYNAMO_DB_PLAYERS_TABLE,
      playerId
    );
    if (player) {
      return player;
    } else {
      return "Player not found ";
    }
  } catch (e) {
    console.log("Error: ", e);
  }
};

export const handleDeletePlayer = async (event) => {
  try {
    const playerId = event.pathParameters.id;

    const existingPlayer = await getPlayerById(
      process.env.DYNAMO_DB_PLAYERS_TABLE,
      playerId
    );
    if (!existingPlayer) {
      return "Player not found";
    }

    await deletePlayer(process.env.DYNAMO_DB_PLAYERS_TABLE, playerId);
    return { message: "Player deleted successfully" };
  } catch (e) {
    console.log("Error: ", e);
  }
};

export const handleUpdatePlayer = async (event) => {
  try {
    const playerId = event.pathParameters.id;
    const updateData = JSON.parse(event.body);

    const existingPlayer = await getPlayerById(
      process.env.DYNAMO_DB_PLAYERS_TABLE,
      playerId
    );
    if (!existingPlayer) {
      return "Player not found";
    }

    await updatePlayer(
      process.env.DYNAMO_DB_PLAYERS_TABLE,
      playerId,
      updateData
    );

    return { message: "Player updated successfully" };
  } catch (e) {
    console.log("Error: ", e);
  }
};

const playerObjectMapper = (playerFromRequestBody) => {
  return {
    playerId: new Date().valueOf().toString(),
    name: playerFromRequestBody.name,
    club: playerFromRequestBody.club,
    nationality: playerFromRequestBody.nationality,
    league: playerFromRequestBody.league,
  };
};
