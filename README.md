# fut-squadBilder

"Squad Builder" is web application that allows users to create and optimize sports teams based on club, league, and nationality criteria, similar to FIFA 23's chemistry system. The project was done using React for client side and Node.js (Lambda functions) for server side and DynamoDB database integrated with AWS services.

Requirements:

1. DynamoDB Database:
   Create two DynamoDB tables: "Players" and "Teams" to store player and team information.

- Players Table:
  Primary Key: PlayerID (unique identifier)
  Attributes: Name, Club, League, Nationality, ChemistryScore (to store the calculated chemistry score)
- Teams Table:
  Primary Key: TeamID (unique identifier)
- Attributes: TeamName, Players (a list or set of player IDs in the team), ChemistryScore (to store the calculated chemistry score)

2. Team Building Rules:
   Implement the following chemistry rules for teams:
   Club Chemistry:

- Calculate club chemistry based on the number of players from the same club in the user's team.
- Apply the chemistry points as defined in FIFA 23 (1 chemistry point for 2 players, 2 chemistry points for 4 players, 3 chemistry points for 7 players).
  Nation Chemistry:
- Calculate nation chemistry based on the number of players from the same nationality in the user's team.
- Apply the chemistry points as defined in FIFA 23 (1 chemistry point for 2 players, 2 chemistry points for 5 players, 3 chemistry points for 8 players).
  League Chemistry:
- Calculate league chemistry based on the number of players from the same league in the user's team.
- Apply the chemistry points as defined in FIFA 23 (1 chemistry point for 3 players, 2 chemistry points for 5 players, 3 chemistry points for 8 players).

Calculate the overall chemistry score for the user's team based on club, nation, and league chemistry.

3. User Interface (React):
   Build a React-based frontend with the following features:

- Players Management: Users should be able to create players, provide a name, club, nationality and league.
- Team Management: Users should be able to create teams, provide a team name, and add players to their teams.
- Chemistry Calculation: Display the chemistry score for each team based on the club, nation, and league chemistry criteria.

4. Backend Integration (AWS Lambda):
   Use AWS Lambda functions to:

- Fetch and display player information from the Players Table.
- Calculate chemistry scores for teams based on the defined criteria.
- Store and update player and team data in DynamoDB.

The configuration for AWS services is not available in the repository for security reasons, so the application cannot be launched without that part.
