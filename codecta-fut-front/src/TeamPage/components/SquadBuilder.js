import React from "react";
import "./SquadBuilder.css";
import Card from "./formation/Card";
import axios from "axios";
import { API_ENDPOINT_TEAMS } from "../../endpoints";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import SuccessAddToTeam from "../../messages/successAddToTeam";
import WarnAddToTeam from "../../messages/warnAddToTeam";
import deletePlayerFromTeam from "../../messages/deletePlayerFromTeam";
import teamNotFound from "../../messages/teamNotFound";

const SquadBuilder = ({ teamData, fetchTeamById, isLoading }) => {
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);

  const handlePlayerClick = (playerId, modalPosition) => {
    console.log("Selected Player ID:", playerId);

    if (playerId) {
      const teamId = teamData.teamId;
      setLoading(true);
      const requestData = {
        position: modalPosition,
      };

      axios
        .patch(
          API_ENDPOINT_TEAMS + `/${teamId}/players/${playerId}`,
          requestData
        )
        .then((response) => {
          console.log(response.data);
          if (response.data === "Player is already in the team") {
            WarnAddToTeam(toast);
            setLoading(false);
          } else if (response.data === "Team not found") {
            teamNotFound(toast);
            setLoading(false);
          } else {
            fetchTeamById(teamId);
            SuccessAddToTeam(toast);
            setLoading(false);
          }
        })

        .catch((error) => {
          console.error("Error adding player:", error);
          setLoading(false);
        });
    } else {
      console.error("No player selected");
      setLoading(false);
    }
  };

  const handleDeleteFromTeam = (playerId) => {
    if (playerId) {
      const teamId = teamData.teamId;
      setLoading(true);
      axios
        .delete(API_ENDPOINT_TEAMS + `/${teamId}/players/${playerId}`)
        .then((response) => {
          console.log("Player deleted successfully:", response.data);
          setLoading(false);
          fetchTeamById(teamId);
          deletePlayerFromTeam(toast);
        })
        .catch((error) => {
          console.error("Error deleting player:", error);
          setLoading(false);
        });
    }
  };

  return (
    <div className="squad-builder">
      <Toast ref={toast} />
      {isLoading && <div className="spinner"></div>}
      {teamData && (
        <Card
          teamData={teamData}
          handlePlayerClick={handlePlayerClick}
          handleDeleteFromTeam={handleDeleteFromTeam}
          loading={loading}
        />
      )}
    </div>
  );
};

export default SquadBuilder;
