function Component() {
  const renderCount = useRef(0);

  // 每次 render 這個值都會 +1，但不會造成無限迴圈
  renderCount.current += 1;

  return <div>這個組件 render 了 {renderCount.current} 次</div>;
}

import React, { useState, useEffect, useRef } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const prevCount = useRef<number | undefined>();

  // 每次 count 改變，就更新 prevCount 的值
  useEffect(() => {
    prevCount.current = count;
  }, [count]);

  return (
    <div style={{ padding: "20px", fontSize: "20px" }}>
      <p>現在的 count: {count}</p>
      <p>上一個 count: {prevCount.current ?? "無"}</p>
      <button onClick={() => setCount(count + 1)}>加一</button>
    </div>
  );
}


import { useState, useRef, useEffect } from 'react';

function PreviousValueExample() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('小明');
  
  // 記住上一次的 count
  const prevCount = useRef();
  useEffect(() => {
    prevCount.current = count;
  }, [count]);
  
  // 記住上一次的 name
  const prevName = useRef();
  useEffect(() => {
    prevName.current = name;
  }, [name]);
  
  // 自製 hook 讓程式碼更乾淨
  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  
  const [age, setAge] = useState(20);
  const prevAge = usePrevious(age);
  
  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-bold text-gray-800">記住上一次的值</h2>
      
      {/* Count 範例 */}
      <div className="border p-4 rounded">
        <p className="text-gray-700">
          目前 count: <span className="font-bold text-blue-600">{count}</span>
        </p>
        <p className="text-gray-700">
          上次 count: <span className="font-bold text-gray-500">{prevCount.current ?? '無'}</span>
        </p>
        <button 
          onClick={() => setCount(count + 1)}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          +1
        </button>
      </div>
      
      {/* Name 範例 */}
      <div className="border p-4 rounded">
        <p className="text-gray-700">
          目前名字: <span className="font-bold text-green-600">{name}</span>
        </p>
        <p className="text-gray-700">
          上次名字: <span className="font-bold text-gray-500">{prevName.current ?? '無'}</span>
        </p>
        <input 
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 px-3 py-2 border rounded w-full"
          placeholder="輸入名字"
        />
      </div>
      
      {/* 用 custom hook 的範例 */}
      <div className="border p-4 rounded">
        <p className="text-gray-700">
          目前年齡: <span className="font-bold text-purple-600">{age}</span>
        </p>
        <p className="text-gray-700">
          上次年齡: <span className="font-bold text-gray-500">{prevAge ?? '無'}</span>
        </p>
        <button 
          onClick={() => setAge(age + 1)}
          className="mt-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          長大一歲
        </button>
      </div>
      
      <div className="text-sm text-gray-600 bg-yellow-50 p-3 rounded">
        <strong>重點：</strong> 第一次 render 時，上一次的值會是 undefined，
        所以通常會用 <code>?? '無'</code> 來處理
      </div>
    </div>
  );
}

export default PreviousValueExample;