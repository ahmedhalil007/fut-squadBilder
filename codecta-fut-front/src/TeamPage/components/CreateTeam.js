import React, { useState, useRef } from "react";
import axios from "axios";
import { API_ENDPOINT_TEAMS } from "../../endpoints";
import "./CreateTeam.css";
import { Toast } from "primereact/toast";
import SuccessCreatedTeam from "../../messages/successCreatedTeam";
import WarnCreateTeam from "../../messages/warnCreateTeam";

const CreateTeam = ({ fetchData }) => {
  const [teamName, setTeamName] = useState("");
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);
  const inputRef = useRef(null);
  const toast = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (teamName.trim() === "") {
      WarnCreateTeam(toast);
      inputRef.current.focus();
      return;
    }

    setIsCreatingTeam(true);

    const data = {
      name: teamName,
    };

    try {
      const response = await axios.post(API_ENDPOINT_TEAMS, data);
      console.log("Team created successfully:", response.data);
      fetchData();
      SuccessCreatedTeam(toast);
      setTeamName("");
    } catch (error) {
      console.error("Error creating team:", error);
    } finally {
      setIsCreatingTeam(false);
    }
  };

  return (
    <div className="create-team">
      <Toast ref={toast} position="top-left" />
      <h2>Create Team</h2>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              className="input"
              ref={inputRef}
              type="text"
              placeholder="Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </div>
          <div className="button-container">
            {isCreatingTeam ? (
              <div className="loading-spinner"></div>
            ) : (
              <button type="submit" className="button">
                CREATE TEAM
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTeam;
