import "./PlayerPage.css";
import CreatePlayer from "./components/CreatePlayer/CreatePlayer";
import PlayersList from "./components/PlayerList/PlayersList";
import axios from "axios";
import { useState, useEffect } from "react";
import { API_ENDPOINT_PLAYER } from "../endpoints";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPlayers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_ENDPOINT_PLAYER);
      setPlayers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching player data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);
  return (
    <div className="players-container">
      <CreatePlayer fetchPlayers={fetchPlayers} />
      <PlayersList
        fetchPlayers={fetchPlayers}
        players={players}
        loading={loading}
      />
    </div>
  );
};

export default Players;
