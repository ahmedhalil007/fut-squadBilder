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

export const getAllPlayers = async (tableName) => {
  const params = {
    TableName: tableName,
  };
  const result = await docClient.send(new ScanCommand(params));
  return result.Items || [];
};

export const getPlayerById = async (tableName, playerId) => {
  const params = {
    TableName: tableName,
    Key: {
      playerId: playerId,
    },
  };
  const result = await docClient.send(new GetCommand(params));
  return result.Item;
};

export const deletePlayer = async (tableName, playerId) => {
  const params = new DeleteCommand({
    TableName: tableName,
    Key: {
      playerId: playerId,
    },
  });
  await docClient.send(params);
};

export const updatePlayer = async (tableName, playerId, updateData) => {
  const params = {
    TableName: tableName,
    Key: {
      playerId: playerId,
    },
    UpdateExpression:
      "SET #name = :name, #club = :club, #nationality = :nationality, #league = :league",
    ExpressionAttributeNames: {
      "#name": "name",
      "#club": "club",
      "#nationality": "nationality",
      "#league": "league",
    },
    ExpressionAttributeValues: {
      ":name": updateData.name,
      ":club": updateData.club,
      ":nationality": updateData.nationality,
      ":league": updateData.league,
    },
  };

  await docClient.send(new UpdateCommand(params));
};
