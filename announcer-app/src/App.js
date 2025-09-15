import React, { useState } from 'react';
import './App.css';

// Initial roster data
const initialHomeRoster = [
  { number: 1, firstName: 'Alice', lastName: 'Smith', position: 'GK', scores: '' },
  { number: 2, firstName: 'Beth', lastName: 'Johnson', position: 'DF', scores: '' },
  { number: 3, firstName: 'Cara', lastName: 'Williams', position: 'DF', scores: '' },
  { number: 4, firstName: 'Dana', lastName: 'Brown', position: 'DF', scores: '' },
  { number: 5, firstName: 'Eva', lastName: 'Jones', position: 'DF', scores: '' },
  { number: 6, firstName: 'Fay', lastName: 'Miller', position: 'MF', scores: '' },
  { number: 7, firstName: 'Gina', lastName: 'Wilson', position: 'MF', scores: '' },
  { number: 8, firstName: 'Holly', lastName: 'Moore', position: 'MF', scores: '' },
  { number: 9, firstName: 'Ivy', lastName: 'Taylor', position: 'MF', scores: '' },
  { number: 10, firstName: 'Jade', lastName: 'Anderson', position: 'FW', scores: '' },
  { number: 11, firstName: 'Kate', lastName: 'Thomas', position: 'FW', scores: '' },
  { number: 12, firstName: 'Lara', lastName: 'Jackson', position: 'FW', scores: '' },
  { number: 13, firstName: 'Mia', lastName: 'White', position: 'DF', scores: '' },
  { number: 14, firstName: 'Nina', lastName: 'Harris', position: 'MF', scores: '' },
  { number: 15, firstName: 'Olga', lastName: 'Martin', position: 'DF', scores: '' },
  { number: 16, firstName: 'Paula', lastName: 'Thompson', position: 'MF', scores: '' },
  { number: 17, firstName: 'Quinn', lastName: 'Garcia', position: 'FW', scores: '' },
  { number: 18, firstName: 'Rita', lastName: 'Martinez', position: 'DF', scores: '' },
  { number: 19, firstName: 'Sara', lastName: 'Robinson', position: 'MF', scores: '' },
  { number: 20, firstName: 'Tina', lastName: 'Clark', position: 'FW', scores: '' }
];

const initialOpponentRoster = [
  { number: 1, firstName: 'Aaron', lastName: 'King', position: 'GK', scores: '' },
  { number: 2, firstName: 'Ben', lastName: 'Wright', position: 'DF', scores: '' },
  { number: 3, firstName: 'Caleb', lastName: 'Lopez', position: 'DF', scores: '' },
  { number: 4, firstName: 'Dylan', lastName: 'Hill', position: 'DF', scores: '' },
  { number: 5, firstName: 'Eli', lastName: 'Scott', position: 'DF', scores: '' },
  { number: 6, firstName: 'Finn', lastName: 'Green', position: 'MF', scores: '' },
  { number: 7, firstName: 'Gabe', lastName: 'Adams', position: 'MF', scores: '' },
  { number: 8, firstName: 'Henry', lastName: 'Nelson', position: 'MF', scores: '' },
  { number: 9, firstName: 'Isaac', lastName: 'Baker', position: 'MF', scores: '' },
  { number: 10, firstName: 'Jack', lastName: 'Carter', position: 'FW', scores: '' },
  { number: 11, firstName: 'Kyle', lastName: 'Mitchell', position: 'FW', scores: '' },
  { number: 12, firstName: 'Liam', lastName: 'Perez', position: 'FW', scores: '' },
  { number: 13, firstName: 'Mason', lastName: 'Roberts', position: 'DF', scores: '' },
  { number: 14, firstName: 'Noah', lastName: 'Turner', position: 'MF', scores: '' },
  { number: 15, firstName: 'Owen', lastName: 'Phillips', position: 'DF', scores: '' },
  { number: 16, firstName: 'Paul', lastName: 'Campbell', position: 'MF', scores: '' },
  { number: 17, firstName: 'Quentin', lastName: 'Parker', position: 'FW', scores: '' },
  { number: 18, firstName: 'Ryan', lastName: 'Evans', position: 'DF', scores: '' },
  { number: 19, firstName: 'Sam', lastName: 'Edwards', position: 'MF', scores: '' },
  { number: 20, firstName: 'Tom', lastName: 'Collins', position: 'FW', scores: '' }
];

function Roster({ teamName, onTeamNameChange, score, onScoreChange, players, status, toggleStatus, handleScoreChange }) {
  return (
    <div className="roster">
      <div className="team-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', gap: '32px' }}>
        <input
          type="text"
          value={teamName}
          onChange={onTeamNameChange}
          className="team-name-input"
          style={{
            fontSize: '1.5em',
            fontWeight: 'bold',
            textAlign: 'center',
            flex: 1,
            minWidth: '120px',
            border: 'none',
            background: 'transparent',
            color: '#222'
          }}
          placeholder="Team Name"
        />
        <input
          type="number"
          value={score}
          onChange={onScoreChange}
          className="team-score-input"
          min={0}
          style={{
            fontSize: '2.5em',
            fontWeight: 'bold',
            width: '110px',
            textAlign: 'center',
            borderRadius: '8px',
            border: '2px solid #888',
            background: '#fff',
            color: '#222',
            margin: '0 16px',
          }}
          aria-label="Team Score"
        />
      </div>
      <table className="roster-table">
        <thead>
          <tr>
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
              style={{
                backgroundColor: status[player.number] ? 'green' : '#872d2d', // softer red
                color: 'white',
                cursor: 'pointer'
              }}
              onClick={e => {
                if (e.target.tagName !== 'INPUT') toggleStatus(player.number);
              }}
            >
              <td>{player.number}</td>
              <td>{player.firstName}</td>
              <td>{player.lastName}</td>
              <td>{player.position}</td>
              <td>
                <input
                  type="text"
                  value={player.scores}
                  onChange={e => handleScoreChange(idx, e.target.value)}
                  style={{ width: '100%', color: 'black', background: 'white', borderRadius: '4px', border: '1px solid #ccc', padding: '2px 6px' }}
                  onClick={e => e.stopPropagation()}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  // Track status: true = on field (green), false = bench (red)
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

  const handleHomeScoreChange = (idx, value) => {
    setHomeRoster(prev => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], scores: value };
      return updated;
    });
  };
  const handleOpponentScoreChange = (idx, value) => {
    setOpponentRoster(prev => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], scores: value };
      return updated;
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
        handleScoreChange={handleHomeScoreChange}
        isHome={true}
      />
      <Roster
        teamName={opponentTeamName}
        onTeamNameChange={e => setOpponentTeamName(e.target.value)}
        score={opponentScore}
        onScoreChange={e => setOpponentScore(Number(e.target.value))}
        players={opponentRoster}
        status={opponentStatus}
        toggleStatus={toggleOpponentStatus}
        handleScoreChange={handleOpponentScoreChange}
        isHome={false}
      />
    </div>
  );
}

export default App;
