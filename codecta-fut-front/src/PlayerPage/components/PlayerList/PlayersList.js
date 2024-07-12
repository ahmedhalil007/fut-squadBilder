import "./PlayersList.css";
import PlayersListInfo from "./PlayersListInfo";

const PlayersList = ({ fetchPlayers, players, loading }) => {
  return (
    <div className="players-list">
      <h2>Players List</h2>
      <PlayersListInfo
        loading={loading}
        fetchPlayers={fetchPlayers}
        players={players}
      />
    </div>
  );
};

export default PlayersList;
