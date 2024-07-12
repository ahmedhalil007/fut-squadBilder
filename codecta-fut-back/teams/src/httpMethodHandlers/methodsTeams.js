import {
  putItemCommand,
  getAllTeams,
  getTeamById,
  deleteTeam,
  addPlayerToTeam,
  updateItem,
  deletePlayerFromTeam,
  updatePlayerPosition,
} from "../dynamoTeams/dynamoTeams";
import {
  calculatePlayerChemistry,
  calculateTeamChemistry,
} from "../chemisty/chemistry";
import { getPlayerById } from "../../../hello/src/dynamo/dynamo";

export const handlePostMethod = async (event) => {
  const teamItem = teamObjectMapper(JSON.parse(event.body));

  try {
    await putItemCommand(process.env.DYNAMO_DB_TEAMS_TABLE, teamItem);
  } catch (e) {
    console.log("Error: ", e);
  }
};

export const handleGetMethod = async () => {
  try {
    return await getAllTeams(process.env.DYNAMO_DB_TEAMS_TABLE);
  } catch (e) {
    console.log("Error: ", e);
  }
};

export const handleGetTeamById = async (event) => {
  try {
    const teamId = event.pathParameters.id;
    const team = await getTeamById(process.env.DYNAMO_DB_TEAMS_TABLE, teamId);
    if (team) {
      return team;
    } else {
      return "Team not found ";
    }
  } catch (e) {
    console.log("Error: ", e);
  }
};

export const handleDeleteTeam = async (event) => {
  try {
    const teamId = event.pathParameters.teamId;

    const existingTeam = await getTeamById(
      process.env.DYNAMO_DB_TEAMS_TABLE,
      teamId
    );
    if (!existingTeam) {
      return { message: "Team not found" };
    }

    await deleteTeam(process.env.DYNAMO_DB_TEAMS_TABLE, teamId);
    return { message: "Team deleted successfully" };
  } catch (e) {
    console.log("Error: ", e);
  }
};

export const handlePutTeam = async (event) => {
  try {
    const teamId = event.pathParameters.id;
    const updateData = JSON.parse(event.body);

    const existingTeam = await getTeamById(
      process.env.DYNAMO_DB_TEAMS_TABLE,
      teamId
    );
    if (!existingTeam) {
      return { message: "Team not found" };
    }

    await updateItem(process.env.DYNAMO_DB_TEAMS_TABLE, teamId, updateData);

    return { message: "Team info updated " };
  } catch (e) {
    console.log("Error: ", e);
  }
};

export const handleAddPlayerToTeam = async (event) => {
  try {
    const playerId = event.pathParameters.playerId;
    const teamId = event.pathParameters.teamId;

    const player = await getPlayerById(
      process.env.DYNAMO_DB_PLAYERS_TABLE,
      playerId
    );

    if (!player) {
      return "Player not found";
    }

    const team = await getTeamById(process.env.DYNAMO_DB_TEAMS_TABLE, teamId);

    if (!team) {
      return "Team not found";
    }

    if (!team.players) {
      team.players = [];
    }

    const isPlayerInTeam = team.players.some((p) => p.playerId === playerId);
    if (isPlayerInTeam) {
      console.log("Player is already in the team");
      return "Player is already in the team";
    }
    const position = JSON.parse(event.body).position;

    const playerInfo = {
      playerId: player.playerId,
      name: player.name,
      club: player.club,
      nationality: player.nationality,
      league: player.league,
      position: position,
    };

    playerInfo.playerChemistry = 0;

    team.players.push(playerInfo);

    for (const teamPlayer of team.players) {
      teamPlayer.playerChemistry = calculatePlayerChemistry(team, teamPlayer);
    }
    const teamChemistry = calculateTeamChemistry(team);

    await addPlayerToTeam(
      process.env.DYNAMO_DB_TEAMS_TABLE,
      teamId,
      team.players,
      teamChemistry
    );
    return "Player added to the team successfully";
  } catch (e) {
    console.error("Error: ", e);
    return "An error occurred while adding the player to the team.";
  }
};

export const handleDeletePlayerFromTeam = async (event) => {
  try {
    const playerId = event.pathParameters.playerId;
    const teamId = event.pathParameters.teamId;

    const team = await getTeamById(process.env.DYNAMO_DB_TEAMS_TABLE, teamId);

    if (!team) {
      return "Team not found";
    }

    const playerIndex = team.players.findIndex((p) => p.playerId === playerId);

    if (playerIndex === -1) {
      console.log("Player is not in the team");
      return "Player is not in the team";
    }

    team.players.splice(playerIndex, 1);

    for (const teamPlayer of team.players) {
      teamPlayer.playerChemistry = 0;
    }

    for (const teamPlayer of team.players) {
      teamPlayer.playerChemistry = calculatePlayerChemistry(team, teamPlayer);
    }
    const teamChemistry = calculateTeamChemistry(team);

    await deletePlayerFromTeam(
      process.env.DYNAMO_DB_TEAMS_TABLE,
      teamId,
      playerIndex,
      team.players,
      teamChemistry
    );

    return "Player removed from the team successfully";
  } catch (e) {
    console.error("Error: ", e);
    return "An error occurred while removing the player from the team.";
  }
};

const teamObjectMapper = (teamFromRequestBody) => {
  return {
    teamId: new Date().valueOf().toString(),
    name: teamFromRequestBody.name,
  };
};
