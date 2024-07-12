import React, { useState, useEffect, useRef } from "react";
import "./TeamsList.css";
import {
  RiDeleteBin7Fill,
  RiEditBoxFill,
  RiCloseCircleFill,
  RiSendPlaneFill,
} from "react-icons/ri";
import { API_ENDPOINT_TEAMS } from "../../endpoints";
import axios from "axios";
import { Toast } from "primereact/toast";
import SuccessUpdateTeam from "../../messages/successUpdateTeam";

const TeamsList = ({
  teams,
  fetchData,
  isLoading,
  onTeamClick,
  handleDeleteTeam,
  selectedTeamId,
}) => {
  const [updateText, setUpdateText] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const inputRef = useRef(null);
  const toast = useRef(null);

  const handleEditTeam = (teamId) => {
    setIsEditing(teamId);
    setUpdateText(teams.find((team) => team.teamId === teamId).name);
  };

  const handleUpdateTeam = (teamId) => {
    axios
      .put(API_ENDPOINT_TEAMS + `/${teamId}`, { name: updateText })
      .then((response) => {
        console.log(`Team with ID ${teamId} has been updated.`);
        setIsEditing(null);
        fetchData();
        SuccessUpdateTeam(toast);
      })
      .catch((error) => {
        console.error("Error updating team:", error);
      });
  };

  useEffect(() => {
    if (isEditing !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleExitEdit = () => {
    setIsEditing(null);
  };

  return (
    <div className="teams-list">
      <Toast ref={toast} position="top-left" />
      <h2>Teams List</h2>
      {isLoading ? (
        <div className="loading-spinner"></div>
      ) : (
        <div className="teams-columns">
          {teams.map((team, index) => (
            <div
              key={index}
              className={`single-team ${
                selectedTeamId === team.teamId ? "selected" : ""
              }`}
              onClick={() => onTeamClick(team.teamId)}
            >
              {isEditing === team.teamId ? (
                <div className="update-form">
                  <input
                    className="input-update"
                    type="text"
                    value={updateText}
                    onChange={(e) => setUpdateText(e.target.value)}
                    ref={inputRef}
                  />
                  <div className="icons">
                    <RiSendPlaneFill
                      className="send-update"
                      onClick={() => handleUpdateTeam(team.teamId)}
                    />
                    <RiCloseCircleFill
                      className="exit-icon"
                      onClick={handleExitEdit}
                    />
                  </div>
                </div>
              ) : (
                <div className="team-info">{team.name}</div>
              )}
              {isEditing !== team.teamId && (
                <div className="icons">
                  <RiEditBoxFill
                    className="update-icon"
                    onClick={() => handleEditTeam(team.teamId)}
                  />
                  <RiDeleteBin7Fill
                    className="remove-icon"
                    onClick={() => handleDeleteTeam(team.teamId)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamsList;
