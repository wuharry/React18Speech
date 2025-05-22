import { useState } from "react";

export default function StateUpdateComparison() {
  const [player1, setPlayer1] = useState({ name: "Player 1", score: 0 });
  const [player2, setPlayer2] = useState({ name: "Player 2", score: 0 });

  // ❌ 不安全的寫法 - 可能丟失更新
  const unsafeIncrement = () => {
    setPlayer1({
      ...player1,
      score: player1.score + 1,
    });
  };

  // ✅ 安全的寫法 - 使用函數式更新
  const safeIncrement = () => {
    setPlayer2((prev) => ({
      ...prev,
      score: prev.score + 1,
    }));
  };

  // 快速連續更新測試
  const rapidUnsafeUpdate = () => {
    // 連續執行多次更新
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        setPlayer1({
          ...player1, // 危險：可能讀到相同的舊值
          score: player1.score + 1,
        });
      }, i * 10);
    }
  };

  const rapidSafeUpdate = () => {
    // 連續執行多次更新
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        setPlayer2((prev) => ({
          ...prev, // 安全：總是拿到最新值
          score: prev.score + 1,
        }));
      }, i * 10);
    }
  };

  const reset = () => {
    setPlayer1({ name: "Player 1", score: 0 });
    setPlayer2({ name: "Player 2", score: 0 });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        狀態更新安全性比較
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* 不安全的寫法 */}
        <div className="border-2 border-red-300 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-red-600 mb-3">
            ❌ 不安全寫法
          </h2>
          <div className="bg-red-50 p-3 rounded mb-3">
            <p className="text-sm text-red-700">
              使用當前的 state 值：<code>...player1</code>
            </p>
          </div>

          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {player1.score}
            </div>
            <p className="text-sm text-gray-600">{player1.name}</p>
          </div>

          <div className="space-y-2">
            <button
              onClick={unsafeIncrement}
              className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              +1 (不安全)
            </button>
            <button
              onClick={rapidUnsafeUpdate}
              className="w-full px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800"
            >
              快速 +5 (不安全)
            </button>
          </div>

          <div className="mt-3 p-2 bg-yellow-100 rounded text-xs">
            <strong>問題：</strong>
            <ul className="mt-1 space-y-1">
              <li>• 快速點擊可能丟失更新</li>
              <li>• 非同步操作中使用過時的 state</li>
              <li>• 在批次更新時可能不準確</li>
            </ul>
          </div>
        </div>

        {/* 安全的寫法 */}
        <div className="border-2 border-green-300 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-green-600 mb-3">
            ✅ 安全寫法
          </h2>
          <div className="bg-green-50 p-3 rounded mb-3">
            <p className="text-sm text-green-700">
              使用函數式更新：<code>prev => &#123;...prev&#125;</code>
            </p>
          </div>

          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {player2.score}
            </div>
            <p className="text-sm text-gray-600">{player2.name}</p>
          </div>

          <div className="space-y-2">
            <button
              onClick={safeIncrement}
              className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              +1 (安全)
            </button>
            <button
              onClick={rapidSafeUpdate}
              className="w-full px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
            >
              快速 +5 (安全)
            </button>
          </div>

          <div className="mt-3 p-2 bg-blue-100 rounded text-xs">
            <strong>優點：</strong>
            <ul className="mt-1 space-y-1">
              <li>• 總是基於最新的 state 更新</li>
              <li>• 適合快速連續操作</li>
              <li>• 非同步操作更安全</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center mb-6">
        <button
          onClick={reset}
          className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          重置分數
        </button>
      </div>

      {/* 程式碼比較 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="font-bold text-red-800 mb-2">❌ 不安全的寫法</h3>
          <pre className="bg-white p-3 rounded text-xs overflow-x-auto">
            <code>{`function handleIncrement() {
  setPlayer({
    ...player,  // 可能是舊值
    score: player.score + 1
  });
}`}</code>
          </pre>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-bold text-green-800 mb-2">✅ 安全的寫法</h3>
          <pre className="bg-white p-3 rounded text-xs overflow-x-auto">
            <code>{`function handleIncrement() {
  setPlayer(prev => ({
    ...prev,  // 總是最新值
    score: prev.score + 1
  }));
}`}</code>
          </pre>
        </div>
      </div>

      {/* 測試說明 */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">🧪 測試方法</h3>
        <div className="text-sm space-y-2">
          <p>
            <strong>單次點擊：</strong>兩邊都正常工作
          </p>
          <p>
            <strong>快速 +5：</strong>左邊可能只增加 1-3，右邊會正確增加 5
          </p>
          <p>
            <strong>原因：</strong>左邊的多個更新可能基於相同的舊 state 值
          </p>
        </div>
      </div>

      {/* React 18 的改進 */}
      <div className="mt-4 p-4 bg-purple-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">
          📝 React 18 的自動批次處理
        </h3>
        <div className="text-sm space-y-2">
          <p>React 18 改進了批次處理，但函數式更新仍然是最佳實踐：</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>確保基於最新狀態更新</li>
            <li>避免閉包陷阱問題</li>
            <li>更好的可讀性和維護性</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
