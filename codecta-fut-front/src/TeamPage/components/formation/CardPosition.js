import React from "react";
import {
  RiAddLine,
  RiDeleteBin7Fill,
  RiStarFill,
  RiStarLine,
} from "react-icons/ri";
import cardImage from "../../../images/card.png";
import cardImage2 from "../../../images/card2.png";

const renderPositionCard = (position, players, openModal, onDelete) => {
  //if there is no players at all, display empty cards
  if (!players || players.length === 0) {
    return (
      <div className={position.toLowerCase()}>
        <img src={cardImage} alt={`Empty Card`} />
        <p>{position}</p>
        <RiAddLine className="icon" onClick={() => openModal(position)} />
      </div>
    );
  }

  const index = players.findIndex((pos) => pos.position === position);
  const player = players[index];

  return (
    <div className={position.toLowerCase()} key={index}>
      <img src={player ? cardImage2 : cardImage} alt={`Card ${index + 1}`} />
      <p>{position}</p>
      {player ? (
        <>
          <div className="info_in_team">
            <p className="name_in_team">{player.name}</p>
            <p className="nat_in_team">{player.nationality}</p>
            <p className="leg_in_team">{player.league}</p>
            <p className="club_in_team">{player.club}</p>
            <RiDeleteBin7Fill
              className="delete_from_team"
              onClick={() => onDelete(player.playerId)}
            ></RiDeleteBin7Fill>
            <div className="star-container">
              {Array.from({ length: player.playerChemistry }, (used, i) => (
                <RiStarFill key={i} className="star-full"></RiStarFill>
              ))}
              {Array.from({ length: 3 - player.playerChemistry }, (used, i) => (
                <RiStarLine key={i} className="star-"></RiStarLine>
              ))}
            </div>
          </div>
        </>
      ) : (
        <RiAddLine className="icon" onClick={() => openModal(position)} />
      )}
    </div>
  );
};

export default renderPositionCard;
