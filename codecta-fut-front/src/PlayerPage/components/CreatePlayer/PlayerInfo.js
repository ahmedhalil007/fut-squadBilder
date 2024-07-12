import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import "./PlayerInfo.css";
import axios from "axios";
import { fetchCountries, API_ENDPOINT_PLAYER } from "../../../endpoints";
import { loadLeagues, getTeamNames, leagues } from "../../../leagues-clubs";
import { Toast } from "primereact/toast";
import SuccessCreatedPlayer from "../../../messages/successCreatedPlayer";
import errorPlayer from "../../../messages/errorPlayer";

function PlayerInfo({ fetchPlayers }) {
  const [selectedLeague, setSelectedLeague] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [teamData, setTeamData] = useState([]);
  const [teams, setTeams] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);

  //if selected team is not in that leauge set team to null
  const handleLeagueChange = (selectedOption) => {
    const leagueName = selectedOption.value.replace(".json", "");
    setSelectedLeague(leagueName);
    setSelectedTeam(null);
    const leagueData = loadLeagues(selectedOption);
    setTeamData(leagueData);
  };

  const handleTeamChange = (selectedOption) => {
    setSelectedTeam(selectedOption.value);
  };

  //render only when league or team change to confirm teams in leagues
  useEffect(() => {
    if (selectedLeague && teamData.length > 0) {
      const teamNames = getTeamNames(teamData);
      setTeams(teamNames);
    }
  }, [selectedLeague, teamData]);

  useEffect(() => {
    const fetchCountriesData = async () => {
      try {
        const countryData = await fetchCountries();
        const countryNames = countryData.map((country) => ({
          value: country.name,
          label: country.name,
        }));
        setCountries(countryNames);
      } catch (error) {
        console.error("Error fetching countries data:", error);
      }
    };

    fetchCountriesData();
  }, []);

  const handleLetterInput = (e) => {
    const value = e.target.value.toUpperCase();
    if (/^[A-Za-z\s]*$/.test(value) || value === "") {
      setInputValue(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue && selectedCountry && selectedLeague && selectedTeam) {
      const playerData = {
        name: inputValue,
        nationality: selectedCountry,
        club: selectedTeam,
        league: selectedLeague,
      };

      try {
        setLoading(true);
        const response = await axios.post(API_ENDPOINT_PLAYER, playerData);
        console.log("Player created successfully:", response.data);
        setLoading(false);

        fetchPlayers();
        SuccessCreatedPlayer(toast);

        setSelectedCountry("");
        setSelectedLeague("");
        setSelectedTeam("");
        setInputValue("");
      } catch (error) {
        console.error("Error creating player:", error);
        setLoading(false);
      }
    } else {
      errorPlayer(toast);
    }
  };

  return (
    <div className="league-dropdown-container">
      <Toast ref={toast} position="top-left" />
      <form onSubmit={handleSubmit}>
        <div className="select-group">
          <label className="letterInput">Player's name</label>
          <input
            type="text"
            value={inputValue}
            onChange={handleLetterInput}
            className="input-field"
            placeholder="Type here"
          />
        </div>
        <div className="select-group">
          <label className="countryDropdown">Nation</label>
          <Select
            id="countryDropdown"
            value={
              selectedCountry
                ? { value: selectedCountry, label: selectedCountry }
                : null
            }
            options={countries}
            onChange={(selectedOption) =>
              setSelectedCountry(selectedOption.value)
            }
            isSearchable={true}
            placeholder="Select a nation"
            className="select-dropdown"
          />
        </div>
        <div className="select-group">
          <label className="leagueDropdown">League</label>
          <Select
            id="leagueDropdown"
            value={
              selectedLeague
                ? {
                    value: selectedLeague,
                    label: selectedLeague.replace(".json", ""),
                  }
                : null
            }
            options={leagues.map((league) => ({
              value: league,
              label: league.replace(".json", ""),
            }))}
            onChange={handleLeagueChange}
            isSearchable={true}
            placeholder="Select a league"
            className="select-dropdown"
          />
        </div>

        {selectedLeague && (
          <div className="select-group">
            <label className="teamDropdown">Team</label>
            <Select
              id="teamDropdown"
              value={
                selectedTeam
                  ? { value: selectedTeam, label: selectedTeam }
                  : null
              }
              options={teams}
              onChange={handleTeamChange}
              isSearchable={true}
              placeholder="Select a team"
              className="select-dropdown"
            />
          </div>
        )}
        <div className="select-group">
          <button type="submit" className="submit-button">
            {loading ? (
              <div className="loading-spinner"></div>
            ) : (
              "Create player"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PlayerInfo;
