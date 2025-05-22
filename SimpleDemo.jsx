import { useState } from "react";

export default function SimpleKeyDemo() {
  const [users, setUsers] = useState(["Amy", "Bob", "Cindy"]);

  // 在陣列開頭加入 David
  const addDavid = () => {
    setUsers(["David", "Amy", "Bob", "Cindy"]);
  };

  // 重置
  const reset = () => {
    setUsers(["Amy", "Bob", "Cindy"]);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">React Key 示範</h1>

      {/* 控制按鈕 */}
      <div className="mb-6 text-center">
        <button
          onClick={addDavid}
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600"
        >
          在開頭加入 David
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          重置
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* 沒有 key */}
        <div className="border-2 border-red-300 p-4 rounded">
          <h3 className="text-lg font-semibold text-red-600 mb-3">
            ❌ 沒有 key
          </h3>
          <ul>
            {users.map((user, index) => (
              <li key={undefined} className="p-2 border-b flex justify-between">
                <span>{user}</span>
                <input
                  type="text"
                  placeholder="輸入文字試試"
                  className="ml-2 px-2 py-1 border rounded w-32"
                />
              </li>
            ))}
          </ul>
          <p className="text-xs text-red-600 mt-2">
            💡 先在 input 輸入文字，再點「加入 David」看看會發生什麼
          </p>
        </div>

        {/* 有 key */}
        <div className="border-2 border-green-300 p-4 rounded">
          <h3 className="text-lg font-semibold text-green-600 mb-3">
            ✅ 有 key
          </h3>
          <ul>
            {users.map((user) => (
              <li key={user} className="p-2 border-b flex justify-between">
                <span>{user}</span>
                <input
                  type="text"
                  placeholder="輸入文字試試"
                  className="ml-2 px-2 py-1 border rounded w-32"
                />
              </li>
            ))}
          </ul>
          <p className="text-xs text-green-600 mt-2">
            💡 這邊的 input 文字會正確保持
          </p>
        </div>
      </div>

      {/* 簡單說明 */}
      <div className="mt-6 p-4 bg-yellow-100 rounded">
        <h4 className="font-semibold mb-2">🔍 發生了什麼？</h4>
        <div className="text-sm">
          <p className="mb-2">
            <strong>沒有 key：</strong>React 按順序比對，input
            的內容會跑到錯的地方
          </p>
          <p>
            <strong>有 key：</strong>React 知道每個元素的身份，正確保持每個
            input 的內容
          </p>
        </div>
      </div>
    </div>
  );
}
