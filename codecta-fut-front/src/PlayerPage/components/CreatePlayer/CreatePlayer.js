import React from "react";
import "./CreatePlayer.css";
import PlayerInfo from "./PlayerInfo";
import logo from "../../../images/academy.png";

const CreatePlayer = ({ fetchPlayers }) => {
  return (
    <div className="create-player">
      <h2>Create Player</h2>
      <PlayerInfo fetchPlayers={fetchPlayers} />
      <img src={logo} alt="Your Logo" className="logo" />
    </div>
  );
};

export default CreatePlayer;
