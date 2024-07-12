import { useState, useEffect, useRef } from "react";
import React from "react";
import "./Card.css";
import { API_ENDPOINT_PLAYER } from "../../../endpoints";
import axios from "axios";
import renderPositionCard from "./CardPosition";
import { motion, AnimatePresence } from "framer-motion";
import { RiCloseCircleFill } from "react-icons/ri";

const Card = ({
  teamData,
  handlePlayerClick,
  handleDeleteFromTeam,
  loading,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playerss, setPlayerss] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalPosition, setModalPosition] = useState("");
  const searchInputRef = useRef(null);

  useEffect(() => {
    axios
      .get(API_ENDPOINT_PLAYER)
      .then((response) => setPlayerss(response.data))
      .catch((error) => console.error("Error fetching players:", error));
  }, []);

  const openModal = (position) => {
    setIsModalOpen(true);
    setFilteredPlayers(playerss);
    setModalPosition(position);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSearchTerm("");
  };

  useEffect(() => {
    if (isModalOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isModalOpen]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = playerss.filter((player) =>
      player.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredPlayers(filtered);
  };

  const handleAddPlayer = (playerId) => {
    handlePlayerClick(playerId, modalPosition);
    closeModal();
  };

  const handleRemovePlayer = (playerId) => {
    handleDeleteFromTeam(playerId);
  };

  return (
    <div className="cards">
      {loading && <div className="spinner"></div>}

      <div className="chem">
        <div className="chem-box">CHEMISTRY: {teamData.teamChemistry}/33</div>
        <div className="strikers">
          <div className="lw">
            {renderPositionCard(
              "LW",
              teamData.players,
              openModal,
              handleRemovePlayer
            )}
          </div>

          <div className="st">
            {renderPositionCard(
              "ST",
              teamData.players,
              openModal,
              handleRemovePlayer
            )}
          </div>

          <div className="rw">
            {renderPositionCard(
              "RW",
              teamData.players,
              openModal,
              handleRemovePlayer
            )}
          </div>
        </div>
      </div>

      <div className="midfield">
        <div className="lcm">
          {renderPositionCard(
            "LCM",
            teamData.players,
            openModal,
            handleRemovePlayer
          )}
        </div>

        <div className="cm">
          {renderPositionCard(
            "CM",
            teamData.players,
            openModal,
            handleRemovePlayer
          )}
        </div>

        <div className="rcm">
          {renderPositionCard(
            "RCM",
            teamData.players,
            openModal,
            handleRemovePlayer
          )}
        </div>
      </div>

      <div className="defense">
        <div className="lb">
          {renderPositionCard(
            "LB",
            teamData.players,
            openModal,
            handleRemovePlayer
          )}
        </div>

        <div className="lcb">
          {renderPositionCard(
            "LCB",
            teamData.players,
            openModal,
            handleRemovePlayer
          )}
        </div>

        <div className="rcb">
          {renderPositionCard(
            "RCB",
            teamData.players,
            openModal,
            handleRemovePlayer
          )}
        </div>

        <div className="rb">
          {renderPositionCard(
            "RB",
            teamData.players,
            openModal,
            handleRemovePlayer
          )}
        </div>
      </div>

      <div className="keeper">
        <div className="gk">
          {renderPositionCard(
            "GK",
            teamData.players,
            openModal,
            handleRemovePlayer
          )}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="modal-overlay"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              <div className="modal-header">
                <input
                  type="text"
                  placeholder="Search..."
                  className="search-bar"
                  value={searchTerm}
                  onChange={handleSearch}
                  ref={searchInputRef}
                />
                <p>Position: {modalPosition}</p>
                <RiCloseCircleFill
                  onClick={closeModal}
                  className="close-button"
                ></RiCloseCircleFill>
              </div>
              <div className="player-list">
                {filteredPlayers.map((player, index) => (
                  <motion.div
                    key={index}
                    className="player-box"
                    onClick={() => {
                      handleAddPlayer(player.playerId);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <p>{player.name}</p>
                    <p className="nationality">
                      Nationality: {player.nationality}
                    </p>
                    <p className="league">League: {player.league}</p>
                    <p className="club-info">Club: {player.club}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Card;
