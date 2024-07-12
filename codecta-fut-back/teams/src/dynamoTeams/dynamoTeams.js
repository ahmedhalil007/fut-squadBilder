import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
  UpdateCommand,
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "us-east-1" });
const docClient = DynamoDBDocumentClient.from(client);

export const putItemCommand = async (tableName, item) => {
  const putCommand = new PutCommand({
    TableName: tableName,
    Item: item,
  });
  await docClient.send(putCommand);
};

export const getAllTeams = async (tableName) => {
  const params = {
    TableName: tableName,
  };
  const result = await docClient.send(new ScanCommand(params));
  return result.Items || [];
};

export const getTeamById = async (tableName, teamId) => {
  const params = {
    TableName: tableName,
    Key: {
      teamId: teamId,
    },
  };
  const result = await docClient.send(new GetCommand(params));
  return result.Item;
};

export const deleteTeam = async (tableName, teamId) => {
  const params = new DeleteCommand({
    TableName: tableName,
    Key: {
      teamId: teamId,
    },
  });
  await docClient.send(params);
};

export const updateItem = async (tableName, teamId, updateTeam) => {
  const update = {
    TableName: tableName,
    Key: {
      teamId: teamId,
    },
    UpdateExpression: "SET #name = :name",
    ExpressionAttributeNames: {
      "#name": "name",
    },
    ExpressionAttributeValues: {
      ":name": updateTeam.name,
    },
  };

  await docClient.send(new UpdateCommand(update));
};

export const addPlayerToTeam = async (
  tableName,
  teamId,
  playerInfos,
  teamChemistry
) => {
  const params = {
    TableName: tableName,
    Key: {
      teamId: teamId,
    },
    UpdateExpression:
      "SET #players = :playerInfos, #teamChemistry = :teamChemistry",
    ExpressionAttributeNames: {
      "#players": "players",
      "#teamChemistry": "teamChemistry",
    },
    ExpressionAttributeValues: {
      ":playerInfos": playerInfos,
      ":teamChemistry": teamChemistry,
    },
  };

  await docClient.send(new UpdateCommand(params));
};

export const deletePlayerFromTeam = async (
  tableName,
  teamId,
  playerIndex,
  playerInfos,
  teamChemistry
) => {
  const removeParams = {
    TableName: tableName,
    Key: {
      teamId: teamId,
    },
    UpdateExpression: `REMOVE players[${playerIndex}]`,
  };

  const setParams = {
    TableName: tableName,
    Key: {
      teamId: teamId,
    },
    UpdateExpression: `SET #players = :playerInfos, #teamChemistry = :teamChemistry`,
    ExpressionAttributeNames: {
      "#players": "players",
      "#teamChemistry": "teamChemistry",
    },
    ExpressionAttributeValues: {
      ":playerInfos": playerInfos,
      ":teamChemistry": teamChemistry,
    },
  };

  await docClient.send(new UpdateCommand(removeParams));
  await docClient.send(new UpdateCommand(setParams));
};
