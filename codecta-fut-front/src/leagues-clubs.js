export const leagues = [
  "Belgian Pro League.json",
  "BiH Premier League.json",
  "Brazilian Serie A.json",
  "Colombian Primera A.json",
  "Croatian Football League.json",
  "Czech First League.json",
  "Danish Superliga.json",
  "England Championship.json",
  "England LeagueOne.json",
  "England LeagueTwo.json",
  "England Premier League.json",
  "France Ligue 1.json",
  "Germany Bundesliga.json",
  "Greek Super League.json",
  "Italy Serie A.json",
  "Mexico Liga MX.json",
  "Netherlands Eredivisie.json",
  "Portugal Liga Portugal.json",
  "Scottish Premiership.json",
  "Spain LaLiga.json",
  "Sweden Allsvenskan.json",
  "Turkey SuperLig.json",
  "USA MLB.json",
  "USA MLS.json",
  "USA NBA.json",
  "USA NFL.json",
  "USA NHL.json",
];

export function loadLeagues(selectedOption) {
  const leagueData = require(`./football-info/${selectedOption.value}`);
  return leagueData;
}

export function getTeamNames(teamData) {
  return teamData.map((team) => ({
    value: team.team_name,
    label: team.team_name,
  }));
}
