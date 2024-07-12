import React, { useState, useRef } from "react";
import axios from "axios";
import "./PlayersListInfo.css";
import { API_ENDPOINT_PLAYER } from "../../../endpoints";
import { RiDeleteBin7Fill, RiEditBoxFill } from "react-icons/ri";
import UpdatePlayerModal from "./UpdatePlayerModal";
import { Toast } from "primereact/toast";
import deletePlayerSu from "../../../messages/deletePlayerSu";

const PlayersListInfo = ({ fetchPlayers, players, loading }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUpdatePlayer, setSelectedUpdatePlayer] = useState(null);
  const toast = useRef(null);

  const deletePlayer = (playerId) => {
    console.log("Deleting player with ID:", playerId);
    axios
      .delete(API_ENDPOINT_PLAYER + `/${playerId}`)
      .then(() => {
        fetchPlayers();
        deletePlayerSu(toast);
      })
      .catch((error) => {
        console.error("Error deleting player:", error);
      });
  };

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpdateClick = (player) => {
    setSelectedUpdatePlayer(player);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateModalClose = () => {
    setIsUpdateModalOpen(false);
    setSelectedUpdatePlayer(null);
  };

  return (
    <div>
      <Toast ref={toast} />
      <input
        type="text"
        placeholder="Search players"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />

      {loading ? (
        <div className="loading-spinner"></div>
      ) : (
        <div className="player-list">
          {filteredPlayers.map((player, index) => (
            <div key={index} className="player-box">
              <h2 className="name">{player.name}</h2>
              <p className="nationality">Nationality: {player.nationality}</p>
              <p className="league">League: {player.league}</p>
              <p className="club-info">Club: {player.club}</p>
              <div className="action-icons">
                <RiEditBoxFill
                  onClick={() => handleUpdateClick(player)}
                  className="edit-icon"
                />
                <RiDeleteBin7Fill
                  onClick={() => deletePlayer(player.playerId)}
                  className="delete-icon"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {isUpdateModalOpen && selectedUpdatePlayer && (
        <UpdatePlayerModal
          isOpen={isUpdateModalOpen}
          onClose={handleUpdateModalClose}
          playerData={selectedUpdatePlayer}
          fetchPlayers={fetchPlayers}
          toastRef={toast}
        />
      )}
    </div>
  );
};

export default PlayersListInfo;
