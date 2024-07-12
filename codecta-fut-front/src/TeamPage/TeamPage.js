import React, { useState, useEffect, useRef } from "react";
import "./TeamPage.css";
import CreateTeam from "./components/CreateTeam";
import SquadBuilder from "./components/SquadBuilder";
import TeamsList from "./components/TeamsList";
import axios from "axios";
import { API_ENDPOINT_TEAMS } from "../endpoints";
import DeleteTeam from "../messages/deleteTeam";
import { Toast } from "primereact/toast";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [selectedTeamData, setSelectedTeamData] = useState(null);
  const toast = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedTeamId) {
      fetchTeamById(selectedTeamId);
    }
  }, [selectedTeamId]);

  const fetchData = () => {
    setIsLoading(true);
    axios
      .get(API_ENDPOINT_TEAMS)
      .then((response) => {
        setTeams(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching teams:", error);
        setIsLoading(false);
      });
  };

  // Set the first team as selected affter changes
  useEffect(() => {
    if (teams.length > 0 && !selectedTeamId) {
      const firstTeamId = teams[0].teamId;
      setSelectedTeamId(firstTeamId);
    } else if (
      selectedTeamId &&
      !teams.some((team) => team.teamId === selectedTeamId)
    ) {
      setSelectedTeamId(null);
    }
  }, [teams, selectedTeamId]);

  const fetchTeamById = (teamId) => {
    setIsLoading(true);
    axios
      .get(API_ENDPOINT_TEAMS + `/${teamId}`)
      .then((response) => {
        setSelectedTeamData(response.data);
        setIsLoading(false);
        // console.log(selectedTeamData);
      })
      .catch((error) => {
        console.error("Error fetching team by ID:", error);
        setIsLoading(false);
      });
  };

  const handleDeleteTeam = (teamId) => {
    axios
      .delete(API_ENDPOINT_TEAMS + `/${teamId}`)
      .then((response) => {
        console.log(`Team with ID ${teamId} has been deleted.`);
        fetchData();
        DeleteTeam(toast);
        setSelectedTeamId(null);
        setSelectedTeamData(null);
      })
      .catch((error) => {
        console.error("Error deleting team:", error);
      });
  };

  const handleTeamClick = (teamId) => {
    setSelectedTeamId(teamId);
  };

  return (
    <div className="teams-container">
      <Toast ref={toast} position="top-left" />
      <div className="left-side">
        <CreateTeam fetchData={fetchData} />
        <TeamsList
          teams={teams}
          fetchData={fetchData}
          isLoading={isLoading}
          onTeamClick={handleTeamClick}
          fetchTeamById={fetchTeamById}
          handleDeleteTeam={handleDeleteTeam}
          selectedTeamId={selectedTeamId}
        />
      </div>
      <SquadBuilder
        teamData={selectedTeamData}
        fetchTeamById={fetchTeamById}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Teams;
