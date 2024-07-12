export function calculatePlayerChemistry(team, playerInfo) {
  const clubChemistry = calculateClubChemistry(team, playerInfo.club);
  const nationChemistry = calculateNationChemistry(
    team,
    playerInfo.nationality
  );
  const leagueChemistry = calculateLeagueChemistry(team, playerInfo.league);
  const playerChemistry = clubChemistry + nationChemistry + leagueChemistry;

  if (playerChemistry > 3) {
    return 3;
  } else {
    return playerChemistry;
  }
}

function calculateClubChemistry(team, playerClub) {
  const playersFromSameClub = team.players.filter(
    (player) => player.club === playerClub
  );

  if (playersFromSameClub.length >= 7) {
    return 3;
  } else if (playersFromSameClub.length >= 4) {
    return 2;
  } else if (playersFromSameClub.length >= 2) {
    return 1;
  }

  return 0;
}

function calculateNationChemistry(team, playerNationality) {
  const playersFromSameNationality = team.players.filter(
    (player) => player.nationality === playerNationality
  );

  if (playersFromSameNationality.length >= 8) {
    return 3;
  } else if (playersFromSameNationality.length >= 5) {
    return 2;
  } else if (playersFromSameNationality.length >= 2) {
    return 1;
  }

  return 0;
}

function calculateLeagueChemistry(team, playerLeague) {
  const playersFromSameLeague = team.players.filter(
    (player) => player.league === playerLeague
  );

  if (playersFromSameLeague.length >= 8) {
    return 3;
  } else if (playersFromSameLeague.length >= 5) {
    return 2;
  } else if (playersFromSameLeague.length >= 3) {
    return 1;
  }

  return 0;
}

export function calculateTeamChemistry(team) {
  return team.players.reduce(
    (total, player) => total + player.playerChemistry,
    0
  );
}
