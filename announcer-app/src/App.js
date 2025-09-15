import React, { useState } from 'react';
import './App.css';

// Initial roster data
const initialHomeRoster = [
  { number: 1, firstName: 'Alice', lastName: 'Smith', position: 'GK', scores: '', yellowCard: false, redCard: false },
  { number: 2, firstName: 'Beth', lastName: 'Johnson', position: 'DF', scores: '', yellowCard: false, redCard: false },
  { number: 3, firstName: 'Cara', lastName: 'Williams', position: 'DF', scores: '', yellowCard: false, redCard: false },
  { number: 4, firstName: 'Dana', lastName: 'Brown', position: 'DF', scores: '', yellowCard: false, redCard: false },
  { number: 5, firstName: 'Eva', lastName: 'Jones', position: 'DF', scores: '', yellowCard: false, redCard: false },
  { number: 6, firstName: 'Fay', lastName: 'Miller', position: 'MF', scores: '', yellowCard: false, redCard: false },
  { number: 7, firstName: 'Gina', lastName: 'Wilson', position: 'MF', scores: '', yellowCard: false, redCard: false },
  { number: 8, firstName: 'Holly', lastName: 'Moore', position: 'MF', scores: '', yellowCard: false, redCard: false },
  { number: 9, firstName: 'Ivy', lastName: 'Taylor', position: 'MF', scores: '', yellowCard: false, redCard: false },
  { number: 10, firstName: 'Jade', lastName: 'Anderson', position: 'FW', scores: '', yellowCard: false, redCard: false },
  { number: 11, firstName: 'Kate', lastName: 'Thomas', position: 'FW', scores: '', yellowCard: false, redCard: false },
  { number: 12, firstName: 'Lara', lastName: 'Jackson', position: 'FW', scores: '', yellowCard: false, redCard: false },
  { number: 13, firstName: 'Mia', lastName: 'White', position: 'DF', scores: '', yellowCard: false, redCard: false },
  { number: 14, firstName: 'Nina', lastName: 'Harris', position: 'MF', scores: '', yellowCard: false, redCard: false },
  { number: 15, firstName: 'Olga', lastName: 'Martin', position: 'DF', scores: '', yellowCard: false, redCard: false },
  { number: 16, firstName: 'Paula', lastName: 'Thompson', position: 'MF', scores: '', yellowCard: false, redCard: false },
  { number: 17, firstName: 'Quinn', lastName: 'Garcia', position: 'FW', scores: '', yellowCard: false, redCard: false },
  { number: 18, firstName: 'Rita', lastName: 'Martinez', position: 'DF', scores: '', yellowCard: false, redCard: false },
  { number: 19, firstName: 'Sara', lastName: 'Robinson', position: 'MF', scores: '', yellowCard: false, redCard: false },
  { number: 20, firstName: 'Tina', lastName: 'Clark', position: 'FW', scores: '', yellowCard: false, redCard: false }
];

const initialOpponentRoster = [
  { number: 1, firstName: 'Aaron', lastName: 'King', position: 'GK', scores: '', yellowCard: false, redCard: false },
  { number: 2, firstName: 'Ben', lastName: 'Wright', position: 'DF', scores: '', yellowCard: false, redCard: false },
  { number: 3, firstName: 'Caleb', lastName: 'Lopez', position: 'DF', scores: '', yellowCard: false, redCard: false },
  { number: 4, firstName: 'Dylan', lastName: 'Hill', position: 'DF', scores: '', yellowCard: false, redCard: false },
  { number: 5, firstName: 'Eli', lastName: 'Scott', position: 'DF', scores: '', yellowCard: false, redCard: false },
  { number: 6, firstName: 'Finn', lastName: 'Green', position: 'MF', scores: '', yellowCard: false, redCard: false },
  { number: 7, firstName: 'Gabe', lastName: 'Adams', position: 'MF', scores: '', yellowCard: false, redCard: false },
  { number: 8, firstName: 'Henry', lastName: 'Nelson', position: 'MF', scores: '', yellowCard: false, redCard: false },
  { number: 9, firstName: 'Isaac', lastName: 'Baker', position: 'MF', scores: '', yellowCard: false, redCard: false },
  { number: 10, firstName: 'Jack', lastName: 'Carter', position: 'FW', scores: '', yellowCard: false, redCard: false },
  { number: 11, firstName: 'Kyle', lastName: 'Mitchell', position: 'FW', scores: '', yellowCard: false, redCard: false },
  { number: 12, firstName: 'Liam', lastName: 'Perez', position: 'FW', scores: '', yellowCard: false, redCard: false },
  { number: 13, firstName: 'Mason', lastName: 'Roberts', position: 'DF', scores: '', yellowCard: false, redCard: false },
  { number: 14, firstName: 'Noah', lastName: 'Turner', position: 'MF', scores: '', yellowCard: false, redCard: false },
  { number: 15, firstName: 'Owen', lastName: 'Phillips', position: 'DF', scores: '', yellowCard: false, redCard: false },
  { number: 16, firstName: 'Paul', lastName: 'Campbell', position: 'MF', scores: '', yellowCard: false, redCard: false },
  { number: 17, firstName: 'Quentin', lastName: 'Parker', position: 'FW', scores: '', yellowCard: false, redCard: false },
  { number: 18, firstName: 'Ryan', lastName: 'Evans', position: 'DF', scores: '', yellowCard: false, redCard: false },
  { number: 19, firstName: 'Sam', lastName: 'Edwards', position: 'MF', scores: '', yellowCard: false, redCard: false },
  { number: 20, firstName: 'Tom', lastName: 'Collins', position: 'FW', scores: '', yellowCard: false, redCard: false }
];

function Roster({ teamName, onTeamNameChange, score, onScoreChange, players, status, toggleStatus, handlePlayerChange, handleRemovePlayer, handleAddPlayer }) {
  // Card toggle handlers
  const handleToggleCard = (idx, cardType) => {
    handlePlayerChange(idx, cardType, !players[idx][cardType]);
  };

  return (
    <div className="roster">
      <div className="team-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', gap: '32px' }}>
        <input
          type="text"
          value={teamName}
          onChange={onTeamNameChange}
          className="team-name-input"
          style={{ fontSize: '1.5em', fontWeight: 'bold', textAlign: 'center', flex: 1, minWidth: '120px', border: 'none', background: 'transparent', color: '#222' }}
          placeholder="Team Name"
        />
        <input
          type="number"
          value={score}
          onChange={onScoreChange}
          className="team-score-input"
          min={0}
          style={{ fontSize: '2.5em', fontWeight: 'bold', width: '110px', textAlign: 'center', borderRadius: '8px', border: '2px solid #888', background: '#fff', color: '#222', margin: '0 16px' }}
          aria-label="Team Score"
        />
      </div>
      <table className="roster-table">
        <thead>
          <tr>
            <th></th>
            <th>Number</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Position</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {players.sort((a, b) => a.number - b.number).map((player, idx) => (
            <tr
              key={player.number}
              style={{ backgroundColor: status[player.number] ? '#8c8' : '#c88', color: 'white', cursor: 'pointer' }}
              onClick={e => {
                if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'BUTTON') toggleStatus(player.number);
              }}
            >
              <td style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <button
                  type="button"
                  onClick={e => { e.stopPropagation(); handleRemovePlayer(idx); }}
                  style={{ background: 'transparent', color: '#fff', border: '1px solid #000', borderRadius: '3px', cursor: 'pointer', fontWeight: 'bold' }}
                  aria-label="Remove Player"
                >×</button>
                <button
                  type="button"
                  onClick={e => { e.stopPropagation(); handleToggleCard(idx, 'yellowCard'); }}
                  style={{ background: player.yellowCard ? '#ff0' : 'transparent', border: '1px solid #ff0', borderRadius: '3px', width: '18px', height: '18px', padding: 0, cursor: 'pointer', marginLeft: '2px' }}
                  aria-label="Toggle Yellow Card"
                  title="Yellow Card"
                >
                </button>
                <button
                  type="button"
                  onClick={e => { e.stopPropagation(); handleToggleCard(idx, 'redCard'); }}
                  style={{ background: player.redCard ? '#f00' : 'transparent', border: '1px solid #f00', borderRadius: '3px', width: '18px', height: '18px', padding: 0, cursor: 'pointer', marginLeft: '2px' }}
                  aria-label="Toggle Red Card"
                  title="Red Card"
                >
                </button>
              </td>
              <td>
                <input
                  type="number"
                  value={player.number}
                  onChange={e => handlePlayerChange(idx, 'number', e.target.value)}
                  style={{ width: '60px', color: 'black', background: 'transparent', border: 'none', borderRadius: '0', padding: '2px 4px', textAlign: 'center' }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={player.firstName}
                  onChange={e => handlePlayerChange(idx, 'firstName', e.target.value)}
                  style={{ width: '100%', color: 'black', background: 'transparent', border: 'none', borderRadius: '0', padding: '2px 4px' }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={player.lastName}
                  onChange={e => handlePlayerChange(idx, 'lastName', e.target.value)}
                  style={{ width: '100%', color: 'black', background: 'transparent', border: 'none', borderRadius: '0', padding: '2px 4px' }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={player.position}
                  onChange={e => handlePlayerChange(idx, 'position', e.target.value)}
                  style={{ width: '60px', color: 'black', background: 'transparent', border: 'none', borderRadius: '0', padding: '2px 4px', textAlign: 'center' }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={player.scores}
                  onChange={e => handlePlayerChange(idx, 'scores', e.target.value)}
                  style={{ width: '100%', color: 'black', background: 'transparent', border: 'none', borderRadius: '0', padding: '2px 6px' }}
                  onClick={e => e.stopPropagation()}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ textAlign: 'right', marginTop: '8px' }}>
        <button
          type="button"
          onClick={handleAddPlayer}
          style={{ background: '#eaeaea', color: '#222', border: '1px solid #ccc', borderRadius: '4px', padding: '4px 12px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Add Player
        </button>
      </div>
    </div>
  );
}

function App() {
  const [homeStatus, setHomeStatus] = useState({});
  const [opponentStatus, setOpponentStatus] = useState({});
  const [homeRoster, setHomeRoster] = useState(initialHomeRoster);
  const [opponentRoster, setOpponentRoster] = useState(initialOpponentRoster);
  const [homeTeamName, setHomeTeamName] = useState('Home Team');
  const [opponentTeamName, setOpponentTeamName] = useState('Opponent');
  const [homeScore, setHomeScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);

  const toggleHomeStatus = (num) => {
    setHomeStatus(prev => ({ ...prev, [num]: !prev[num] }));
  };
  const toggleOpponentStatus = (num) => {
    setOpponentStatus(prev => ({ ...prev, [num]: !prev[num] }));
  };

  // Generalized player change handler
  const handleHomePlayerChange = (idx, field, value) => {
    setHomeRoster(prev => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: field === 'number' ? Number(value) : value };
      return updated;
    });
  };
  const handleOpponentPlayerChange = (idx, field, value) => {
    setOpponentRoster(prev => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: field === 'number' ? Number(value) : value };
      updated[idx] = { ...updated[idx], scores: value };
    });
  };
  // Remove player
  const handleRemoveHomePlayer = (idx) => {
    setHomeRoster(prev => prev.filter((_, i) => i !== idx));
  };
  const handleRemoveOpponentPlayer = (idx) => {
    setOpponentRoster(prev => prev.filter((_, i) => i !== idx));
  };
  // Add player
  const handleAddHomePlayer = () => {
    setHomeRoster(prev => {
      const nextNumber = prev.length > 0 ? Math.max(...prev.map(p => p.number)) + 1 : 1;
      return [...prev, { number: nextNumber, firstName: '', lastName: '', position: '', scores: '', yellowCard: false, redCard: false }];
    });
  };
  const handleAddOpponentPlayer = () => {
    setOpponentRoster(prev => {
      const nextNumber = prev.length > 0 ? Math.max(...prev.map(p => p.number)) + 1 : 1;
      return [...prev, { number: nextNumber, firstName: '', lastName: '', position: '', scores: '', yellowCard: false, redCard: false }];
    });
  };

  return (
    <div className="App" style={{ display: 'flex', justifyContent: 'space-around', padding: '32px' }}>
      <Roster
        teamName={homeTeamName}
        onTeamNameChange={e => setHomeTeamName(e.target.value)}
        score={homeScore}
        onScoreChange={e => setHomeScore(Number(e.target.value))}
        players={homeRoster}
        status={homeStatus}
        toggleStatus={toggleHomeStatus}
        handlePlayerChange={handleHomePlayerChange}
        handleRemovePlayer={handleRemoveHomePlayer}
        handleAddPlayer={handleAddHomePlayer}
      />
      <Roster
        teamName={opponentTeamName}
        onTeamNameChange={e => setOpponentTeamName(e.target.value)}
        score={opponentScore}
        onScoreChange={e => setOpponentScore(Number(e.target.value))}
        players={opponentRoster}
        status={opponentStatus}
        toggleStatus={toggleOpponentStatus}
        handlePlayerChange={handleOpponentPlayerChange}
        handleRemovePlayer={handleRemoveOpponentPlayer}
        handleAddPlayer={handleAddOpponentPlayer}
      />
    </div>
  );
}

export default App;
