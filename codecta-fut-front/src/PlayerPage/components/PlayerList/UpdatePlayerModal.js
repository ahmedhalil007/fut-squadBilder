import React, { useState, useEffect, useRef } from "react";
import "./UpdatePlayerModal.css";
import Select from "react-select";
import axios from "axios";
import { API_ENDPOINT_PLAYER, fetchCountries } from "../../../endpoints";
import { loadLeagues, getTeamNames, leagues } from "../../../leagues-clubs";
import { motion, AnimatePresence } from "framer-motion";
import playerUpdateSu from "../../../messages/playerUpdateSu";
import inputField from "../../../messages/inputField";

const UpdatePlayerModal = ({
  isOpen,
  onClose,
  playerData,
  fetchPlayers,
  toastRef,
}) => {
  const [updatedName, setUpdatedName] = useState(playerData.name);
  const [updatedCountry, setUpdatedCountry] = useState(playerData.nationality);
  const [updatedLeague, setUpdatedLeague] = useState(playerData.league);
  const [updatedTeam, setUpdatedTeam] = useState(playerData.club);
  const [teams, setTeams] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [selectedLeague] = useState(null);
  const [teamData, setTeamData] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleLeagueChange = (selectedOption) => {
    const leagueName = selectedOption.value.replace(".json", "");
    setUpdatedLeague(leagueName);
    setUpdatedTeam(null);
    const leagueData = loadLeagues(selectedOption);
    setTeamData(leagueData);
  };

  const handleTeamChange = (selectedOption) => {
    setUpdatedTeam(selectedOption.value);
  };

  useEffect(() => {
    if (selectedLeague && teamData.length > 0) {
      const teamNames = getTeamNames(teamData);
      setTeams(teamNames);
    }
  }, [selectedLeague, teamData]);

  const handleUpdate = async () => {
    if (!updatedName || !updatedCountry || !updatedLeague || !updatedTeam) {
      inputField(toastRef);
      console.error("Please fill in all required fields");
      return;
    }
    const updatedPlayerData = {
      name: updatedName,
      nationality: updatedCountry,
      club: updatedTeam,
      league: updatedLeague,
    };

    try {
      await axios.put(
        `${API_ENDPOINT_PLAYER}/${playerData.playerId}`,
        updatedPlayerData
      );
      fetchPlayers();
      onClose();
      playerUpdateSu(toastRef);
    } catch (error) {
      console.error("Error updating player:", error);
    }
  };

  useEffect(() => {
    const fetchCountriesData = async () => {
      try {
        const countriesData = await fetchCountries();
        const countryOptionsData = countriesData.map((country) => ({
          value: country.name,
          label: country.name,
        }));
        setCountryOptions(countryOptionsData);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountriesData();
  }, []);

  useEffect(() => {
    if (updatedLeague) {
      const defaultLeagueData = loadLeagues({
        value: updatedLeague,
        label: updatedLeague.replace(".json", ""),
      });
      const defaultTeamNames = getTeamNames(defaultLeagueData);
      setTeams(defaultTeamNames);
    }
  }, [updatedLeague]);

  return (
    <>
      <div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={`modal-update ${
                isOpen ? "open-update" : "closed-update"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="modal-content-update"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
              >
                <h2>Update Player</h2>
                <input
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                  className="player-name-update"
                  ref={inputRef}
                />

                <div className="nation-up">
                  <Select
                    value={
                      updatedCountry
                        ? { value: updatedCountry, label: updatedCountry }
                        : null
                    }
                    options={countryOptions}
                    onChange={(selectedOption) =>
                      setUpdatedCountry(selectedOption.value)
                    }
                    isSearchable={true}
                    placeholder="Select a nation"
                    className="nation-update"
                  />
                </div>

                <div className="leg-up">
                  <Select
                    value={
                      updatedLeague
                        ? {
                            value: updatedLeague,
                            label: updatedLeague.replace(".json", ""),
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
                    className="league-update"
                  />
                </div>

                {updatedLeague && teams.length > 0 && (
                  <>
                    <Select
                      value={
                        teams.find((team) => team.value === updatedTeam) || null
                      }
                      options={teams}
                      onChange={handleTeamChange}
                      isSearchable={true}
                      placeholder="Select a team"
                      className="team-update"
                    />
                  </>
                )}
                <div className="butt">
                  <button onClick={handleUpdate} className="update-button">
                    Update Player
                  </button>
                  <button onClick={onClose} className="close-button-update">
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default UpdatePlayerModal;
