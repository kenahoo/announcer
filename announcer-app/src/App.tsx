import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Papa from 'papaparse';

// TypeScript interfaces for player and props
interface Player {
  number: number;
  firstName: string;
  lastName: string;
  grade?: string;
  position: string;
  scores: string;
  yellowCard: boolean;
  redCard: boolean;
}

interface Status {
  [number: number]: boolean;
}

interface TeamState {
  roster: Player[];
  status: Status;
  name: string;
  score: number;
}

interface RosterProps {
  team: TeamState;
  setTeam: React.Dispatch<React.SetStateAction<TeamState>>;
  handlePlayerChange: (idx: number, field: keyof Player, value: any) => void;
  handleRemovePlayer: (idx: number) => void;
  handleAddPlayer: () => void;
  handleImportCSV: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleStatus: (num: number) => void;
  activeCount: number;
}

const initialHomeRoster: Player[] = [
  { number: 1, firstName: 'Alice', lastName: 'Smith', grade: '', position: 'GK', scores: '', yellowCard: false, redCard: false },
  { number: 2, firstName: 'Beth', lastName: 'Johnson', grade: '', position: 'DF', scores: '', yellowCard: false, redCard: false },
  { number: 3, firstName: 'Cara', lastName: 'Williams', grade: '', position: 'DF', scores: '', yellowCard: false, redCard: false },
  { number: 4, firstName: 'Dana', lastName: 'Brown', grade: '', position: 'DF', scores: '', yellowCard: false, redCard: false },
];

const initialOpponentRoster: Player[] = [
  { number: 1, firstName: 'Aaron', lastName: 'King', grade: '', position: 'GK', scores: '', yellowCard: false, redCard: false },
  { number: 2, firstName: 'Ben', lastName: 'Wright', grade: '', position: 'DF', scores: '', yellowCard: false, redCard: false },
  { number: 3, firstName: 'Caleb', lastName: 'Lopez', grade: '', position: 'DF', scores: '', yellowCard: false, redCard: false },
  { number: 4, firstName: 'Dylan', lastName: 'Hill', grade: '', position: 'DF', scores: '', yellowCard: false, redCard: false },
];

function AutoWidthInput({ value, onChange, type = 'text', style = {}, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputWidth, setInputWidth] = useState<number>(20);

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
          fontSize: (style as React.CSSProperties).fontSize || 'inherit',
          fontFamily: (style as React.CSSProperties).fontFamily || 'inherit',
          fontWeight: (style as React.CSSProperties).fontWeight || 'inherit',
          padding: (style as React.CSSProperties).padding || '2px 4px',
          border: (style as React.CSSProperties).border || 'none',
        }}
      >{value || ''}</span>
    </>
  );
}

function Roster({ team, setTeam, handlePlayerChange, handleRemovePlayer, handleAddPlayer, handleImportCSV, toggleStatus, activeCount }: RosterProps) {
  // Card toggle handlers
  const handleToggleCard = (idx: number, cardType: keyof Player) => {
    handlePlayerChange(idx, cardType, !team.roster[idx][cardType]);
  };

  return (
    <div className="roster">
      <div className="team-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', gap: '32px' }}>
        <input
          type="text"
          value={team.name}
          onChange={e => setTeam(prev => ({ ...prev, name: e.target.value }))}
          className="team-name-input"
          style={{ fontSize: '1.5em', fontWeight: 'bold', textAlign: 'center', flex: 1, minWidth: '120px', border: 'none', background: 'transparent', color: '#222' }}
          placeholder="Team Name"
        />
        <input
          type="number"
          value={team.score}
          onChange={e => setTeam(prev => ({ ...prev, score: Number(e.target.value) }))}
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
          {team.roster.sort((a, b) => a.number - b.number).map((player, idx) => (
            <tr
              key={player.number}
              className={team.status[player.number] ? 'player-active' : 'player-inactive'}
              style={{ cursor: 'pointer' }}
              onClick={e => {
                if ((e.target as HTMLElement).tagName !== 'INPUT' && (e.target as HTMLElement).tagName !== 'BUTTON') toggleStatus(player.number);
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
        <span style={{ fontSize: '0.95em', color: '#222', fontWeight: 500 }}>
          Active players: {activeCount}
        </span>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input
            type="file"
            accept=".csv,text/csv"
            style={{ display: 'none' }}
            id="csv-import-input"
            onChange={handleImportCSV}
          />
          <button
            onClick={() => document.getElementById('csv-import-input')?.click()}
            style={{ cursor: 'pointer'}}
          >
            Import CSV
          </button>
          <button
            onClick={handleAddPlayer}
            style={{ cursor: 'pointer'}}
          >
            Add Player
          </button>
        </div>
      </div>
    </div>
  );
}

function importPlayersFromCSV(file: File, onSuccess: (players: Player[]) => void, onError: (msg: string) => void) {
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: (results: Papa.ParseResult<any>) => {
      try {
        const requiredFields = ['number', 'firstName', 'lastName'];
        const missingColumns = requiredFields.filter(f => !results.meta.fields?.includes(f));
        if (missingColumns.length) {
          onError('Invalid CSV format. Missing columns: ' + missingColumns.join(', '));
          return;
        }
        const players: Player[] = [];
        for (let i = 0; i < results.data.length; i++) {
          const row = results.data[i];
          if (
            row.number === undefined || row.number === '' || isNaN(Number(row.number)) ||
            !row.firstName || !row.lastName
          ) {
            onError(`Invalid data in row ${i + 2}: Each player must have a valid number, firstName, and lastName.`);
            return;
          }
          players.push({
            number: Number(row.number),
            firstName: row.firstName,
            lastName: row.lastName,
            grade: row.grade || '',
            position: row.position || '',
            scores: row.scores || '',
            yellowCard: row.yellowCard === 'true' || row.yellowCard === '1',
            redCard: row.redCard === 'true' || row.redCard === '1',
          });
        }
        onSuccess(players);
      } catch {
        onError('Failed to import CSV.');
      }
    }
  });
}

function getLocalStorage<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function setLocalStorage(key: string, value: any) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

function App() {
  // Load from localStorage or fallback to initial values
  const [homeTeam, setHomeTeam] = useState<TeamState>(() => ({
    roster: getLocalStorage<Player[]>('homeRoster', initialHomeRoster),
    status: getLocalStorage<Status>('homeStatus', {}),
    name: getLocalStorage<string>('homeName', 'Home Team'),
    score: getLocalStorage<number>('homeScore', 0),
  }));
  const [opponentTeam, setOpponentTeam] = useState<TeamState>(() => ({
    roster: getLocalStorage<Player[]>('opponentRoster', initialOpponentRoster),
    status: getLocalStorage<Status>('opponentStatus', {}),
    name: getLocalStorage<string>('opponentName', 'Opponent'),
    score: getLocalStorage<number>('opponentScore', 0),
  }));

  // Persist changes to localStorage
  useEffect(() => { setLocalStorage('homeRoster', homeTeam.roster); }, [homeTeam.roster]);
  useEffect(() => { setLocalStorage('homeStatus', homeTeam.status); }, [homeTeam.status]);
  useEffect(() => { setLocalStorage('homeName', homeTeam.name); }, [homeTeam.name]);
  useEffect(() => { setLocalStorage('homeScore', homeTeam.score); }, [homeTeam.score]);
  useEffect(() => { setLocalStorage('opponentRoster', opponentTeam.roster); }, [opponentTeam.roster]);
  useEffect(() => { setLocalStorage('opponentStatus', opponentTeam.status); }, [opponentTeam.status]);
  useEffect(() => { setLocalStorage('opponentName', opponentTeam.name); }, [opponentTeam.name]);
  useEffect(() => { setLocalStorage('opponentScore', opponentTeam.score); }, [opponentTeam.score]);

  const handlePlayerChange = (setTeam: React.Dispatch<React.SetStateAction<TeamState>>) => (idx: number, field: keyof Player, value: any) => {
    setTeam(prev => {
      const updated = [...prev.roster];
      if (field === 'number') {
        const num = Number(value);
        updated[idx] = { ...updated[idx], number: isNaN(num) || value === '' ? updated[idx].number : num };
      } else {
        updated[idx] = { ...updated[idx], [field]: value };
      }
      return { ...prev, roster: updated };
    });
  };
  const handleRemovePlayer = (setTeam: React.Dispatch<React.SetStateAction<TeamState>>) => (idx: number) => {
    setTeam(prev => ({ ...prev, roster: prev.roster.filter((_, i) => i !== idx) }));
  };
  const handleAddPlayer = (setTeam: React.Dispatch<React.SetStateAction<TeamState>>) => () => {
    setTeam(prev => {
      const nextNumber = prev.roster.length > 0 ? Math.max(...prev.roster.map(p => p.number)) + 1 : 1;
      return { ...prev, roster: [...prev.roster, { number: nextNumber, firstName: '', lastName: '', position: '', scores: '', yellowCard: false, redCard: false }] };
    });
  };
  const handleImportCSV = (setTeam: React.Dispatch<React.SetStateAction<TeamState>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    importPlayersFromCSV(
      file,
      (imported) => setTeam(prev => ({ ...prev, roster: imported })),
      (msg) => alert(msg)
    );
    e.target.value = '';
  };
  const toggleStatus = (setTeam: React.Dispatch<React.SetStateAction<TeamState>>) => (num: number) => {
    setTeam(prev => ({ ...prev, status: { ...prev.status, [num]: !prev.status[num] } }));
  };

  // Calculate active player counts
  const homeActiveCount = homeTeam.roster.filter(p => homeTeam.status[p.number]).length;
  const opponentActiveCount = opponentTeam.roster.filter(p => opponentTeam.status[p.number]).length;

  return (
    <div className="App" style={{ display: 'flex', justifyContent: 'space-around', padding: '32px' }}>
      <Roster
        team={homeTeam}
        setTeam={setHomeTeam}
        handlePlayerChange={handlePlayerChange(setHomeTeam)}
        handleRemovePlayer={handleRemovePlayer(setHomeTeam)}
        handleAddPlayer={handleAddPlayer(setHomeTeam)}
        handleImportCSV={handleImportCSV(setHomeTeam)}
        toggleStatus={toggleStatus(setHomeTeam)}
        activeCount={homeActiveCount}
      />
      <Roster
        team={opponentTeam}
        setTeam={setOpponentTeam}
        handlePlayerChange={handlePlayerChange(setOpponentTeam)}
        handleRemovePlayer={handleRemovePlayer(setOpponentTeam)}
        handleAddPlayer={handleAddPlayer(setOpponentTeam)}
        handleImportCSV={handleImportCSV(setOpponentTeam)}
        toggleStatus={toggleStatus(setOpponentTeam)}
        activeCount={opponentActiveCount}
      />
    </div>
  );
}

export default App;
