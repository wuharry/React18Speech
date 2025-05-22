import { useState } from "react";

export default function ReactKeyDemo() {
  const [users, setUsers] = useState(["Amy", "Bob", "Cindy"]);
  const [inputValue, setInputValue] = useState("");

  // 在陣列開頭插入新用戶
  const addUserAtStart = () => {
    if (inputValue.trim()) {
      setUsers([inputValue, ...users]);
      setInputValue("");
    }
  };

  // 移除第一個用戶
  const removeFirstUser = () => {
    setUsers(users.slice(1));
  };

  // 重置
  const reset = () => {
    setUsers(["Amy", "Bob", "Cindy"]);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">React Key 示範</h1>

      {/* 控制按鈕 */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="輸入新用戶名稱"
            className="px-3 py-2 border rounded flex-1"
          />
          <button
            onClick={addUserAtStart}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            在開頭加入用戶
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={removeFirstUser}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            移除第一個用戶
          </button>
          <button
            onClick={reset}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            重置
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 錯誤案例：沒有 key */}
        <div className="border-2 border-red-300 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-red-600 mb-3">
            ❌ 錯誤案例：沒有 key
          </h2>
          <div className="bg-red-50 p-3 rounded mb-3">
            <p className="text-sm text-red-700">
              <strong>問題：</strong>React 會按索引比對，導致不必要的重新渲染
            </p>
          </div>

          <ul className="space-y-2">
            {users.map((user, index) => (
              <li
                key={undefined} // 故意不加 key
                className="p-2 bg-white border rounded shadow-sm flex justify-between items-center"
              >
                <span>{user}</span>
                <input
                  type="text"
                  placeholder="輸入備註"
                  className="ml-2 px-2 py-1 border rounded text-sm w-24"
                />
                <span className="text-xs text-gray-500">索引: {index}</span>
              </li>
            ))}
          </ul>

          <div className="mt-3 p-2 bg-yellow-100 rounded text-xs">
            <strong>React 的 Diff 行為：</strong>
            <ul className="mt-1 space-y-1">
              <li>• 索引 0: 比對 "Amy" vs 新的第一個值</li>
              <li>• 索引 1: 比對 "Bob" vs 新的第二個值</li>
              <li>• 索引 2: 比對 "Cindy" vs 新的第三個值</li>
              <li>
                •{" "}
                <span className="text-red-600">所有 input 的值都會丟失！</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 正確案例：有 key */}
        <div className="border-2 border-green-300 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-green-600 mb-3">
            ✅ 正確案例：使用 key
          </h2>
          <div className="bg-green-50 p-3 rounded mb-3">
            <p className="text-sm text-green-700">
              <strong>優點：</strong>React 能正確識別每個元素，保持狀態
            </p>
          </div>

          <ul className="space-y-2">
            {users.map((user, index) => (
              <li
                key={user} // 使用唯一的 key
                className="p-2 bg-white border rounded shadow-sm flex justify-between items-center"
              >
                <span>{user}</span>
                <input
                  type="text"
                  placeholder="輸入備註"
                  className="ml-2 px-2 py-1 border rounded text-sm w-24"
                />
                <span className="text-xs text-gray-500">key: {user}</span>
              </li>
            ))}
          </ul>

          <div className="mt-3 p-2 bg-blue-100 rounded text-xs">
            <strong>React 的 Diff 行為：</strong>
            <ul className="mt-1 space-y-1">
              <li>• key="Amy": 找到對應的 Amy 元素</li>
              <li>• key="Bob": 找到對應的 Bob 元素</li>
              <li>• key="Cindy": 找到對應的 Cindy 元素</li>
              <li>
                •{" "}
                <span className="text-green-600">
                  每個 input 的值都會保持！
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 說明區域 */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">🧠 原理說明</h3>
        <div className="text-sm space-y-2">
          <p>
            <strong>沒有 key 時：</strong>
          </p>
          <pre className="bg-white p-2 rounded text-xs overflow-x-auto">
            {`// React 按索引比對
舊: [<li>Amy</li>, <li>Bob</li>, <li>Cindy</li>]
新: [<li>David</li>, <li>Amy</li>, <li>Bob</li>, <li>Cindy</li>]

索引 0: Amy → David (內容改變，重新渲染)
索引 1: Bob → Amy (內容改變，重新渲染)  
索引 2: Cindy → Bob (內容改變，重新渲染)
索引 3: undefined → Cindy (新增元素)`}
          </pre>

          <p>
            <strong>有 key 時：</strong>
          </p>
          <pre className="bg-white p-2 rounded text-xs overflow-x-auto">
            {`// React 按 key 比對
舊: [<li key="Amy">Amy</li>, <li key="Bob">Bob</li>, <li key="Cindy">Cindy</li>]
新: [<li key="David">David</li>, <li key="Amy">Amy</li>, <li key="Bob">Bob</li>, <li key="Cindy">Cindy</li>]

key="Amy": 位置改變，移動 DOM 節點
key="Bob": 位置改變，移動 DOM 節點
key="Cindy": 位置改變，移動 DOM 節點
key="David": 新元素，插入 DOM 節點`}
          </pre>
        </div>
      </div>

      {/* 測試指示 */}
      <div className="mt-4 p-3 bg-orange-100 rounded-lg">
        <p className="text-sm">
          <strong>🧪 測試方法：</strong>
          1. 在兩邊的 input 欄位中輸入一些文字 2.
          點擊「在開頭加入用戶」或「移除第一個用戶」 3. 觀察左邊（沒有key）的
          input 內容會消失，右邊（有key）會保持
        </p>
      </div>
    </div>
  );
}
