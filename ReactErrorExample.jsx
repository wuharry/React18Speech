import { useState, useEffect } from "react";

export function App(props) {
  const [player, setPlayer] = useState({
    firstName: "Ranjani",
    lastName: "Shettar",
    score: 10,
  });

  function handlePlusClick() {
    player.score++;
  }

  function handleFirstNameChange(e) {
    setPlayer({
      ...player,
      firstName: e.target.value,
    });
  }

  function handleLastNameChange(e) {
    setPlayer({
      lastName: e.target.value,
    });
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Player Information</h1>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <label className="font-medium">
            Score:{" "}
            <span className="text-2xl font-bold text-blue-600">
              {player.score}
            </span>
          </label>
          <button
            onClick={handlePlusClick}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            +1
          </button>
        </div>

        <div>
          <label className="block font-medium mb-1">First name:</label>
          <input
            value={player.firstName}
            onChange={handleFirstNameChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Last name:</label>
          <input
            value={player.lastName}
            onChange={handleLastNameChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="p-3 bg-gray-100 rounded">
          <p className="text-sm">
            <strong>Full Name:</strong> {player.firstName} {player.lastName}
          </p>
        </div>
      </div>
    </div>
  );
}
