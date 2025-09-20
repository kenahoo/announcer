import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Papa from 'papaparse';

// Initial roster data
const initialHomeRoster = [
  { number: 1, firstName: 'Alice', lastName: 'Smith', grade: '', position: 'GK', scores: '', yellowCard: false, redCard: false },
  { number: 2, firstName: 'Beth', lastName: 'Johnson', grade: '', position: 'DF', scores: '', yellowCard: false, redCard: false },
  { number: 3, firstName: 'Cara', lastName: 'Williams', grade: '', position: 'DF', scores: '', yellowCard: false, redCard: false },
  { number: 4, firstName: 'Dana', lastName: 'Brown', grade: '', position: 'DF', scores: '', yellowCard: false, redCard: false },
  { number: 5, firstName: 'Eva', lastName: 'Jones', grade: '', position: 'DF', scores: '', yellowCard: false, redCard: false },
  { number: 6, firstName: 'Fay', lastName: 'Miller', grade: '', position: 'MF', scores: '', yellowCard: false, redCard: false },
  { number: 7, firstName: 'Gina', lastName: 'Wilson', grade: '', position: 'MF', scores: '', yellowCard: false, redCard: false },
  { number: 8, firstName: 'Holly', lastName: 'Moore', grade: '', position: 'MF', scores: '', yellowCard: false, redCard: false },
  { number: 9, firstName: 'Ivy', lastName: 'Taylor', grade: '', position: 'MF', scores: '', yellowCard: false, redCard: false },
  { number: 10, firstName: 'Jade', lastName: 'Anderson', grade: '', position: 'FW', scores: '', yellowCard: false, redCard: false },
  { number: 11, firstName: 'Kate', lastName: 'Thomas', grade: '', position: 'FW', scores: '', yellowCard: false, redCard: false },
  { number: 12, firstName: 'Lara', lastName: 'Jackson', grade: '', position: 'FW', scores: '', yellowCard: false, redCard: false },
  { number: 13, firstName: 'Mia', lastName: 'White', grade: '', position: 'DF', scores: '', yellowCard: false, redCard: false },
  { number: 14, firstName: 'Nina', lastName: 'Harris', grade: '', position: 'MF', scores: '', yellowCard: false, redCard: false },
  { number: 15, firstName: 'Olga', lastName: 'Martin', grade: '', position: 'DF', scores: '', yellowCard: false, redCard: false },
  { number: 16, firstName: 'Paula', lastName: 'Thompson', grade: '', position: 'MF', scores: '', yellowCard: false, redCard: false },
  { number: 17, firstName: 'Quinn', lastName: 'Garcia', grade: '', position: 'FW', scores: '', yellowCard: false, redCard: false },
  { number: 18, firstName: 'Rita', lastName: 'Martinez', grade: '', position: 'DF', scores: '', yellowCard: false, redCard: false },
  { number: 19, firstName: 'Sara', lastName: 'Robinson', grade: '', position: 'MF', scores: '', yellowCard: false, redCard: false },
  { number: 20, firstName: 'Tina', lastName: 'Clark', grade: '', position: 'FW', scores: '', yellowCard: false, redCard: false }
];

const initialOpponentRoster = [
  { number: 1, firstName: 'Aaron', lastName: 'King', grade: '', position: 'GK', scores: '', yellowCard: false, redCard: false },
  { number: 2, firstName: 'Ben', lastName: 'Wright', grade: '', position: 'DF', scores: '', yellowCard: false, redCard: false },
  { number: 3, firstName: 'Caleb', lastName: 'Lopez', grade: '', position: 'DF', scores: '', yellowCard: false, redCard: false },
  { number: 4, firstName: 'Dylan', lastName: 'Hill', grade: '', position: 'DF', scores: '', yellowCard: false, redCard: false },
  { number: 5, firstName: 'Eli', lastName: 'Scott', grade: '', position: 'DF', scores: '', yellowCard: false, redCard: false },
  { number: 6, firstName: 'Finn', lastName: 'Green', grade: '', position: 'MF', scores: '', yellowCard: false, redCard: false },
  { number: 7, firstName: 'Gabe', lastName: 'Adams', grade: '', position: 'MF', scores: '', yellowCard: false, redCard: false },
  { number: 8, firstName: 'Henry', lastName: 'Nelson', grade: '', position: 'MF', scores: '', yellowCard: false, redCard: false },
  { number: 9, firstName: 'Isaac', lastName: 'Baker', grade: '', position: 'MF', scores: '', yellowCard: false, redCard: false },
  { number: 10, firstName: 'Jack', lastName: 'Carter', grade: '', position: 'FW', scores: '', yellowCard: false, redCard: false },
  { number: 11, firstName: 'Kyle', lastName: 'Mitchell', grade: '', position: 'FW', scores: '', yellowCard: false, redCard: false },
  { number: 12, firstName: 'Liam', lastName: 'Perez', grade: '', position: 'FW', scores: '', yellowCard: false, redCard: false },
  { number: 13, firstName: 'Mason', lastName: 'Roberts', grade: '', position: 'DF', scores: '', yellowCard: false, redCard: false },
  { number: 14, firstName: 'Noah', lastName: 'Turner', grade: '', position: 'MF', scores: '', yellowCard: false, redCard: false },
  { number: 15, firstName: 'Owen', lastName: 'Phillips', grade: '', position: 'DF', scores: '', yellowCard: false, redCard: false },
  { number: 16, firstName: 'Paul', lastName: 'Campbell', grade: '', position: 'MF', scores: '', yellowCard: false, redCard: false },
  { number: 17, firstName: 'Quentin', lastName: 'Parker', grade: '', position: 'FW', scores: '', yellowCard: false, redCard: false },
  { number: 18, firstName: 'Ryan', lastName: 'Evans', grade: '', position: 'DF', scores: '', yellowCard: false, redCard: false },
  { number: 19, firstName: 'Sam', lastName: 'Edwards', grade: '', position: 'MF', scores: '', yellowCard: false, redCard: false },
  { number: 20, firstName: 'Tom', lastName: 'Collins', grade: '', position: 'FW', scores: '', yellowCard: false, redCard: false }
];

function AutoWidthInput({ value, onChange, type = 'text', style = {}, ...props }) {
  const spanRef = useRef(null);
  const inputRef = useRef(null);
  const [inputWidth, setInputWidth] = useState(20);

  useEffect(() => {
    if (spanRef.current) {
      setInputWidth(spanRef.current.offsetWidth + 8); // add some padding
    }
  }, [value]);

  return (
    <>
      <input
        ref={inputRef}
        type={type}
        value={value}
        onChange={onChange}
        style={{ ...style, width: inputWidth, minWidth: 20, maxWidth: 400, boxSizing: 'content-box' }}
        {...props}
      />
      <span
        ref={spanRef}
        style={{
          position: 'absolute',
          visibility: 'hidden',
          height: 0,
          overflow: 'hidden',
          whiteSpace: 'pre',
          fontSize: style.fontSize || 'inherit',
          fontFamily: style.fontFamily || 'inherit',
          fontWeight: style.fontWeight || 'inherit',
          padding: style.padding || '2px 4px',
          border: style.border || 'none',
        }}
      >{value || ''}</span>
    </>
  );
}

function Roster({ teamName, onTeamNameChange, score, onScoreChange, players, status, toggleStatus, handlePlayerChange, handleRemovePlayer, handleAddPlayer, handleImportCSV }) {
  // Card toggle handlers
  const handleToggleCard = (idx, cardType) => {
    handlePlayerChange(idx, cardType, !players[idx][cardType]);
  };

  return (
    <div className="roster">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px', gap: '8px' }}>
        <label style={{ padding: '4px 10px', fontSize: '0.9em', cursor: 'pointer', background: '#eaeaea', borderRadius: '4px', border: '1px solid #ccc' }}>
          Import CSV
          <input type="file" accept=".csv,text/csv" style={{ display: 'none' }} onChange={handleImportCSV} />
        </label>
      </div>
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
            <th>Grade</th>
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
              <td style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>&nbsp;&nbsp;
                <button
                  type="button"
                  onClick={e => { e.stopPropagation(); handleRemovePlayer(idx); }}
                  style={{ background: 'transparent', color: '#fff', border: '1px solid #000', borderRadius: '3px', cursor: 'pointer', fontWeight: 'bold', marginLeft: '4px' }}
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
                <AutoWidthInput
                  type="number"
                  value={player.number}
                  onChange={e => handlePlayerChange(idx, 'number', e.target.value)}
                  style={{ width: '60px', color: 'black', background: 'transparent', border: 'none', borderRadius: '0', padding: '2px 4px', textAlign: 'center' }}
                />
              </td>
              <td>
                <AutoWidthInput
                  type="text"
                  value={player.firstName}
                  onChange={e => handlePlayerChange(idx, 'firstName', e.target.value)}
                  style={{ width: '100%', color: 'black', background: 'transparent', border: 'none', borderRadius: '0', padding: '2px 4px' }}
                />
              </td>
              <td>
                <AutoWidthInput
                  type="text"
                  value={player.lastName}
                  onChange={e => handlePlayerChange(idx, 'lastName', e.target.value)}
                  style={{ width: '100%', color: 'black', background: 'transparent', border: 'none', borderRadius: '0', padding: '2px 4px' }}
                />
              </td>
              <td>
                <AutoWidthInput
                  type="text"
                  value={player.grade || ''}
                  onChange={e => handlePlayerChange(idx, 'grade', e.target.value)}
                  style={{ width: '60px', color: 'black', background: 'transparent', border: 'none', borderRadius: '0', padding: '2px 4px', textAlign: 'center' }}
                />
              </td>
              <td>
                <AutoWidthInput
                  type="text"
                  value={player.position}
                  onChange={e => handlePlayerChange(idx, 'position', e.target.value)}
                  style={{ width: '60px', color: 'black', background: 'transparent', border: 'none', borderRadius: '0', padding: '2px 4px', textAlign: 'center' }}
                />
              </td>
              <td>
                <AutoWidthInput
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
  // Unified CSV import handler
  const handleImportCSV = (setRoster) => (e) => {
    const file = e.target.files[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const imported = results.data.map(row => ({
            number: Number(row.number),
            firstName: row.firstName || '',
            lastName: row.lastName || '',
            grade: row.grade || '',
            position: row.position || '',
            scores: row.scores || '',
            yellowCard: row.yellowCard === 'true' || row.yellowCard === '1',
            redCard: row.redCard === 'true' || row.redCard === '1',
          }));
          if (imported.every(p => typeof p.number === 'number' && p.firstName && p.lastName)) {
            setRoster(imported);
          } else {
            // Find which columns are missing
            const missingColumns = [];
            if (!results.meta.fields.includes('number')) missingColumns.push('number');
            if (!results.meta.fields.includes('firstName')) missingColumns.push('firstName');
            if (!results.meta.fields.includes('lastName')) missingColumns.push('lastName');
            if (!results.meta.fields.includes('grade')) missingColumns.push('grade');
            if (!results.meta.fields.includes('position')) missingColumns.push('position');
            // Show a more helpful error message
            alert('Invalid CSV format. Missing columns: ' + (missingColumns.length ? missingColumns.join(', ') : 'Check for empty values in required columns.'));
          }
        } catch {
          alert('Failed to import CSV.');
        }
      }
    });
    e.target.value = '';
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
        handleImportCSV={handleImportCSV(setHomeRoster)}
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
        handleImportCSV={handleImportCSV(setOpponentRoster)}
      />
    </div>
  );
}

export default App;
